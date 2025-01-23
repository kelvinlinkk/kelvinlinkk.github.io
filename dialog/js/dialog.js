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
document.addEventListener('DOMContentLoaded', () => {
    fetch("myText.txt")
      .then((res) => res.text())
      .then(async (text) => {
        //main logic
        let lines = text.split("\r\n");
        for(let line of lines){
            let words = line.split(""), display = "", islock = false, bracketContent = "";        
            
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
            
            // 確保在完整顯示一行文字後才等待空白鍵
            if (words.length > 0) {  // 只在有內容的行才等待
                await new Promise(resolve => {
                    const onKeyPress = (event) => {
                        if (event.key === " ") {
                            document.removeEventListener('keydown', onKeyPress);
                            resolve();
                        }
                    };
                    document.addEventListener('keydown', onKeyPress);
                });
            }
        }
       })
      .catch((e) => console.error(e));
});