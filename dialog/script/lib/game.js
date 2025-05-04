// Import necessary modules and utilities.
import DialogSystem from './dialog.js';
import AudioManager from './audio.js';
import ButtonManager from './button.js';
import ImageManager from './image.js';
import { loadSource } from './util.js';
import { DrumGame } from '../custom/drum.js';

// Game class manages the overall game logic, including systems, story progression, and user interaction.
export class Game {
    constructor() {
        // Create the main game container.
        this.gameContainer = document.querySelector("main").appendChild(document.createElement("div"));
        this.gameContainer.id = "gameContainer";

        // Initialize system managers for dialog, audio, buttons, and images.
        this.systemManagers = {
            dialogManager: new DialogSystem(this.gameContainer),
            audioManager: new AudioManager(this.gameContainer),
            buttonManager: new ButtonManager(this.gameContainer),
            imageManager: new ImageManager(this.gameContainer)
        };

        // Initialize game state variables.
        this.activeCharacters = []; // List of active characters in the scene.
        this.backgroundImage = null; // Current background image.
        this.isGamePaused = false; // Pause state of the game.
        this.pausePromiseResolver = null; // Resolver for pause-related promises.
        this.completedStoryIds = []; // List of completed story IDs.
        this.affinity = {}; // Affinity values for characters.
        this.variable = {}; // Custom game variables.

        // Add a keydown event listener for toggling the log and pausing the game.
        document.addEventListener("keydown", (n) => {
            if (n.key == "l") {
                this.systemManagers.dialogManager.showLog();
                this.toggleGamePause();
            }
        });
    }

    // Toggles the game's pause state.
    toggleGamePause() {
        this.isGamePaused = !this.isGamePaused;
        this.systemManagers.buttonManager.isInteractive = !this.systemManagers.buttonManager.isInteractive;
        this.systemManagers.audioManager.toggleAllAudio();
        // Resolve the pause promise if the game is resumed.
        if (!this.isGamePaused && this.pausePromiseResolver) {
            this.pausePromiseResolver();
            this.pausePromiseResolver = null;
        }
    }

    // Waits for the game to resume if it is paused.
    async waitForResume() {
        if (!this.isGamePaused) return;
        return new Promise(resolve => {
            this.pausePromiseResolver = resolve;
        });
    }

    // Sets the background image for the game.
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

    // Sets up the stage with background music, background image, and character figures.
    async setStage(bgm, background, figures) {
        this.systemManagers.audioManager.audPlay(bgm, 0, 0);
        this.setBackgroundImage(background);
        await new Promise(resolve => { this.backgroundImage.onload = resolve; });

        this.activeCharacters = [];
        figures.forEach(({ color, name, src }) => {
            this.activeCharacters.push({ color, name, src });
            this.systemManagers.imageManager.setAppearance(src, { width: '', height: 960, left: 810, top: 60 });
        });

        this.systemManagers.dialogManager.setText('');
    }

    // Waits for user interaction (click or space key).
    async waitForUser() {
        return new Promise(resolve => {
            const handler = () => {
                this.gameContainer.removeEventListener('click', handler);
                document.removeEventListener('keydown', e => { if (e.key === " ") handler() });
                resolve();
            };
            this.gameContainer.addEventListener('click', handler);
            document.addEventListener('keydown', e => { if (e.key === " ") handler() });
        });
    }

    // Sets up choice buttons for the user.
    setupChoices(choices = []) {
        this.systemManagers.buttonManager.clearButton();
        choices.forEach(({ value, text }) =>
            this.systemManagers.buttonManager.addButton(value, text)
        );
    }

    // Displays choices and waits for the user to make a selection.
    async getChoice(choices) {
        return new Promise(async (resolve) => {
            this.setupChoices(choices);
            const response = await this.systemManagers.buttonManager.showButton();
            this.systemManagers.dialogManager.setSpeaker("Player");
            resolve(response);
        });
    }

