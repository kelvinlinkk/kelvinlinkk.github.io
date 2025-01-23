class DialogSystem {
    constructor() {
        this.linenum = 0;
        this.islocked = false;
        this.text = [
            "Once upon a time, there was a small village nestled in the mountains.[img sunset cover]",
            "The villagers lived peacefully,[n] tending to their gardens and livestock.[img 0 cover]"
        ];
        this.dialog = document.getElementById('dialog');
        this.background = document.getElementById('bg');
        
        // 綁定點擊事件
        document.addEventListener('click', () => {
            this.islocked = true;
            this.showwords(this.linenum);
        });
    }

    commandhandler(com) {
        let params = com.split(" ");
        switch(params[0]) {
            case 'n':
                return '<br>';
            case 'img':
                this.background.style.visibility = 'visible';
                if(params[1] == 0) {
                    this.background.style.visibility = 'hidden';
                    break;
                }
                this.background.src = 'background/' + params[1] + '.jpg';
                this.background.style.objectFit = params[2];
                break;
        }
        return "";
    }

    async showwords(num) {
        let words = this.text[num].split(""), 
            display = "", 
            islock = false, 
            bracketContent = "";        
        
        for(let word of words) {
            if(word == "[") {
                islock = true;
                bracketContent = ""; 
                continue;
            } else if (islock) {
                if (word == "]") {
                    islock = false;
                    word = this.commandhandler(bracketContent); 
                } else {
                    bracketContent += word; 
                    continue;
                }
            } 
            display += word;
            await new Promise(r => setTimeout(r, 10));
            this.dialog.innerHTML = display;
        }
        this.islocked = false;
        this.linenum += 1;
    }
}

// 初始化對話系統
const dialogSystem = new DialogSystem();