class DialogSystem {
    constructor() {
        this.dialog = document.getElementById('dialog');
        this.background = document.getElementById('bg');
        this.currentLine = 0;
        this.isAnimating = false;
        this.commands = {
            n: () => '<br>',
            img: (filename, fit = 'cover') => {
                if (filename === '0') {
                    this.background.style.visibility = 'hidden';
                    return '';
                }
                this.background.style.visibility = 'visible';
                this.background.src = `background/${filename}.jpg`;
                this.background.style.objectFit = fit;
                return '';
            }
        };
    }

    async init() {
        try {
            const response = await fetch('myText.txt');
            const text = await response.text();
            this.script = text.split('\r\n');
            this.bindEvents();
            this.processNextLine();
        } catch (error) {
            console.error('Failed to load script:', error);
        }
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isAnimating) {
                this.processNextLine();
            }
        });
    }

    parseCommand(text) {
        const commandRegex = /\[(.*?)\]/g;
        return text.replace(commandRegex, (match, command) => {
            const [cmd, ...args] = command.split(' ');
            return this.commands[cmd]?.(...args) || '';
        });
    }

    async animateText(text) {
        this.isAnimating = true;
        let displayText = '';
        const processedText = this.parseCommand(text);
        
        for (const char of processedText) {
            displayText += char;
            this.dialog.innerHTML = displayText;
            await new Promise(resolve => setTimeout(resolve, 30));
        }
        this.isAnimating = false;
    }

    async processNextLine() {
        if (this.currentLine >= this.script.length) {
            console.log('Script finished');
            return;
        }

        const line = this.script[this.currentLine];
        if (line.trim()) {
            await this.animateText(line);
        }
        this.currentLine++;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dialogSystem = new DialogSystem();
    dialogSystem.init();
});