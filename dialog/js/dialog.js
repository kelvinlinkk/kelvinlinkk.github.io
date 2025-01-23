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
}

  // Start of Selection
fetch("myText.txt")
  .then((res) => res.text())
  .then(async (text) => {
    const lines = text.split("\r\n");
    for (const line of lines) {
      let display = "", islock = false, bracketContent = "";
      
      await new Promise(resolve => {
        const clickHandler = () => {
          dialog.removeEventListener('click', clickHandler);
          resolve();
        };
        dialog.addEventListener('click', clickHandler);
      });

      for (const word of line) {
        if (word === "[") {
          islock = true;
          bracketContent = "";
        } else if (islock) {
          if (word === "]") {
            islock = false;
            display += commandhandler(bracketContent);
          } else {
            bracketContent += word;
          }
        } else {
          display += word;
        }
        await new Promise(r => setTimeout(r, 10));
        dialog.innerHTML = display;
      }
    }
  })
  .catch(console.error);