    // Saves the current game progress to local storage.
    saveProgress(ans, line) {
        const data = {
            log: this.systemManagers.dialogManager.log,
            storyline: this.completedStoryIds,
            ans,
            line,
            affinity: this.affinity,
            variable: this.variable
        };
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(data));
    }

    // Plays a story segment based on the provided resources.
    async playStory(ans, line, storyResources) {
        const { imageManager, dialogManager } = this.systemManagers;
        const { texts, bgm, background, figures, choices } = storyResources;
        const actions = {
            button: async () => {
                await dialogManager.readWords(await this.getChoice(choices[ansCount]));
                ansCount += 1;
                this.saveProgress(ansCount, lineCount);
                await this.waitForUser();
            },
            affinity: (params) => {
                this.affinity[params[0]] = (this.affinity[params[0]] ? this.affinity[params[0]] : 0) + parseInt(params[1]);
            },
            setVariable: (params) => {
                if (this.variable[params[0]] === undefined) {
                    this.variable[params[0]] = params[1];
                } else {
                    this.variable[params[0]] = parseFloat(this.variable[params[0]]) + parseFloat(params[1]);
                }
            },
            getVariable: (params) => {
                console.log(this.variable[params]);
            },
            default: (words) => { console.log(words); }
        };
        var ansCount = ans;
        var lineCount = line;

        await this.setStage(bgm, background, figures);
        await dialogManager.show();
        [...this.activeCharacters.values()].forEach(async name => await imageManager.showImg(name));

        for (const [speaker, ...params] of texts.slice(lineCount)) {
            const words = params.join("");
            if (this.isGamePaused) {
                await this.waitForResume();
                await this.waitForUser();
            }
            this.saveProgress(ansCount, lineCount);
            lineCount += 1;
            switch (speaker) {
                case "system":
                    await (actions[params[0]] || actions["default"])(params.slice(1));
                    break;
                case "node":
                    return words === "" ? await this.getChoice(choices[ansCount]) : words;
                default:
                    dialogManager.setSpeaker(speaker);
                    dialogManager.elements.tag.style.color = "aliceblue";
                    for (const { color, name, src } of this.activeCharacters) {
                        if (name === speaker) {
                            dialogManager.elements.tag.style.color = color || "aliceblue";
                            imageManager.showImg(src);
                        } else {
                            imageManager.hideImg(src);
                        }
                    }
                    await dialogManager.readWords(words);
                    await this.waitForUser();
            }
        }
    }

    // Initializes the game with saved data or default settings.
    async initialize(chapter, data) {
        const { dialogManager, imageManager, audioManager } = this.systemManagers;
        dialogManager.setAppearance("#ffffff");
        await loadSource(imageManager, audioManager);
        this.affinity = data.affinity;
        dialogManager.readSavedLog(data.log);
        try {
            const response = await fetch("resources/stories/mainStory.json");
            const chapters = await response.json();
            const readingStory = data.storyline[data.storyline.length - 1];
            return { stories: chapters[chapter], readingStory };
        } catch (error) {
            console.error('Failed to load or play story:', error);
        }
    }

    // Ends the game and clears progress.
    ending() {
        const { dialogManager, imageManager, audioManager } = this.systemManagers;
        for (const { src } of this.activeCharacters) {
            imageManager.hideImg(src);
        }
        audioManager.toggleAllAudio();
        dialogManager.hide();
        this.backgroundImage.style.display = "none";
        localStorage.clear();
        dialogManager.readSavedLog([]);
    }

    // Starts the game loop, progressing through the story.
    async startloop(chapter, data) {
        var { stories, readingStory } = await this.initialize(chapter, data);
        var { ans, line } = data;
        while (readingStory !== "end") {
            this.completedStoryIds.push(readingStory);
            let nextStory = await this.playStory(ans, line, stories[readingStory]);
            readingStory = nextStory;
            ans = 0; line = 0;
        }
        if (readingStory === "end") this.ending();
    }

    async main(data = {
        log: [],
        storyline: ["main"],
        ans: 0,
        line: 0,
        affinity: {},
        variable: {}
    }) {
        // Create a new instance of the DrumGame class to manage the drum game
        const drumGame = new DrumGame({
            notesContainerId: 'notes',
            scoreDisplayId: 'score',
            missesDisplayId: 'misses',
            colors: ['red', 'blue'],
            noteSpeed: 2, // px per frame
            spawnInterval: 1000, // ms
            hitZoneLeft: 80,
            hitZoneRight: 140
        });
        await this.startloop("Preface", data);
        console.log(this.variable["i"])
        await drumGame.start();
    }
}