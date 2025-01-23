var linenum = 0;
var islocked = false;
const text = [
    "Once upon a time, there was a small village nestled in the mountains.[img sunset cover]",
    "The villagers lived peacefully,[n] tending to their gardens and livestock.[img 0 cover]"
    ]

const dialog = document.getElementById('dialog')
const background = document.getElementById('bg')
function commandhandler(com){
  let params = com.split(" ");
  switch(params[0]){
    case 'n':
      return '<br>';
    case 'img':
      background.style.visibility = 'visible';
      if(params[1]==0){
        background.style.visibility = 'hidden';
        break;
      }
      background.src = 'background/' + params[1] + '.jpg';
      background.style.objectFit = params[2];
      break;
  }
  return "";
}

async function showwords(num){
    let words = text[num].split(""), display = "", islock = false, bracketContent = "";        
    
    // 先完成整行文字的處理
    for(let word of words){
        if(word == "[") {
            islock = true;
            bracketContent = ""; 
            continue;
        } else if (islock) {
            if (word == "]") {
                islock = false;
                word = commandhandler(bracketContent); 
            } else {
                bracketContent += word; 
                continue;
            }
        } 
        display += word;
        await new Promise(r => setTimeout(r, 10));
        dialog.innerHTML = display;
    }
    islocked = false;
    linenum +=1;
}

document.addEventListener('click', () => {
    islocked = true;
    showwords(linenum);
});