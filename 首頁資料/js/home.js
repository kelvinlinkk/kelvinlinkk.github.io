/*有空合併一下*/
const welcomeimg = document.getElementsByClassName("welcome-background")[0]
const backgroundbtn = document.getElementById("change-background")
var backgroundnum = 0

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
window.onload = function () {
    backgroundbtn.addEventListener("click", () => {
        backgroundnum < 7 ? backgroundnum += 1 : backgroundnum = 0
        welcomeimg.src = "首頁資料/background/background" + backgroundnum + ".jpg"
    })
}