import { Game } from '../lib/game.js';

const setting = document.getElementById('setting');
const settingbtn = document.getElementById('settingbtn');
const landing = document.getElementById('landing');
const startbtn = document.getElementById('startbtn');
const game = new Game();

const ICONS = {
    SETTINGS: './assets/icon/setting.png',
    LOGOUT: './assets/icon/logout.png'
};

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        game.togglePause();
    }
})

settingbtn.addEventListener('click', () => {
    const isSettingVisible = setting.style.display === 'flex';
    setting.style.display = isSettingVisible ? 'none' : 'flex';
    settingbtn.src = isSettingVisible ? ICONS.SETTINGS : ICONS.LOGOUT;
});

startbtn.addEventListener('click', async e => {
    landing.style.display = 'none';
    const data = (localStorage.getItem('data'));
    console.log(data)
    if (data) {
        await game.start(JSON.parse(data));
    } else {
        await game.start();
    }
    landing.style.display = "initial";
})