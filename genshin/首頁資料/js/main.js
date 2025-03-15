import Gacha from "./util/gacha.js"

const landing = document.getElementById('landing');
const startbtn = document.getElementById('startbtn');
const welcome = document.getElementById('welcome');

const playground = document.getElementById('playground');
const gacha1 = document.getElementById('gacha-1');
const gacha10 = document.getElementById('gacha-10');
const stone = document.getElementById('stone-num');

const displayArea = document.getElementById('display-area');
const transition = document.getElementById('transition');
const result = document.getElementById('result-area');

const gachaManager = new Gacha();
const initialize = () => {
    playground.style.display = "initial";
}
const gacha = async (num) => {
    if (stone.value < 160 * num) { window.alert("no stone"); return }
    var pickCards = [];
    stone.value = parseInt(stone.value) - 160 * num;
    const vid = transition.querySelector("video");
    const skip = transition.querySelector("button");
    const aud = transition.querySelector("audio");

    for (let i = 0; i < num; i++) { pickCards.push(gachaManager.pick()) }
    switch (Math.max(...pickCards)) {
        case 6: case 5: { vid.src = "首頁資料/卡池資訊/transition5.mp4"; break }
        case 4: case 3: { { vid.src = "首頁資料/卡池資訊/transition4.mp4"; break } }
        default: { vid.src = "首頁資料/卡池資訊/transition3.mp4"; break; }
    }
    playground.style.display = "none";
    displayArea.style.display = "initial"; transition.style.display = "initial";
    vid.currentTime = 0.1; vid.play();
    aud.currentTime = 0.1; aud.play();

    const hide = () => {
        displayArea.style.display = "none";
        transition.style.display = "none";
        vid.pause(); aud.pause();
    }
    return new Promise((resolve) => {
        vid.addEventListener('ended', () => { hide(); resolve(pickCards); })
        skip.addEventListener('click', () => { hide(); resolve(pickCards); })
    })
}

const showcard = async (num, pickCards) => {
    var cards = [];
    const vid = result.querySelector('video');
    const resultTxt = result.querySelector('h1');

    if (num === 10) {
        result.style.display = "initial";
        for (let i = 0; i < 10; i++) {
            cards[i] = Object.assign(document.createElement('img'), { className: "cards" });
            switch (pickCards[i]) {
                case 6: { cards[i].src = "首頁資料/卡池資訊/5up.png"; break; }
                case 4: { cards[i].src = "首頁資料/卡池資訊/4up" + parseInt(Math.random() * 3) + ".png"; break; }
                case 5: { cards[i].src = "首頁資料/卡池資訊/5norm" + parseInt(Math.random() * 6) + ".png"; break; }
                case 3: { cards[i].src = "首頁資料/卡池資訊/4norm" + parseInt(Math.random() * 5) + ".png"; break; }
                case 2: { cards[i].src = "首頁資料/卡池資訊/3.png"; break; }
            }
            result.appendChild(cards[i]);
            setTimeout(() => {
                slide(cards[i], 1, 20, 5);
                cards[i].style.visibility = "visible";
            }, i * 100);
        }
    }else if(num === 1){
        const card = pickCards[0];
        result.style.display = "initial";
        switch(card){
            case 6:{
                vid.style.visibility = "visible";vid.currentTime = "0"
                vid.src = "首頁資料/卡池資訊/onecard6.mp4"
                break;
            }
            case 4:{resultTxt.innerText = "4UP星";break;}
            case 3:{resultTxt.innerText = "4星";break;}
            case 2:{
                vid.style.visibility = "visible";vid.currentTime = "0"
                vid.src = "首頁資料/卡池資訊/onecard3.mp4"
                break;
            }
            default:{resultTxt.innerText = card+"星";break;}
        }
    }

    return new Promise(r=>{result.addEventListener('click',()=>{
        result.style.display = 'none';
        playground.style.display = "initial";
        vid.style.visibility = 'hidden';
        [...document.getElementsByClassName('cards')].forEach(elm => {elm.remove();});
        r();
    })})
}

const start = async () => {
    landing.style.display = "none";
    const welcomeVid = welcome.querySelector('video');
    const welcomeAud = welcome.querySelector('audio');
    welcome.style.display = "initial";
    welcomeVid.play();
    setTimeout(() => {
        if (welcome.style.display !== "none") {
            welcomeAud.play();
        }
    }, 3000);
    await new Promise(r => {
        welcomeVid.addEventListener('click', r);
    }, { once: true })
    welcomeVid.pause();
    welcomeAud.pause();
    welcome.style.display = "none";
    initialize();
    gacha1.addEventListener('click', async () => { showcard(1, await gacha(1)); });
    gacha10.addEventListener('click', async () => { showcard(10, await gacha(10)); });
}
startbtn.addEventListener('click', start)

function fade(tar, speed, dir) {
    for (let i = 0; i < 1000; i++) {
        setTimeout(() => { tar.style.opacity = (dir ? i : 1000 - i) / 1000; }, i * speed)
    }
}

function slide(tar, speed, from, to) {
    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            clearTimeout(); tar.style.left = String(from + ((Math.log10(i / 50)) * (to - from)) + "%");
        }, i * speed)
    }
}