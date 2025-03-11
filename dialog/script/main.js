import { Game } from '../lib/game.js';

const showArea = document.getElementById('showArea');
const { settingbtn, affinitybtn, exitbtn } = document.getElementsByClassName('funcbtn');
const { startbtn, continuebtn } = document.getElementsByClassName('startbtn');
const landing = document.getElementById('landing');
const game = new Game();

const toggleButtonVisibility = (isShow) => {
    showArea.style.display = isShow ? "initial" : 'none';
    settingbtn.style.visibility = !isShow ? "visible" : "hidden";
    affinitybtn.style.visibility = !isShow ? "visible" : "hidden";
    exitbtn.style.visibility = isShow ? "visible" : "hidden";
    showArea.innerHTML = "";
};

const returnToLanding = () => {
    continuebtn.style.display = localStorage.getItem('data')||game.isGamePaused ? "initial" : "none";
    landing.style.display = "initial";
}

settingbtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.style.whiteSpace = "wrap";

    const btn = document.createElement('button');
    btn.innerText = 'Untitled-1';
    showArea.appendChild(btn);

    const volume = Object.assign(document.createElement('input'),
        { id: 'volume', type: 'range', min: 0, max: 100, innerText: 'v' })
    showArea.appendChild(volume);
    volume.addEventListener('input', () => {
        game.systemManagers.audioManager.setVolume(volume.value / 100);
    })
});
affinitybtn.addEventListener('click', () => {
    toggleButtonVisibility(true);
    showArea.style.whiteSpace = "nowrap";

    if (!game.affinity) return;
    for (let name in game.affinity) {
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
    toggleButtonVisibility(false)
});

window.onload = () => {
    continuebtn.style.display = localStorage.getItem('data') ? "initial" : "none";
    startbtn.addEventListener('click', async e => {
        landing.style.display = 'none';
        await game.start();
        startbtn.style.display = "initial";
        returnToLanding();
    })
    continuebtn.addEventListener('click', async e => {
        landing.style.display = 'none';
        if (game.isGamePaused) {
            console.log(JSON.parse(localStorage.getItem('data')))
            game.toggleGamePause();
        } else {
            await game.start(JSON.parse(localStorage.getItem('data')));
            startbtn.style.display = "initial";
            returnToLanding();
        }
    })
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !game.isGamePaused) {
        game.toggleGamePause();
        startbtn.style.display = "none";
        returnToLanding();
    }
})