const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
const pools = document.getElementsByClassName("pool")
const genshin = document.getElementById("genshin")
var poolnames=["卡池一","卡池二","卡池三","卡池四",]
const pool = document.getElementsByClassName("activity-title")[0]
pool.innerHTML = poolnames[0]
myadd.addEventListener("click",function(){console.log(stone.value=parseInt(stone.value)+1)})

function fade(tar, speed) {
    for (let i = 0; i < 1000; i++) {
        setTimeout(
            function () {
                clearTimeout(); tar.style.opacity = (1000-i) / 1000;
            }, i * speed)
    }
}

window.onload=function(){
    setTimeout(()=>{fade(genshin,1)},1000)
}

for(let i = 0; i < pools.length;i++){
    pools[i].addEventListener('click',()=>{pool.innerHTML = poolnames[i]})
}