//constants
const dialog = document.getElementById('dialog');
const background = document.getElementById('bg');
const startbutton = document.getElementById('startbutton')

class DialogSystem {
    constructor() {
        this.linenum = 0;
        this.islocked = true;

        //story here
        this.text = [
            "Once upon a time, there was a small village nestled in the mountains.[bg sunset cover]",
            "The villagers lived peacefully,[n] tending to their gardens and livestock.[bg 0 cover]"
        ];

        this.showwords(this.linenum);
        dialog.addEventListener('click', () => {
            this.islocked = true;
            this.showwords(this.linenum);
        });
    }
    // show words individually
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
            dialog.innerHTML = display;
        }
        this.islocked = false;
        this.linenum += 1;
    }

    //handle [] demmands
    commandhandler(com) {
        let params = com.split(" ");
        switch(params[0]) {
            case 'show':
                //show dialog
                dialog.style.visibility = 'visible';
                break;
            case 'hide':
                //show dialog
                dialog.style.display = 'hidden';
                break;
            case 'n':
                //new line
                return '<br>';
            case 'bg':
                //background src object-fit
                if(params[1] == 0) {
                    background.style.visibility = 'hidden';
                } else {
                    background.src = 'background/' + params[1] + '.jpg';
                    background.style.visibility = 'visible';
                    background.style.objectFit = params[2];
                }
                break;
            case 'img':
                //img display
                break;
            case 'audio':
                //audio
                break;
            case 'effect':
                //effect
                break;
        }
        return "";
    }
}

//event listeners
window.onload=()=>{
    dialog.style.display = 'none';
    background.src = "background/resize.png";
}
startbutton.onclick=()=>{
    dialog.style.display = 'initial';
    background.style.visibility = "hidden";
    background.src = "";
    startbutton.style.display = 'none';
    const dialogSystem = new DialogSystem();
}