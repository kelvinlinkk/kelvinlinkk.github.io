import DialogSystem from './dialog.js';
import AudioManager from './audio.js';
import ButtonManager from './button.js';
import ImageManager from './image.js';
import { loadSource } from './util.js';

export class Game {
    constructor() {
        this.gameContainer = document.querySelector("main").appendChild(document.createElement("div"));
        this.gameContainer.id = "gameContainer";

        this.systemManagers = {
            dialogManager: new DialogSystem(this.gameContainer),
            audioManager: new AudioManager(this.gameContainer),
            buttonManager: new ButtonManager(this.gameContainer),
            imageManager: new ImageManager(this.gameContainer)
        };

        this.activeCharacters = new Map();
        this.backgroundImage = null;
        this.isGamePaused = false;
        this.pausePromiseResolver = null;
        this.completedStoryIds = [];
        this.affinity = {};

        document.addEventListener("keydown", (n) => {
            if (n.key == "l") {
                this.systemManagers.dialogManager.showLog();
                this.toggleGamePause();
            }
        })
    }

    toggleGamePause() {
        this.isGamePaused = !this.isGamePaused;
        this.systemManagers.buttonManager.isInteractive = !this.systemManagers.buttonManager.isInteractive;

        if (!this.isGamePaused && this.pausePromiseResolver) {
            this.pausePromiseResolver();
            this.pausePromiseResolver = null;
        }
    }

    async waitForResume() {
        if (!this.isGamePaused) return;
        return new Promise(resolve => {
            this.pausePromiseResolver = resolve;
        });
    }

    setBackgroundImage(src) {
        if (this.backgroundImage) {
            this.backgroundImage.src = src;
            return this.backgroundImage;
        }
        this.backgroundImage = Object.assign(document.createElement("img"), {
            id: "bg",
            src: src
        });
        this.gameContainer.appendChild(this.backgroundImage);
        return this.backgroundImage;
    }

    async setStage(bgm, background, figures) {
        this.systemManagers.audioManager.audPlay(bgm, 0, 0);
        this.setBackgroundImage(background);
        await new Promise(resolve => { this.backgroundImage.onload = resolve; });

        this.activeCharacters.clear();
        figures.forEach(({ name, src }) => {
            this.activeCharacters.set(name, src);
            this.systemManagers.imageManager.setAppearance(src, { width: '', height: 960, left: 810, top: 60 });
        });

        this.systemManagers.dialogManager.setText('');
    }

    async waitForClick(eventType = 'click') {
        return new Promise(resolve => {
            const handler = () => {
                this.gameContainer.removeEventListener(eventType, handler);
                resolve();
            };
            this.gameContainer.addEventListener(eventType, handler);
        });
    }

    setupChoices(choices = []) {
        this.systemManagers.buttonManager.clearButton();
        choices.forEach(({ value, text }) =>
            this.systemManagers.buttonManager.addButton(value, text)
        );
    }

    async getChoice(choices) {
        return new Promise(async (resolve) => {
            this.setupChoices(choices);
            const response = await this.systemManagers.buttonManager.showButton();
            this.systemManagers.dialogManager.setSpeaker("Player");
            resolve(response);
        })
    }

    saveProgress(ans, line) {
        const data = {
            log: this.systemManagers.dialogManager.log,
            storyline: this.completedStoryIds,
            ans: ans,
            line: line,
            affinity: this.affinity
        }
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(data));
    }

    async playStory(ans, line, { texts, bgm, background, figures, choices }) {
        const { imageManager, dialogManager } = this.systemManagers;
        const actions = {
            button: async () => {
                lineCount += 1; //skip button and choice
                await dialogManager.readWords(await this.getChoice(choices[ansCount]));
                ansCount += 1;
                this.saveProgress(ansCount, lineCount + 1);
                await this.waitForClick();
            },
            default: (words) => { console.log(words); }
        }
        var ansCount = ans;
        var lineCount = line;

        await this.setStage(bgm, background, figures);
        await dialogManager.show();
        [...this.activeCharacters.values()].forEach(async src => await imageManager.showImg(src));

        for (const [speaker, words] of texts.slice(lineCount)) {
            if (this.isGamePaused) {
                await this.waitForResume();
                await this.waitForClick();
            }
            switch (speaker) {
                case "system":
                    await (actions[words] || actions["default"])(words);
                    break;
                case "node":
                    return words === "" ? await this.getChoice(choices[ansCount]) : words;
                case "affinity": const [name, delta] = words.split('+')
                    this.affinity[name] = this.affinity[name]||0 + parseInt(delta);
                    break;
                default:
                    dialogManager.setSpeaker(speaker);
                    await dialogManager.readWords(words);
                    await this.waitForClick();
                    lineCount += 1;
                    this.saveProgress(ansCount, lineCount);
            }
        }
    }

    async initialize(data) {
        const { dialogManager, imageManager, audioManager } = this.systemManagers;
        dialogManager.setAppearance("#ffffff");
        await loadSource(imageManager, audioManager);
        this.affinity = data.affinity;
        dialogManager.readSavedLog(data.log);
        try {
            const response = await fetch('resources/mainStory.json');
            const stories = await response.json();
            const story = data.storyline[data.storyline.length - 1];
            return { stories, story }

        } catch (error) {
            console.error('Failed to load or play story:', error);
        }
    }

    ending() {
        const { dialogManager, imageManager } = this.systemManagers;
        for (const [, src] of this.activeCharacters) {
            imageManager.hideImg(src);
        }
        dialogManager.hide();
        localStorage.clear();
        dialogManager.readSavedLog([]);
    }

    async startloop(data = {
        log: [],
        storyline: ["main"],
        ans: 0,
        line: 0,
        affinity: {}
    }) {
        var { stories, story } = await this.initialize(data);
        var { ans, line } = data;

        while (story !== "end") {
            this.completedStoryIds.push(story);
            let nextStory = await this.playStory(ans, line, stories[story]);
            story = nextStory;
            ans = 0; line = 0;
        }
        if (story === "end") this.ending();
    }
}