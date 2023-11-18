const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
const pools = document.getElementsByClassName("pool")
var poolnames=["卡池一","卡池二","卡池三","卡池四",]
const pool = document.getElementsByClassName("activity-title")[0]
pool.innerHTML = poolnames[0]
myadd.addEventListener("click",function(){console.log(stone.value=parseInt(stone.value)+1)})
for(let i = 0; i < pools.length;i++){
    pools[i].addEventListener('click',()=>{pool.innerHTML = poolnames[i]})
}