class DialogSystem {
    constructor(filename) {
        this.variables = {};
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
        this.dialog.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        this.dialog.style.color = "aliceblue";

        this.background = document.createElement('img');
        this.background.id = 'bg';
        this.dialog.appendChild(this.background); // 將背景添加到對話框中

        this.stylesheet = document.head.appendChild(document.createElement("link"));
        this.stylesheet.rel = "stylesheet";
        this.stylesheet.href = "css/appearance.css";
    }

    async loadStory(filename) {
        this.lineNum = 0;
        this.isLocked = true;
        this.text = []; // 清空初始對話

        try {
            const response = await fetch(filename);
            const data = await response.text();
            this.text = data.split('\r\n').filter(line => line.trim() !== '');
            console.log(this.text);
            this.showWords(this.lineNum);
        } catch (error) {
            console.error('Error loading story:', error);
        }

        this.dialogBoxInstance.getBox().addEventListener('dblclick', () => {
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
                this.variables[params[1]] = params.slice(2).join(" "); // 合併第2項以後的所有項目
                break;

            case "showVar":
                // [showVar name]
                return this.variables[params[1]];

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
        this.box = document.createElement("p");
        this.img = document.createElement("img");
        this.img.id = "dialogBoxImg";
        this.img.style.visibility = "hidden";
        this.input = document.createElement("textarea");
        dialog.appendChild(this.img);
        dialog.appendChild(this.box);
        dialog.appendChild(this.input);
        this.setColor("#00000060");
    }
    getBox() {
        return this.box;
    }

    getImg() {
        return this.img;
    }
    getMessage(){
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

    setAppearance(){
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
            document.addEventListener("wheel",()=>{
                if(select>=Array.from(this.buttonsArea.children).length-1){
                    select = 0;
                }else{
                    select+=1;
                }
            });
            document.addEventListener("keydown",(n)=>{
                if((n.key==="Enter" || n.key === " ") && select!=-1){
                    resolve(Array.from(this.buttonsArea.children)[select].className);
                    this.clearButton();
                }},{once:true});
            for (let btn of this.buttonsArea.children) {
                let num = Array.from(this.buttonsArea.children).indexOf(btn);
                btn.addEventListener("mouseenter", () => {
                    select = num;
                });

                btn.addEventListener("mouseleave", () => {
                    select = -1;btn.style.background = "#111111";
                });
                this.buttonsArea.addEventListener("mousemove",()=>{
                    if(select==num){
                        btn.style.background = "#555555";
                    }else{
                        btn.style.background = "#111111";
                    }
                })
                document.addEventListener("wheel",()=>{
                    if(select==num){
                        btn.style.background = "#555555";
                    }else{
                        btn.style.background = "#111111";
                    }
                })

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
                this.buttonsArea.style.display="none";
            }
        } else {
            // Clear all buttons
            this.buttonsArea.innerHTML = "";
            this.buttonElements = [];
        }
    }
}