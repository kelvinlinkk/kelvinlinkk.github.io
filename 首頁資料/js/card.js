/*有空合併一下*/
const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
var mygacha = [document.getElementById("gacha-1"), document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
const resultTxt = result.getElementsByTagName("h1")[0]
const welcomebtn = document.getElementById("welcome-img")
const welcomeAud = document.getElementById("welcome-audio")
const welcomeVid = document.getElementById("welcome-video")
const welcomelogo = document.getElementsByClassName("welcome-logo")
const welcomeimg = document.getElementsByClassName("welcome-background")[0]
const backgroundbtn = document.getElementById("change-background")
const onecardVid = document.getElementById("one-card-video")
const onecardAud = document.getElementById("one-card-audio")
const skip = document.getElementById("skip")
var cards = document.getElementsByClassName("card")

var backgroundnum = 0
var attempts = 0

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

function gacha(num) {
    if (stone.value < 160 * num) { window.alert("no stone"); return }
    var pickCards = []
    stone.value = parseInt(stone.value) - 160 * num
    const vid = transition.getElementsByTagName("video")[0]

    for (let i = 0; i < num; i++) { pickCards.push(pick()) }
    if (pickCards.includes(5) || pickCards.includes(6)) { vid.src = "首頁資料/卡池資訊/transition5.mp4" }
    else if (pickCards.includes(4) || pickCards.includes(2)) { vid.src = "首頁資料/卡池資訊/transition4.mp4" }
    else { vid.src = "首頁資料/卡池資訊/transition3.mp4" }

    for (let i = 0; i < pickCards.length; i++) {
        switch (pickCards[i]) {
            case 6: { cards[i].src = "首頁資料/卡池資訊/5up.png"; break; }
            case 2: { cards[i].src = "首頁資料/卡池資訊/4up" + parseInt(Math.random() * 3) + ".png"; break; }
            case 5: { cards[i].src = "首頁資料/卡池資訊/5norm" + parseInt(Math.random() * 6) + ".png"; break; }
            case 4: { cards[i].src = "首頁資料/卡池資訊/4norm" + parseInt(Math.random() * 5) + ".png"; break; }
            case 3: { cards[i].src = "首頁資料/卡池資訊/3.png"; break; }
        }
    }

    transition.style.display = "initial"
    onecardVid.style.display = "none";
    vid.currentTime = 0.1; vid.play();
    onecardAud.currentTime = "0"; onecardAud.play()
    const myfunc_ten = function () {
        vid.removeEventListener('ended', myfunc_ten); skip.removeEventListener('click', myfunc_ten)
        show_ten_cards();
    }
    const myfunc_one = function () {
        vid.removeEventListener('ended', myfunc_one); skip.removeEventListener('click', myfunc_one)
        show_card(pickCards);
    }
    if (num == 10) {
        vid.addEventListener("ended", myfunc_ten);
        skip.addEventListener("click", myfunc_ten);
    }
    else {
        vid.addEventListener("ended", myfunc_one);
        skip.addEventListener("click", myfunc_one);
    }
}

function show_ten_cards() {
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
            for (let c = 0; c < cards.length; c++) {
                cards[c].style.opacity = "0"
            };
            result.style.display = "none";
        }, { once: true })
    }, 2000)

}
function show_card(myCard) {
    onecardAud.pause()
    for (let c = 0; c < cards.length; c++) { cards[c].style.opacity = "0" };
    resultTxt.style.opacity = "1"
    transition.style.display = "none";
    result.style.display = "initial";
    resultTxt.innerHTML = (myCard[0] == 4 ? "4" : myCard[0] == 2 ? "4UP" : myCard[0]) + "星"

    setTimeout(() => {
        if (myCard[0] == 6 || myCard[0] == 3) {
            resultTxt.style.opacity = "0"
            onecardVid.style.display = "initial";
            onecardVid.src = "首頁資料/卡池資訊/onecard" + myCard[0] + ".mp4"
        }
        onecardVid.style.opacity = "1"; onecardVid.currentTime = "0"
    }, 1)

    setTimeout(() => {
        result.addEventListener("click", () => {
            onecardVid.style.opacity = "0";
            resultTxt.style.opacity = "0"
            result.style.display = "none";
            attempts += 1
        }, { once: true })
    }, 1000)
}
window.onload = function () {
    myadd.addEventListener("click", function () { stone.value = parseInt(stone.value) + 1 })
    mygacha[0].addEventListener("click", function () { gacha(1) })
    mygacha[1].addEventListener("click", function () { gacha(10) })
    welcomebtn.addEventListener('click', () => {
        welcomeVid.style.display = 'initial';
        welcomebtn.style.display = "none";
        for (let i = 0; i < welcomelogo.length; i++) {
            welcomelogo[i].style.display = "none"
        }
        document.getElementById("welcome-search").style.display = "none"
        backgroundbtn.style.display = "none"
        welcomeVid.play();
        setTimeout(() => { welcomeAud.play(); }, 3000)
    }
    )
    mylock = false
    welcomeVid.addEventListener('play', () => {
        welcomeVid.onclick = () => {
            if(parseFloat(welcomeVid.currentTime)>14 && mylock==false){
                mylock=true
                fade(document.getElementsByClassName("welcome")[0], 1, 0);
                setTimeout(() => { document.getElementsByClassName("welcome")[0].style.display = "none"
                welcomeVid.pause() }, 500)
            }
        }
    }
    )
    backgroundbtn.addEventListener("click", () => {
        backgroundnum < 5 ? backgroundnum += 1 : backgroundnum = 0
        welcomeimg.src = "首頁資料/卡池資訊/background" + backgroundnum + ".jpg"
    })
}