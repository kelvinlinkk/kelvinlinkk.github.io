class DialogSystem {
    constructor(main) {
        this.elements = {
            box: this.createElement("div", { id: "dialogbox" }),
            textArea: this.createElement("p", { id: "dialogText" }),
            tag: this.createElement("div", { id: "nametag" }),
            logArea: this.createElement("div", { id: "log" }),
        };
        this.status = {
            speaker: "",
            isLocked: false,
            display: false,
        };
        this.log = [];

        this.elements.box.appendChild(this.elements.textArea);
        this.elements.box.appendChild(this.elements.tag);
        main.appendChild(this.elements.logArea);
        main.appendChild(this.elements.box);
    }

    createElement(tag, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        return element;
    }

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

    showLog(){
        const display = this.elements.logArea.style.display;
        if (this.status.display) {
            this.elements.logArea.style.display = display == "initial" ? "none" : "initial";
        }
    }

    readSavedLog(log) {
        this.elements.logArea.innerHTML = "";
        log.forEach(line => {
            this.createLog(line.message, line.speaker);
        });
    }

    async readWords(text) {
        const words = text.split("");
        let showWords = "";

        for (const word of words) {
            showWords += word;
            await this.delay(10);
            this.setText(showWords);
        }
        this.status.isLocked = false;
        this.createLog(text);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setText(text) {
        this.elements.textArea.innerHTML = text;
    }

    setSpeaker(speaker) {
        this.status.speaker = speaker;
        this.elements.tag.innerHTML = speaker;
    }

    setAppearance(color = "thistle") {
        this.elements.textArea.style.color = color;
    }

    async show() {
        this.elements.box.style.display = "initial";
        this.status.display = true;
    }

    hide() {
        this.elements.box.style.display = "none";
        this.status.display = false;
    }
}

export default DialogSystem;