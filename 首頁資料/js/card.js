/*有空合併一下*/
const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
const pools = document.getElementsByClassName("pool")
const poolinfo = document.getElementById("poolinfo")
const pool = document.getElementsByClassName("activity-title")[0]
var mygacha = [document.getElementById("gacha-1"),document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
const onecard = document.getElementById("one-card")
var cards = document.getElementsByClassName("card")

var poolnames=["卡池一","卡池二","卡池三","卡池四",]
pool.innerHTML = poolnames[0]
var showlock = false

function fade(tar, speed, dir) {
    for (let i = 0; i < 1000; i++) {
        setTimeout(()=>{tar.style.opacity = (dir?i:1000-i) / 1000;}, i * speed)
    }
}

function slide(tar, speed,from,to){
    for (let i = 0; i < 500; i++) {
        setTimeout(()=>{
                clearTimeout(); tar.style.left = String(from + ((Math.log10(i/50))*(to-from)) + "vw");
            }, i * speed)
    }
}

function gacha(num){
    if(stone.value<0){
        window.alert("no stone");
        return}
    stone.value=parseInt(stone.value) - 160*num
    let vid = transition.getElementsByTagName("video")[0]
    transition.style.display="initial"
    vid.play()
    vid.currentTime = parseInt(vid.currentTime) + 8
    showlock=false
    if(num==10){vid.onended=show_ten_cards;vid.onclick=show_ten_cards}
    else{vid.onended=show_card;vid.onclick=show_card}
}
function show_ten_cards(){
    if(showlock){return}
    showlock = true;
    onecard.style.opacity="0";
    transition.style.display="none";result.style.display="initial";
    for(let i = 0;i<cards.length;i++){
        setTimeout(()=>{slide(cards[i],1,20,10);cards[i].style.opacity="1"},i*100);
    }
    setTimeout(()=>{
        result.addEventListener("click",()=>{
            for(let c=0;c<cards.length;c++){
                cards[c].style.opacity="0"
            };
            result.style.display="none";
        })
    },1500)
}
function show_card(){
    if(showlock){return}
    showlock = true
    for(let c=0;c<cards.length;c++){
        cards[c].style.opacity="0"
    };
    transition.style.display="none";result.style.display="initial";
    fade(onecard,1,1);
    myCard = pick()
    setTimeout(()=>{onecard.style.opacity="1"},1)
    setTimeout(()=>{result.addEventListener("click",()=>{
        onecard.style.opacity="0";
        result.style.display="none";
    })},1000)
}

window.onload=function(){
    myadd.addEventListener("click",function(){console.log(stone.value=parseInt(stone.value)+1)})
    mygacha[0].addEventListener("click",function(){gacha(1)})
    mygacha[1].addEventListener("click",function(){gacha(10)})
}

for(let i = 0; i < pools.length;i++){
    pools[i].addEventListener('click',()=>{
        pool.innerHTML = poolnames[i];
        poolinfo.src = "首頁資料/卡池資訊/" + (i+1) + ".mp4";
    })
}