/*有空合併一下*/
const myadd = document.getElementById("plus")
const stone = document.getElementById("stone-num")
var mygacha = [document.getElementById("gacha-1"),document.getElementById("gacha-10")]
const transition = document.getElementById("transition")
const result = document.getElementById("result-area")
const onecardVid = document.getElementById("one-card-video")
const onecardAud = document.getElementById("one-card-audio")
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
    if(stone.value<160*num){window.alert("no stone");return}

    var pickCards = []
    stone.value=parseInt(stone.value) - 160*num
    let vid = transition.getElementsByTagName("video")[0]
    for(let i = 0;i<num;i++){pickCards.push(pick())}

    if(pickCards.includes(5) || pickCards.includes(6)){vid.src="首頁資料/卡池資訊/transition5.mp4"}
    if(pickCards.includes(4) || pickCards.includes(2)){vid.src="首頁資料/卡池資訊/transition4.mp4"}
    if(pickCards.includes(3)){vid.src="首頁資料/卡池資訊/transition3.mp4"}

    onecardAud.currentTime="0"
    transition.style.display="initial"
    onecardVid.style.display="none";
    vid.currentTime = 0.1;vid.play();
    onecardAud.currentTime="0";onecardAud.play()

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
    onecardAud.pause()
    transition.style.display="none";
    result.style.display="initial";
    for(let i = 0;i<cards.length;i++){
        cards[i].src=""
        setTimeout(()=>{
            slide(cards[i],1,20,10);
            if(bestcard[0]<myCard[i]){
                bestcard = [myCard,attempts+i+1]
            }
            if(myCard[i]==6){
                cards[i].src="首頁資料/卡池資訊/5up.png"
            }
            else if(myCard[i]==2){
                cards[i].src="首頁資料/卡池資訊/4up" + parseInt(Math.random()*3) + ".png"
            }
            else if(myCard[i]==5){
                cards[i].src="首頁資料/卡池資訊/5norm" + parseInt(Math.random()*5) + ".png"
            }
            else if(myCard[i]==4){
                cards[i].src="首頁資料/卡池資訊/4norm" + parseInt(Math.random()*4) + ".png"
            }
            else{
                cards[i].src="首頁資料/卡池資訊/3.png"
            }
            cards[i].style.opacity="1";
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
    onecardAud.pause()
    for(let c=0;c<cards.length;c++){
        cards[c].style.opacity="0"
    };
    result.getElementsByTagName("h1")[0].style.opacity="1"
    transition.style.display="none";
    result.style.display="initial";
    result.getElementsByTagName("h1")[0].innerHTML=(myCard[0]==6?"5UP":myCard[0]==2?"4UP":myCard[0])+"星"
    setTimeout(()=>{
        if(myCard[0]==6){onecardVid.style.display="initial";result.getElementsByTagName("h1")[0].style.opacity="0"}
        onecardVid.style.opacity="1";onecardVid.currentTime="0"
    },1)
    setTimeout(()=>{result.addEventListener("click",()=>{
        onecardVid.style.opacity="0";
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