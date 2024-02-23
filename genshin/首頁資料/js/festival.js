/*有空合併一下*/
const stone = document.getElementById("stone-num")
const score = document.getElementById("score")
var mygacha = [document.getElementById("gacha-1"), document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
const resultTxt = result.getElementsByTagName("h1")[0]
const backgroundbtn = document.getElementById("change-background")
const onecardVid = document.getElementById("one-card-video")
const onecardAud = document.getElementById("one-card-audio")
const skip = document.getElementById("skip")
const resetbtn = document.getElementsByClassName('stone')[0]
var cards = document.getElementsByClassName("card")

var backgroundnum = 0
var attempts = 0
var myscore = 0

const myhref = "首頁資料/卡池資訊/"

function fade(tar, speed, dir) {
    for (let i = 0; i < 1000; i++) {
        setTimeout(() => { tar.style.opacity = (dir ? i : 1000 - i) / 1000; }, i * speed)
    }
}

function slide(tar, speed, from, to) {
    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            clearTimeout(); tar.style.left = String(from + ((Math.log10(i / 50)) * (to - from)) + "vw");
        }, i * speed)
    }
}

function gacha() {
    if (stone.value < 1600) { window.alert("no stone"); return }
    var pickCards = []
    stone.value = parseInt(stone.value) - 1600
    const vid = transition.getElementsByTagName("video")[0]

    for (let i = 0; i < 10; i++) { pickCards.push(pick()) }
    if (pickCards.includes(5) || pickCards.includes(6)) { vid.src = myhref + "transition5.mp4" }
    else if (pickCards.includes(4) || pickCards.includes(2)) { vid.src = myhref + "transition4.mp4" }
    else { vid.src = myhref + "transition3.mp4" }
    myscore = parseInt(score.value);
    for (let i = 0; i < pickCards.length; i++) {
        switch (pickCards[i]) {
            case 6: {
                cards[i].src = myhref + "5up.png";
                myscore += 20;
                break;
            }
            case 2: {
                cards[i].src = myhref + "4up" + parseInt(Math.random() * 3) + ".png";
                myscore += 5;
                break;
            }
            case 5: {
                cards[i].src = myhref + "5norm" + parseInt(Math.random() * 6) + ".png";
                myscore += 10;
                break;
            }
            case 4: {
                cards[i].src = myhref + "4norm" + parseInt(Math.random() * 5) + ".png";
                myscore += 5;
                break;
            }
            case 3: {
                cards[i].src = myhref + "3.png";
                break;
            }
        }
    }

    transition.style.display = "initial"
    onecardVid.style.display = "none";
    vid.currentTime = 0.1; vid.play();
    onecardAud.currentTime = "0"; onecardAud.play()
    const myaction = function () {
        vid.removeEventListener('ended', myaction); skip.removeEventListener('click', myaction)
        show_cards();
    }
    vid.addEventListener("ended", myaction);
    skip.addEventListener("click", myaction);
}

function show_cards() {
    onecardAud.pause()
    transition.style.display = "none";
    result.style.display = "initial";
    for (let i = 0; i < cards.length; i++) {
        setTimeout(() => {
            slide(cards[i], 1, 20, 10);
            cards[i].style.opacity = "1";
        }, i * 100);
    }
    setTimeout(() => {
        attempts += 10
        result.addEventListener("click", () => {
            score.value = String(parseInt(myscore / 100)) + String(parseInt(myscore % 100 / 10)) + String(parseInt(myscore % 10));
            for (let c = 0; c < cards.length; c++) {
                cards[c].style.opacity = "0"
            };
            result.style.display = "none";
            if (parseInt(score.value) >= 85) {
                window.alert("已滿85分")
            }
        }, { once: true })
    }, 2000)
}

function resetall() {
    score.value = '000'
    reset()
    stone.value = '14400'
    window.alert("已重置")
}

window.onload = function () {
    mygacha[0].addEventListener("click", resetall)
    mygacha[1].addEventListener("click", gacha)

}
document.onkeydown = (e) => {
    if (e && e.key == 'F12') {
        return false;
    } else if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        return false;
    }else if (e.shiftKey && e.key == 'F10') {
        return false;
    }
}