class DialogSystem {
    constructor() {
        //initial
        this.speaker = "someone";
        this.dialog = document.createElement("div");
        document.querySelector("main").appendChild(this.dialog).id = "dialog";
        this.dialog.style.display = 'none';
        this.isDisplaying = false;

        //綁定dialogBox、img、audio、btn
        this.dialogBoxInstance = new dialogBox();
        this.imgContainer = new ImageContainer();
        this.audContainer = new AudioContainer();
        this.btnContainer = new ButtonContainer();
        this.dialog.appendChild(this.imgContainer.getContainer());
        this.dialog.appendChild(this.audContainer.getContainer());
        this.dialog.appendChild(this.btnContainer.getContainer());

        //set up dialog elements
        this.background = Object.assign(this.dialog.appendChild(document.createElement('img')), { id: 'bg' });

        this.dialogHistory = Object.assign(this.dialog.appendChild(document.createElement("article")), { id: "dialogHistory" });
        document.head.appendChild(Object.assign(document.createElement("link"), { rel: "stylesheet", href: "style/appearance.css" }));

        //press l to read log
        document.addEventListener("keydown", (n) => {
            if (n.key === "l" && this.isDisplaying) {
                this.dialogHistory.style.display = this.dialogHistory.style.display === "none" ? "initial" : "none";
            }
        });
    }

    async showStory(texts, num=0) {
        this.lineNum = 0;
        this.isLocked = true;
        this.text = [];
        if (typeof texts === 'string') {
            this.text = [texts];
        } else {
            this.text = texts;
        }
        let i = 0;
        while (i !== num && texts.length > this.lineNum) {
            if (texts[this.lineNum] == "break")
                i += 1;
            this.lineNum += 1;
        }
        this.readWords(this.lineNum);
        return new Promise((resolve) => {
            const continueReading = () => {
            if (!this.isLocked && this.lineNum < this.text.length && this.isDisplaying && this.text[this.lineNum] !== "break") {
                this.isLocked = true;
                this.readWords(this.lineNum);
            } else if (this.lineNum >= this.text.length) {
                resolve();
            }
            };

            this.dialogBoxInstance.getBox().addEventListener('click', continueReading);

            document.addEventListener("keydown", (n) => {
            if (n.key === " ") {
                continueReading();
            }
            });
        });
    }

    // Show words individually
    async readWords(num) {
        let words = this.text[num].split(""), display = "";

        //handle words    
        for (let word of words) {
            display += word;
            await new Promise(r => setTimeout(r, 10));
            if (display)
                this.dialogBoxInstance.setText(display);
        }
        this.lineNum += 1;

        let paragraph = document.createElement("section");
        paragraph.innerHTML = this.speaker + " : " + display;
        this.dialogHistory.appendChild(paragraph);
        this.isLocked = false;
    }

    show() {
        this.dialog.style.display = 'initial';
        this.isDisplaying = true;
    }
    hide() {
        for (let audioName in this.audioElements) {
            this.audioElements[audioName].pause();
        }
        this.dialog.style.display = 'none';
        this.isDisplaying = false;
    }
}

class dialogBox {
    constructor() {
        let dialog = document.getElementById("dialog");
        const fragment = document.createDocumentFragment();

        const elements = {
            box: Object.assign(document.createElement("p"), {
                className: "dialogBox"
            }),
            img: Object.assign(document.createElement("img"), {
                id: "dialogBoxImg",
                style: { visibility: "hidden" }
            }),
            nametag: Object.assign(document.createElement("div"), {
                id: "nametag",
                innerHTML: "someone"
            }),
            inputBackground: Object.assign(document.createElement("section"), {
                id: "inputBackground"
            }),
            input: Object.assign(document.createElement("input"), {
                type: "text",
                id: "dialogInput"
            }),
            inputTxt: Object.assign(document.createElement("p"), {
                id: "inputTxt"
            })
        };

        elements.inputBackground.appendChild(elements.input);
        elements.inputBackground.appendChild(elements.inputTxt);
        fragment.append(elements.img, elements.box, elements.inputBackground, elements.nametag);
        dialog.appendChild(fragment);

        Object.assign(this, elements);
        this.setColor("#00000060");
    }
    getBox() {
        return this.box;
    }

