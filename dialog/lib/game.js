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

    async initialize(bgm, background, figures) {
        this.systemManagers.audioManager.audPlay(bgm, 0, 0);
        this.setBackgroundImage(background);
        this.setStage(figures);
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

    setStage(figures = []) {
        if (!figures.length) return;

        this.activeCharacters.clear();
        figures.forEach(({ name, src }) => {
            this.activeCharacters.set(name, src);
            this.systemManagers.imageManager.setAppearance(src, {
                width: '',
                height: 960,
                left: 810,
                top: 60
            });
        });
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
                await dialogManager.readWords(await this.getChoice(choices[ansCount]));
                ansCount += 1;
                await this.waitForClick();
            },
            default:async (words) => {//affinity
                const [name, delta] = words.split('+')
                if (this.affinity[name] === undefined) {
                    this.affinity[name] = parseInt(delta);
                }else{
                    this.affinity[name] += parseInt(delta);
                }
            }
        }

        await this.initialize(bgm, background, figures);
        let ansCount = ans;
        let lineCount = line;
        dialogManager.show();
        [...this.activeCharacters.values()].forEach(src => imageManager.showImg(src));

        for (const [speaker, words] of texts.slice(lineCount)) {
            if (this.isGamePaused) {
                await this.waitForResume();
                await this.waitForClick();
            }
            if (speaker === "system") {
                await (actions[words] || actions["default"])(words);
            } else if (speaker === "node") {
                return words === "" ? await this.getChoice(choices[ansCount]) : words;
            } else {
                dialogManager.setSpeaker(speaker);
                await dialogManager.readWords(words);
                await this.waitForClick();
            }
            lineCount += 1;
            this.saveProgress(ansCount, lineCount);
        }
    }

    async start(data = {
        log: [],
        storyline: [],
        ans: 0,
        line: 0,
        affinity: {}
    }) {
        this.systemManagers.dialogManager.setAppearance("#ffffff");
        this.systemManagers.dialogManager.readSavedLog(data.log);
        this.affinity = data.affinity;
        await loadSource(this.systemManagers.imageManager, this.systemManagers.audioManager);
        try {
            const response = await fetch('story/mainStory.json');
            const stories = await response.json();
            var ans = data.ans;
            var line = data.line;
            var story = "main" || data.storyline[data.storyline.length - 1];

            while (story !== "end") {
                let nextStory = await this.playStory(ans, line, stories[story]);
                this.completedStoryIds.push(story);
                story = nextStory;
                ans = 0; line = 0;
            }

            for (const [, src] of this.activeCharacters) {
                this.systemManagers.imageManager.hideImg(src);
            }
            this.systemManagers.dialogManager.hide();

        } catch (error) {
            console.error('Failed to load or play story:', error);
        }
        localStorage.clear();
        this.systemManagers.dialogManager.readSavedLog([]);
    }
}