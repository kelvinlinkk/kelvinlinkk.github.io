class DialogSystem {
    constructor(filename) {
        this.variables = {};
        this.speaker = "someone";
        this.dialog = document.createElement("div");
        document.getElementsByTagName("main")[0].appendChild(this.dialog).id = "dialog";

        this.dialogBoxInstance = new dialogBox();
        this.imgContainer = new ImageContainer();
        this.audContainer = new AudioContainer();
        this.btnContainer = new ButtonContainer();
        this.setDialogElements();

        // 設置樣式
        this.setDialogStyles();

        // 讀取txt檔案
        this.loadStory(filename);
    }

    setDialogElements() {
        this.dialog.appendChild(this.imgContainer.getContainer());
        this.dialog.appendChild(this.audContainer.getContainer());
        this.dialog.appendChild(this.btnContainer.getContainer());
    }

    setDialogStyles() {
        // 設置對話框的外觀
        Object.assign(this.dialog.style, {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "aliceblue"
        });

        this.background = Object.assign(document.createElement('img'), {
            id: 'bg'
        });
        this.dialog.appendChild(this.background);

        this.stylesheet = Object.assign(document.createElement("link"), {
            rel: "stylesheet",
            href: "css/appearance.css"
        });
        document.head.appendChild(this.stylesheet);

        this.dialogHistory = Object.assign(document.createElement("article"),{
            id: "dialogHistory"
        })
        this.dialog.appendChild(this.dialogHistory);
        document.addEventListener("keydown", (n) => {
            if(n.key === "l"){
                this.dialogHistory.style.display = 
                this.dialogHistory.style.display === "none" ? "initial" : "none";
            }
        });
    }

    async loadStory(filename) {
        this.lineNum = 0;
        this.isLocked = true;
        this.text = []; // 清空初始對話

        try {
            const response = await fetch(filename);
            const data = await response.text();
            this.text = data.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(line => line.trim() !== '');
            this.showWords(this.lineNum);
        } catch (error) {
            console.error('Error loading story:', error);
        }

        this.dialogBoxInstance.getBox().addEventListener('click', () => {
            if (!this.isLocked && this.lineNum < this.text.length) {
                this.isLocked = true;
                this.showWords(this.lineNum);
            }
        });

        document.addEventListener("keydown", (n) => {
            if (n.key === " " && !this.isLocked && this.lineNum < this.text.length) {
                this.isLocked = true;
                this.showWords(this.lineNum);
            }
        });
    }

    // Show words individually
    async showWords(num) {
        let words = this.text[num].split(""),
            display = "",
            flag = false,
            bracketContent = "";

        for (let word of words) {
            if (word === "[" && !flag) {
                flag = true;
                bracketContent = "";
                continue;
            } else if (flag) {
                if (word === "]") {
                    flag = false;
                    //在這裡可以處理跳轉
                    const commandParts = bracketContent.split(" ");
                    switch (commandParts[0]) {
                        case "goto":
                            this.loadStory(commandParts[1]);
                            return;
                        case "showbutton":
                            let storyname = await this.btnContainer.showButton();
                            if (storyname != "undefined") { this.loadStory(storyname); return; }
                            word = ""; break;
                        case "input":
                            this.variables[commandParts[1]] =  
                            String(await this.dialogBoxInstance.getMessage(commandParts[2])).replace(/[^\w\u4E00-\u9FFF_]/g,"");
                            word = ""; break;
                        default:
                            word = this.commandHandler(bracketContent);
                            break;
                    }
                } else {
                    bracketContent += word;
                    continue;
                }
            }
            display += word;
            await new Promise(r => setTimeout(r, 10));
            if (display)
                this.dialogBoxInstance.setText(display);
        }
        this.lineNum += 1;
        if (display === "") {
            this.showWords(num + 1);
        } else {
            let paragraph = document.createElement("section");
            paragraph.innerHTML = this.speaker + " : " + display;
            this.dialogHistory.appendChild(paragraph);
            this.isLocked = false;
        }
    }

    // Handle [] commands
    commandHandler(command) {
        const params = command.split(" ");

        switch (params[0]) {
            case '[':
                return "[";

            case 'setting':
                // [setting font color background]
                this.dialog.style.fontFamily = params[1] || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                this.dialog.style.color = params[2] || "aliceblue";
                this.dialogBoxInstance.setColor(params[3] || "#00000060");

                if (params[4]) {
                    this.dialogBoxInstance.setImg(params[4]);
                }
                break;

            case 'show':
                // [show]
                this.dialog.style.display = 'initial';
                break;

            case 'hide':
                // [hide]
                for (let audioName in this.audioElements) {
                    this.audioElements[audioName].pause();
                }
                this.dialog.style.display = 'none';
                break;

            case 'n':
                // [newline]
                return '<br>';

            case 'bg':
                // [background src object-fit]
                if (params[1] == 0) {
                    this.background.style.visibility = 'hidden';
                } else {
                    this.background.src = 'resources/' + params[1];
                    this.background.style.visibility = 'visible';
                    this.background.style.objectFit = params[2];
                }
                break;

            case 'img':
                // [img name src x y z width height show]
                let imgElement = this.imgContainer.addImg(params[1], params[2]);
                this.imgContainer.setAppearance(params[1], { left: params[3], top: params[4], zIndex: params[5], width: params[6], height: params[7] });
                imgElement.style.display = (params[8] == '0') ? "none" : "initial"; // 開始顯示圖片
                break;

            case 'audio':
                // [audio name src play time(s) fade(ms)]
                this.audContainer.addAudio(params[1], params[2]); // 創建音效元素
                if (params[3] === 'play') {
                    this.audContainer.audPlay(params[1], params[4], params[5]); // 開始播放音效
                } else {
                    this.audContainer.audStop(params[1], params[5]); // 結束播放音效
                }
                break;

            case 'effect':
                // [effect]
                break;

            case "setVar":
                // [setVar name val]
                this.variables[params[1]] = String(params.slice(2).join(" "))
                    .replace(/[^\w\u4E00-\u9FFF_]/g,"");  // Remove HTML tags
                break;

            case "showVar":
                // [showVar name]
                return this.variables[params[1]];

            
            case "speaker":
                // [speaker isvariable txt/variable]
                if(params[1] == 1){
                    this.speaker = this.variables[params[2]];
                }else{
                    this.speaker = params[2];
                }
                break;

            case "button":
                this.btnContainer.addButton(params[1], params[2]);
                break;
        }

        return "";
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
        fragment.append(elements.img, elements.box, elements.inputBackground);
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
            this.box.style.display = "none";
            this.input.focus();
            this.input.addEventListener("keydown", (n) => {
                if (n.key === "Enter") {
                    resolve(this.input.value);
                    this.inputBackground.style.display = "none";
                    this.box.style.display = "initial";
                }
            })
        })
    }
    setColor(color) {
        this.img.style.visibility = "hidden";
        this.box.style.backgroundColor = color;
    }
    setText(text) {
        this.box.innerHTML = text;
    }
    setImg(source) {
        this.img.src = `resources/${source}`;
        this.img.style.visibility = "visible";
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

    addButton(text, src) {
        let newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.classList.add(src);
        this.buttonsArea.appendChild(newButton);
        this.buttonElements.push(newButton);
        return newButton;
    }

    async showButton() {
        this.buttonsArea.style.display = "initial"; // Show the buttons

        // Create a Promise that resolves when a button is clicked
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
                if ((n.key === "Enter" || n.key === " ") && select != -1) {
                    resolve(Array.from(this.buttonsArea.children)[select].className);
                    this.clearButton(); return;
                } else if (n.key === "ArrowUp" || n.key === "ArrowDown") {
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
                    select = -1; btn.style.background = "#111111";
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