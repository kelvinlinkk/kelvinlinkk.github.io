const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
const pools = document.getElementsByClassName("pool")
//const genshin = document.getElementById("genshin")
const poolinfo = document.getElementById("poolinfo")
const pool = document.getElementsByClassName("activity-title")[0]
const gacha1 = document.getElementById("gacha-1")
const gacha10 = document.getElementById("gacha-10")
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")

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
function gacha(num){
    let vid = transition.getElementsByTagName("video")[0]
    vid.style.display="initial"
    vid.play()
    vid.addEventListener("ended",()=>{vid.style.display="none";result.style.display="initial";setTimeout(()=>{result.style.display="none"},10000)})
    stone.value=parseInt(stone.value) - 160*num
}

window.onload=function(){
    //setTimeout(()=>{fade(genshin,1)},1000)
    //setTimeout(()=>{genshin.style.display="none"},2000)
    myadd.addEventListener("click",function(){console.log(stone.value=parseInt(stone.value)+1)})
    gacha1.addEventListener("click",function(){gacha(1)})
    gacha10.addEventListener("click",function(){gacha(10)})
}

for(let i = 0; i < pools.length;i++){
    pools[i].addEventListener('click',()=>{pool.innerHTML = poolnames[i];poolinfo.src = "首頁資料/卡池資訊/" + (i+1) + ".mp4";})
}