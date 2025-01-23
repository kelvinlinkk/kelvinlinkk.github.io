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
  
  const clickHandler = (resolve) => {
    dialog.removeEventListener('click', clickHandler);
    resolve();
  };
  
  await new Promise(resolve => {
    dialog.addEventListener('click', () => clickHandler(resolve));
  });
  
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
}

fetch("myText.txt")
  .then((res) => res.text())
  .then(async (text) => {
    //main logic
    let lines = text.split("\r\n");
    for(let line of lines){
        await handledialog(line);
    }
   })
  .catch((e) => console.error(e));