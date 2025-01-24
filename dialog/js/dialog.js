// Constants


class DialogSystem {
    constructor() {
        this.lineNum = 0;
        this.isLocked = true;
        this.text = []; // 清空初始對話

        this.audios = {};
        this.imgs = {};

        this.dialog = document.createElement("div");
        document.getElementsByTagName("main")[0].appendChild(this.dialog);
        this.dialog.id = "dialog";
        this.dialog.appendChild(document.createElement("p"));

        this.background = this.createElement('img', 'bg');
        this.imgfile = this.createElement('span', 'imgfile');
        this.audiofile = this.createElement('span', 'audiofile');

        // 讀取txt檔案
        fetch('story.txt')
            .then(response => response.text())
            .then(data => {
                // 將文字分割成行
                this.text = data.split('\n').filter(line => line.trim() !== '');
                // 開始顯示第一行
                this.showWords(this.lineNum);
            })
            .catch(error => console.error('Error loading story:', error));

        this.dialog.addEventListener('click', () => {
            if (!this.isLocked && this.lineNum < this.text.length) {
                this.isLocked = true;
                this.showWords(this.lineNum);
            }
        });
    }

    createElement(tag, id) {
        const element = document.createElement(tag);
        element.id = id;
        this.dialog.appendChild(element);
        return element; // Return the created element for later use
    }

    // Show words individually
    async showWords(num) {
        let words = this.text[num].split(""),
            display = "",
            isLock = false,
            bracketContent = "";

        for (let word of words) {
            if (word == "[") {
                isLock = true;
                bracketContent = "";
                continue;
            } else if (isLock) {
                if (word == "]") {
                    isLock = false;
                    word = this.commandHandler(bracketContent);
                } else {
                    bracketContent += word;
                    continue;
                }
            }
            display += word;
            await new Promise(r => setTimeout(r, 10));
            this.dialog.getElementsByTagName("p")[0].innerHTML = display;
        }
        this.isLocked = false;
        this.lineNum += 1;
    }

    // Handle [] commands
    commandHandler(com) {
        let params = com.split(" ");
        switch (params[0]) {
            case 'show':
                // [show]
                this.dialog.style.display = 'initial';
                break;
            case 'hide':
                // [hide]
                this.dialog.style.display = 'none';
                break;
            case 'n':
                // [newline]
                return '<br>';
            case 'bg':
                // background src object-fit
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
                let img = this.imgs[params[1]] ? this.imgs[params[1]] : document.createElement('img');
                // 創建圖片元素
                this.imgfile.appendChild(img);
                img.src = "resources/" + params[2];
                // Set image styles (1920x1080 grid)
                Object.assign(img.style, {
                    left: parseFloat(params[3]) / 1920 * 100 + '%',
                    top: parseFloat(params[4]) / 1080 * 100 + '%',
                    width: parseFloat(params[6]) / 1920 * 100 + '%',
                    height: parseFloat(params[7]) / 1080 * 100 + '%'
                });
                img.style.zIndex = parseFloat(params[5]);
                this.imgs[params[1]] = img; // 將圖片元素和參數存入字典
                if (params[8] == '0') {
                    this.imgs[params[1]].style.display = "none";
                } else {
                    img.style.display = "initial" // 開始顯示圖片
                }
                break;
            case 'audio':
                // [audio name src play time(s) fade(ms)]
                if (params[3] == 'play') {
                    let audio = document.createElement('audio'); // 創建音頻元素
                    this.audiofile.appendChild(audio);
                    audio.src = "resources/" + params[2];
                    audio.play(); // 開始播放音頻
                    this.audios[params[1]] = audio; // 將音頻元素和參數存入字典
                    if (params[4] != 0) {
                        setInterval(() => { this.audios[params[1]].pause(); }, parseInt(params[4]) * 1000)
                    }
                    if (params[5] != 0) {
                        let volumeIncrement = parseInt(params[5])/100;
                        this.audios[params[1]].volume = 0;
                        for (let i = 0; i < 100; i++) {
                            setTimeout(() => {
                                this.audios[params[1]].volume += 0.01;
                            }, i*volumeIncrement);
                        }
                    }
                } else {
                    if (params[5] != 0) {
                        let volumeIncrement = parseInt(params[5])/100;
                        this.audios[params[1]].volume = 1;
                        for (let i = 0; i < 100; i++) {
                            setTimeout(() => {
                                this.audios[params[1]].volume -= 0.01;
                            }, i*volumeIncrement);
                        }
                        setInterval(()=>{this.audios[params[2]].pause();},parseInt(params[5]))
                    }else{
                        this.audios[params[2]].pause(); 
                    }

                }
                break;
            case 'effect':
                // [effect]
                break;
        }
        return "";
    }
}