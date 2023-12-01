const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
const pools = document.getElementsByClassName("pool")
//const genshin = document.getElementById("genshin")
const poolinfo = document.getElementById("poolinfo")
const pool = document.getElementsByClassName("activity-title")[0]
var mygacha = [document.getElementById("gacha-1"),document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
var cards = document.getElementsByClassName("card")

var poolnames=["卡池一","卡池二","卡池三","卡池四",]
pool.innerHTML = poolnames[0]

function fade(tar, speed) {
    for (let i = 0; i < 1000; i++) {
        setTimeout(
            function () {
                clearTimeout(); tar.style.opacity = (1000-i) / 1000;
            }, i * speed)
    }
}

function drop(tar, speed,from,to){
    for (let i = 0; i < 500; i++) {
        setTimeout(
            function () {
                clearTimeout(); tar.style.top = String(from + (i / 500)*(to-from))+"vh";
            }, i * speed)
    }
}

function gacha(num){
    let vid = transition.getElementsByTagName("video")[0]
    vid.style.display="initial"
    vid.play()
    vid.currentTime = parseInt(vid.currentTime) + 8
    vid.addEventListener("ended",()=>{
        vid.style.display="none";result.style.display="initial";
        for(let i = 0;i<cards.length;i++){
            setTimeout(()=>{drop(cards[i],2,0,20)},i*100);
        }
        setTimeout(()=>{result.style.display="none"},10000)})
    stone.value=parseInt(stone.value) - 160*num
}

window.onload=function(){
    //setTimeout(()=>{fade(genshin,1)},1000)
    //setTimeout(()=>{genshin.style.display="none"},2000)
    myadd.addEventListener("click",function(){console.log(stone.value=parseInt(stone.value)+1)})
    mygacha[0].addEventListener("click",function(){gacha(1)})
    mygacha[1].addEventListener("click",function(){gacha(10)})
}

for(let i = 0; i < pools.length;i++){
    pools[i].addEventListener('click',()=>{pool.innerHTML = poolnames[i];poolinfo.src = "首頁資料/卡池資訊/" + (i+1) + ".mp4";})
}