    getImg() {
        return this.img;
    }
    getMessage(txt) {
        return new Promise((resolve) => {
            this.inputBackground.style.display = "initial";
            this.inputTxt.innerHTML = txt;
            this.input.focus();
            this.input.addEventListener("keydown", (n) => {
                if (n.key === "Enter") {
                    resolve(this.input.value);
                    this.inputBackground.style.display = "none";
                }
            });
        });
    }
    setColor(color) {
        this.img.style.visibility = "hidden";
        this.box.style.backgroundColor = color;
        this.nametag.style.backgroundColor = color;
    }
    setText(text) {
        this.box.innerHTML = text;
    }
    setImg(source) {
        this.img.src = `resources/${source}`;
        this.img.style.visibility = "visible";
    }
    setSpeaker(name) {
        this.nametag.innerHTML = name;
        return name;
    }
}

class ImageContainer {
    constructor() {
        this.imageElements = {};
        this.imgfile = document.createElement("span");
        this.imgfile.id = "imgfile";
    }
    getContainer() {
        return this.imgfile;
    }
    addImg(name, src) {
        if (this.imageElements[name]) {
            return this.imageElements[name];
        } else {
            let imgElement = document.createElement('img');
            this.imgfile.appendChild(imgElement);
            imgElement.src = "resources/" + src;
            this.imageElements[name] = imgElement;
            return imgElement;
        }
    }
    setAppearance(name, { left, top, zIndex, width, height }) {
        // Set image styles (1920x1080 grid)
        Object.assign(this.imageElements[name].style, {
            left: (parseFloat(left) / 1920 * 100) + '%',
            top: (parseFloat(top) / 1080 * 100) + '%',
            width: (parseFloat(width) / 1920 * 100) + '%',
            height: (parseFloat(height) / 1080 * 100) + '%'
        });
        this.imageElements[name].style.zIndex = parseFloat(zIndex);
    }
    move(name, deltaX, deltaY, time) {
        let imgElement = this.imageElements[name];
        let start = performance.now();
        let startX = parseFloat(imgElement.style.left);
        let startY = parseFloat(imgElement.style.top);
        let duration = parseFloat(time) * 1000;
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = Math.min(elapsed / duration, 1);

            // Calculate current position
            let currentX = startX + parseFloat(deltaX) / 1920 * 100 * progress;
            let currentY = startY + parseFloat(deltaY) / 1080 * 100 * progress;

            // Update element position
            imgElement.style.left = currentX + '%';
            imgElement.style.top = currentY + '%';

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }
    scale(name, w, h, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        // Get current scale or default to 1
        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const [startScaleX, startScaleY] = currentTransform === 'none' ?
            [1, 1] :
            currentTransform.match(/matrix\((.*)\)/)?.[1].split(',').map(Number) || [1, 1];

        const targetScaleX = parseFloat(w);
        const targetScaleY = parseFloat(h);
        const duration = parseFloat(time) * 1000;

        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Interpolate scale values
            const currentScaleX = startScaleX + (targetScaleX - startScaleX) * progress;
            const currentScaleY = startScaleY + (targetScaleY - startScaleY) * progress;

            // Apply transform
            imgElement.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }
    skew(name, angleX, angleY, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const [startSkewX, startSkewY] = currentTransform === 'none' ?
            [0, 0] :
            currentTransform.match(/skew\((.*?)\)/)?.[1].split(',').map(angle => parseFloat(angle)) || [0, 0];

        const targetSkewX = parseFloat(angleX);
        const targetSkewY = parseFloat(angleY);
        const duration = parseFloat(time) * 1000;

        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            const currentSkewX = startSkewX + (targetSkewX - startSkewX) * progress;
            const currentSkewY = startSkewY + (targetSkewY - startSkewY) * progress;

            imgElement.style.transform = `skew(${currentSkewX}deg, ${currentSkewY}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    rotate(name, angle, time) {
        const imgElement = this.imageElements[name];
        const start = performance.now();

        const computedStyle = window.getComputedStyle(imgElement);
        const currentTransform = computedStyle.transform;
        const startAngle = currentTransform === 'none' ?
            0 :
            parseFloat(currentTransform.match(/rotate\((.*?)deg\)/)?.[1]) || 0;

        const targetAngle = parseFloat(angle);
        const duration = parseFloat(time) * 1000;

        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            const currentAngle = startAngle + (targetAngle - startAngle) * progress;
            imgElement.style.transform = `rotate(${currentAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }
}

class AudioContainer {
    constructor() {
        this.audioElements = {};
        this.audfile = document.createElement("span");
        this.audfile.id = "audfile";
    }
    getContainer() {
        return this.audfile;
    }
    addAudio(name, src) {
        if (this.audioElements[name]) {
            return this.audioElements[name];
        } else {
            let audioElement = document.createElement('audio');
            this.audfile.appendChild(audioElement);
            this.audfile.style.visibility = "hidden";
            audioElement.src = "resources/" + src;
            this.audioElements[name] = audioElement;
            return audioElement;
        }
    }
    audPlay(name, time, fade) {
        this.audioElements[name].play();
        if (time != 0) {
            setInterval(() => { this.audioElements[name].pause(); }, parseInt(time) * 1000);
        }

        if (fade != 0) {
            let volumeIncrement = parseInt(fade) / 100;
            this.audioElements[name].volume = 0;
            for (let i = 0; i < 99 - this.audioElements[name].volume * 100; i++) {

                setTimeout(() => {
                    this.audioElements[name].volume += 0.01;
                }, i * volumeIncrement);
            }
        }
    }
    audStop(name, fade) {
        if (fade != 0) {
            let volumeIncrement = parseInt(fade) / 100;
            this.audioElements[name].volume = 1;

            for (let i = 0; i < this.audioElements[name].volume * 99; i++) {
                setTimeout(() => {
                    this.audioElements[name].volume -= 0.01;
                }, i * volumeIncrement);
            }

            setInterval(() => { this.audioElements[name].pause(); }, parseInt(fade));
        } else {
            this.audioElements[name].pause();
        }
    }
}

class ButtonContainer {
    constructor() {
        this.buttonsArea = document.createElement("div");
        this.buttonsArea.id = "buttons";
        this.setAppearance();
        this.clearButton();
    }

    getContainer() {
        return this.buttonsArea;
    }

    setAppearance() {
        this.buttonsArea.style.backgroundColor = "#00000068";
    }

    addButton(src, text) {
        let newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.classList.add(src);
        this.buttonsArea.appendChild(newButton);
        this.buttonElements.push(newButton);
        return newButton;
    }
    async showButton() {
        this.buttonsArea.style.display = "initial";
        return new Promise((resolve) => {
            let select = -1;
            const handleWheelEvent = (flag) => {
                select = flag ? select + 1 : select - 1;
                if (select > Array.from(this.buttonsArea.children).length - 1) {
                    select = 0;
                }
                if (select < 0) {
                    select = Array.from(this.buttonsArea.children).length - 1;
                }
            };

            document.addEventListener("wheel", handleWheelEvent, true);
            document.addEventListener("keydown", (n) => {
                if ((n.key === "Enter") && select != -1) {
                    resolve(Array.from(this.buttonsArea.children)[select].className);
                    this.clearButton();
                    document.removeEventListener("keydown");
                }
            });

            document.addEventListener("keydown", (n) => {
                if (n.key === "ArrowUp" || n.key === "ArrowDown") {
                    handleWheelEvent(n.key === "ArrowDown");
                } else if (n.key === "w" || n.key === "s") {
                    handleWheelEvent(n.key === "s");
                }
            });

            for (let btn of this.buttonsArea.children) {
                let num = Array.from(this.buttonsArea.children).indexOf(btn);
                btn.addEventListener("mouseenter", () => {
                    select = num;
                });

                btn.addEventListener("mouseleave", () => {
                    select = -1;
                    btn.style.background = "#111111";
                });

                ["mousemove", "wheel", "keydown"].forEach(event => {
                    document.addEventListener(event, () => {
                        btn.style.background = select === num ? "#555555" : "#111111";
                    });
                });

                btn.addEventListener("click", () => {
                    resolve(btn.className);
                    this.clearButton();
                });
            }
        });
    }

    clearButton(name) {
        if (name) {
            // Clear a specific button if needed
            if (this.buttonElements[name]) {
                this.buttonsArea.removeChild(this.buttonElements[name]);
                delete this.buttonElements[name];
                this.buttonsArea.style.display = "none";
            }
        } else {
            // Clear all buttons
            this.buttonsArea.innerHTML = "";
            this.buttonElements = [];
        }
    }
}
