import { Game } from '../lib/game.js';

const showArea = document.getElementById('showArea');
const {settingbtn,affinitybtn,exitbtn} = document.getElementsByClassName('funcbtn');
const landing = document.getElementById('landing');
const startbtn = document.getElementById('startbtn');
var data = localStorage.getItem('data');
const game = new Game();

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        game.toggleGamePause();
    }
})

const toggleButtonVisibility = (isShow) => {
    settingbtn.style.visibility = !isShow ? "visible" : "hidden";
    affinitybtn.style.visibility = !isShow ? "visible" : "hidden";
    exitbtn.style.visibility = isShow ? "visible" : "hidden";
};

settingbtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.style.display = "flex";
    showArea.innerHTML = "";
    for(let name of ['save','sound','Untitled-1']){
        const btn = document.createElement('button');
        btn.innerText = name;
        showArea.appendChild(btn);
    }
});
affinitybtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.innerHTML = "";
    showArea.style.display = "initial";
    if(!game.affinity) return;
    for(let name in game.affinity){
        const section = document.createElement('section');
        showArea.appendChild(section);
        const profile = section.appendChild(document.createElement('img'));
        profile.src = `./assets/profile/${name}.jpg`;
        const nametag = section.appendChild(document.createElement('h1'));
        nametag.innerText = name;
        const affinity = section.appendChild(document.createElement('p'));
        affinity.innerText = `${game.affinity[name]}%`;
    }
});
exitbtn.addEventListener('click', () => {
    showArea.style.display = "none";
    toggleButtonVisibility(false)
});

startbtn.addEventListener('click', async e => {
    landing.style.display = 'none';
    data = localStorage.getItem('data');
    if (data) {
        await game.start(JSON.parse(data));
    } else {
        await game.start();
    }
    landing.style.display = "initial";
})