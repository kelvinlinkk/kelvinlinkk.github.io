// DialogSystem class manages the display and interaction of dialog boxes, logs, and speakers.
class DialogSystem {
    constructor(main) {
        // Initialize dialog elements: dialog box, text area, name tag, and log area.
        this.elements = {
            box: this.createElement("div", { id: "dialogbox" }),
            textArea: this.createElement("p", { id: "dialogText" }),
            tag: this.createElement("div", { id: "nametag" }),
            logArea: this.createElement("div", { id: "log" }),
        };

        // Status object to track the current speaker, lock state, and display state.
        this.status = {
            speaker: "",
            isLocked: false,
            display: false,
        };

        // Array to store dialog logs.
        this.log = [];

        // Append dialog elements to the DOM.
        this.elements.box.appendChild(this.elements.textArea);
        this.elements.box.appendChild(this.elements.tag);
        main.appendChild(this.elements.logArea);
        main.appendChild(this.elements.box);
    }

    // Utility method to create a DOM element with specified attributes.
    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

    // Creates a new log entry with the given text and optional speaker.
    createLog(text, speaker = "") {
        const newLog = this.elements.logArea.appendChild(this.createElement("section", {}));
        if (speaker === "") {
            newLog.innerHTML = this.status.speaker + " : " + text;
            this.log.push({ speaker: this.status.speaker, message: text });
        } else {
            newLog.innerHTML = speaker + " : " + text;
            this.log.push({ speaker: speaker, message: text });
        }
    }

    // Toggles the visibility of the log area.
    showLog() {
        const display = this.elements.logArea.style.display;
        if (this.status.display) {
            this.elements.logArea.style.display = display == "initial" ? "none" : "initial";
        }
    }

    // Reads and displays a saved log from an array of log entries.
    readSavedLog(log) {
        this.elements.logArea.innerHTML = "";
        log.forEach(line => {
            this.createLog(line.message, line.speaker);
        });
    }

    // Displays text one character at a time with a delay for a typing effect.
    async readWords(text) {
        const words = text.split("");
        let showWords = "";

        for (const word of words) {
            showWords += word;
            await this.delay(10); // Delay between each character.
            this.setText(showWords);
        }
        this.status.isLocked = false; // Unlock after text is fully displayed.
        this.createLog(text); // Add the text to the log.
    }

    // Utility method to create a delay for a specified number of milliseconds.
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Sets the text content of the dialog box.
    setText(text) {
        this.elements.textArea.innerHTML = text;
    }

    // Sets the current speaker and updates the name tag.
    setSpeaker(speaker) {
        this.status.speaker = speaker;
        this.elements.tag.innerHTML = speaker;
    }

    // Sets the appearance of the dialog text (e.g., color).
    setAppearance(color = "thistle") {
        this.elements.textArea.style.color = color;
    }

    // Shows the dialog box.
    async show() {
        this.elements.box.style.display = "initial";
        this.status.display = true;
    }

    // Hides the dialog box.
    hide() {
        this.elements.box.style.display = "none";
        this.status.display = false;
    }
}

// Export the DialogSystem class for use in other modules.
export default DialogSystem;