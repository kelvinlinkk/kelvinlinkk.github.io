class DialogSystem {
    constructor(filename) {
        //initial
        this.variables = {};
        this.speaker = "someone";
        this.dialog = document.createElement("div");
        document.querySelector("main").appendChild(this.dialog).id = "dialog";

        //綁定dialogBox、img、audio、btn
        this.dialogBoxInstance = new dialogBox();
        this.imgContainer = new ImageContainer();
        this.audContainer = new AudioContainer();
        this.btnContainer = new ButtonContainer();
        this.dialog.appendChild(this.imgContainer.getContainer());
        this.dialog.appendChild(this.audContainer.getContainer());
        this.dialog.appendChild(this.btnContainer.getContainer());

        //set up dialog elements
        this.background =
            Object.assign(this.dialog.appendChild(document.createElement('img')), {id: 'bg'});

        this.dialogHistory =
            Object.assign(this.dialog.appendChild(document.createElement("article")), {id: "dialogHistory"})
        document.head.appendChild(
            Object.assign(document.createElement("link"), {rel: "stylesheet",href: "css/appearance.css"}));
        
        //press l to read log
        document.addEventListener("keydown", (n) => {
            if (n.key === "l") {
                this.dialogHistory.style.display =
                    this.dialogHistory.style.display === "none" ? "initial" : "none";
            }
        });

        // load txt file
        this.loadStory(filename);
    }

    async loadStory(filename) {
        this.lineNum = 0;
        this.isLocked = true;
        this.text = []; 
        
        //fetch file or usethe backup ones
        try {
            const response = await fetch(filename);
            const data = await response.text();
            this.text = data.replace(/\r\n|\r|\n/g, '\n').split('\n').filter(line => line.trim() !== '');
            this.showWords(this.lineNum);
        } catch (error) {
            this.text = story[filename.split(".")[0]];
            this.showWords(this.lineNum);
        }
        //click or press space to continue
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

        //handle words    
        for (let word of words) {
            if (word === "[" && !flag) {
                //collect command
                flag = true;
                bracketContent = "";
                continue;
            } else if (flag) {
                if (word === "]") {
                    //execute command
                    flag = false;
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
                                String(await this.dialogBoxInstance.getMessage(String(commandParts.slice(2).join(" ")))).replace(/[^\w\u4E00-\u9FFF_]/g, "");
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
        //detect empty line(only command)
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

                if (params[4] === "") {
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

            case 'move':
                // [move obj x y time]
                this.imgContainer.move(params[1], params[2], params[3], params[4]);
                break;
                
            case 'scale':
                //[ scale obj width height time ]
                this.imgContainer.scale(params[1], params[2], params[3], params[4]);
                break;

            case 'skew':
                //[ skew obj angleX angleY time ]
                this.imgContainer.skew(params[1], params[2], params[3], params[4]);
                break;

            case 'rotate':
                //[ rotate obj angle time ]
                this.imgContainer.rotate(params[1], params[2], params[3]);
                break;

            case "setVar":
                // [setVar name val]
                this.variables[params[1]] = String(params.slice(2).join(" "))
                    .replace(/[^\w\u4E00-\u9FFF_]/g, "");  // Remove HTML tags
                break;

            case "showVar":
                // [showVar name]
                return this.variables[params[1]];


            case "speaker":
                // [speaker isvariable txt/variable]
                if (params[1] == 1) {
                    this.speaker = this.variables[params[2]];
                } else {
                    this.speaker = params[2];
                }
                break;

            case "button":
                this.btnContainer.addButton(params[1], String(params.slice(2).join(" ")));
                break;
            default:
                return String(params.slice(2).join(""));
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
            } else {
                resolve();
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
                } else {
                    resolve();
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
                } else {
                    resolve();
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
                } else {
                    resolve();
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
            document.addEventListener("keydown",(n)=>{
                if ((n.key === "Enter" || n.key === " ") && select != -1) {
                    resolve(Array.from(this.buttonsArea.children)[select].className);
                    this.clearButton();
                }
            },{once:true})
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
const story = {
    "story": [
        "[[]",
        "[show]",
        "[button story1]",
        "[button story2 story2.txt]",
        "[setting 0 aliceblue 0 bocchi.jpg]",
        "(click to continue)",
        "[showbutton]",
        "[bg sunset.jpg cover]",
        "[img bocchi bocchi.jpg 710 290 1 500 500 1]",
        "[audio Music Music.mp3 play 60 0]",
        "[input mystring 請輸入姓名]",
        "[speaker 1 mystring]",
        "In a distant galaxy, a brave explorer named [showVar mystring] set out on an adventure to discover new worlds.",
        "As [showVar mystring] navigated through the stars, she encountered a beautiful planet covered in lush hills.",
        "[bg resize.jpg cover]The hills were alive with vibrant colors, and [showVar mystring] felt a sense of wonder as she landed her ship.",
        "Suddenly, she spotted a mysterious light in the distance. What could it be?",
        "[bg sunset.jpg cover]",
        "With courage in her heart, [showVar mystring] decided to investigate the source of the light.",
        "As she approached, she realized it was a portal to another dimension!",
        "(Written by ChatGPT)",
        "[audio Music Music.mp3 stop 0 4000]",
        "[goto story2.txt]"
    ],
"story2": [
    "[show]",
    "Once upon a time, in a magical forest, there lived a kind-hearted rabbit named Benny. Benny loved to help his friends and explore the wonders of the forest.",
    "",
    "One sunny day, Benny found a sparkling stream. As he approached, he noticed a little bird trapped in some vines. \"Don't worry, I'll help you!\" Benny said. He carefully untangled the vines, and the bird chirped happily, \"Thank you, Benny! I can now fly again!\"",
    "",
    "To show his gratitude, the bird invited Benny to a secret party in the heart of the forest that evening. Benny was thrilled and hopped along to prepare for the celebration.",
    "[audio 123 Music.mp3 play 0 0]",
    "",
    "As night fell, Benny arrived at the party, where all his friends were gathered. They danced under the stars, shared stories, and enjoyed delicious treats. Benny felt grateful for his friends and the magic of the forest.",
    "[audio 123 Music.mp3 stop 0 0]",
    "",
    "From that day on, Benny and the little bird became the best of friends, and they had many more adventures together, spreading kindness and joy throughout the magical forest.",
    "",
    "[hide]",
    "The end."
]
}