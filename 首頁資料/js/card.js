/*有空合併一下*/
const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
var mygacha = [document.getElementById("gacha-1"),document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
const onecard = document.getElementById("one-card")
const skip = document.getElementById("skip")
var cards = document.getElementsByClassName("card")

var showlock = false
attempts = 0

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
    var pickCards = []
    if(stone.value<160*num){
        window.alert("no stone")
        return}
    stone.value=parseInt(stone.value) - 160*num
    let vid = transition.getElementsByTagName("video")[0]
    for(let i = 0;i<num;i++){
        pickCards.push(pick())
    }
    if(pickCards.includes(5) || pickCards.includes(6)){
        vid.src="首頁資料/卡池資訊/transition5.mp4"
    }else if(pickCards.includes(4)){
        vid.src="首頁資料/卡池資訊/transition4.mp4"
    }else{
        vid.src="首頁資料/卡池資訊/transition3.mp4"
    }
    transition.style.display="initial"
    vid.play()
    vid.currentTime = 0.1
    showlock=false
    if(num==10){
        vid.addEventListener("ended",()=>{show_ten_cards(pickCards)},{once:true});
        skip.addEventListener("click",()=>{show_ten_cards(pickCards)},{once:true});}
    else{
        vid.addEventListener("ended",()=>{show_card(pickCards)},{once:true});
        skip.addEventListener("click",()=>{show_card(pickCards)},{once:true});}
}

function show_ten_cards(myCard){
    let bestcard = [0,0]
    if(showlock){return}
    showlock = true;
    onecard.style.opacity="0";
    transition.style.display="none";result.style.display="initial";
    for(let i = 0;i<cards.length;i++){
        setTimeout(()=>{
            slide(cards[i],1,20,10);
            cards[i].style.opacity="1";
            if(bestcard[0]<myCard[i]){
                bestcard = [myCard,attempts+i+1]
            }
            if(myCard[i]==6){
                cards[i].src="首頁資料/卡池資訊/5up.png"
            }else if(myCard[i]==5){
                cards[i].src="首頁資料/卡池資訊/5norm.png"
            }
            else if(myCard[i]==4){
                cards[i].src="首頁資料/卡池資訊/4" + parseInt(Math.random()*2) + ".png"
            }
            else{
                cards[i].src="首頁資料/卡池資訊/3.png"
            }
        },i*100);
    }
    setTimeout(()=>{
        //window.alert((bestcard[0]==6?"五星UP":bestcard[0]==5?"五星":"四星") + " 第" + bestcard[1] + "抽\n(抽到五星之後此計數器不會重置，但概率計算會重置)")
        attempts+=10
        result.addEventListener("click",()=>{
            for(let c=0;c<cards.length;c++){
                cards[c].style.opacity="0"
            };
            result.style.display="none";
        },{once:true})
    },2000)
    
}
function show_card(myCard){
    if(showlock){return}
    showlock = true
    for(let c=0;c<cards.length;c++){
        cards[c].style.opacity="0"
    };
    result.getElementsByTagName("h1")[0].style.opacity="1"
    transition.style.display="none";result.style.display="initial";
    fade(onecard,1,1);
    result.getElementsByTagName("h1")[0].innerHTML=myCard[0]+"星"
    setTimeout(()=>{onecard.style.opacity="1"},1)
    setTimeout(()=>{result.addEventListener("click",()=>{
        onecard.style.opacity="0";
        result.getElementsByTagName("h1")[0].style.opacity="0"
        result.style.display="none";
        attempts+=1
    },{once:true})},1000)
}

window.onload=function(){
    myadd.addEventListener("click",function(){stone.value=parseInt(stone.value)+1})
    mygacha[0].addEventListener("click",function(){gacha(1)})
    mygacha[1].addEventListener("click",function(){gacha(10)})
}