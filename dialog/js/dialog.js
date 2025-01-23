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

async function handledialog(line){
  let words = line.split(""), display = "", islock = false, bracketContent = "";
  for(let word in words){
    if(words[word] == "[") {
      islock = true;
      bracketContent = ""; 
      continue;
    } else if (islock) {
      if (words[parseInt(word)] == "]") {
        islock = false;
        words[parseInt(word)] = commandhandler(bracketContent); 
      } else {
        bracketContent += words[word]; 
        continue;
      }
    } 
    display += words[word];
    await new Promise(r => setTimeout(r, 10));
    dialog.innerHTML = display;
    
  }
}

fetch("myText.txt")
  .then((res) => res.text())
  .then(async (text) => {
    //main logic
    let lines = text.split("\r\n");
    for(let line in lines){
        handledialog(lines[line]);
        await new Promise(resolve => {
            dialog.addEventListener('click', () => {
                resolve();
            }, { once: true });
        });
    }
   })
  .catch((e) => console.error(e));