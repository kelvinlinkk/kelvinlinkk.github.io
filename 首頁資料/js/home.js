var flag = false;
var flagArr = [];
addEventListener('scroll',starting,false)

function Fading(id,speed,f){
        if (f){for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.opacity = String(i/100);},i*speed)}}
        else{for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.opacity = String((100-i)/100);},i*speed)}} 
}
function Bluring(id,speed,depth,frames,f){
        if (f){for (let i = 0;i<frames;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.filter = "blur(" + String(i*depth/frames) + "px)";},i*speed)}}
        else{for (let i = 0;i<frames;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.filter = "blur(" + String((frames-i)*depth/frames) + "px)";},i*speed)}} 
}
function FadingByObj(obj,speed,f){
        if (f){for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String(i/100);},i*speed)}}
        else{for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String((100-i)/100);},i*speed)}} 
}
//info is from href.js
function drawLogo(num){//這部分要改善 就是要找出第一個drawlogo
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1 onclick="displaySec(' + (j+num) + ')">'+ infoname[j] +'</h1><section>');
                for(let i =0; i<info[j].length;i++){
                        document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="首頁資料/logo/'+ info[j][i][2] +'"></a></div>')}   
                document.write('</section></article>');
                flagArr[j]=0
        }
};  
function display(){ 
        var search = document.getElementById("search");
        var time = document.getElementById("time");
        var countdown = document.getElementById("countdown");
        if(flag){
                flag = !flag;
                for (let i = 0;i<100;i++) {
                        setTimeout(function(){
                        search.style.opacity = String(i/100);
                        time.style.opacity = String(i/100);
                        countdown.style.opacity = String(i/100);},10*i)
                }
        }     
        else{
                flag = !flag;
                for (let i = 100;i>0;i--) {
                        setTimeout(function(){
                        search.style.opacity = String(i/100);
                        time.style.opacity = String(i/100);
                        countdown.style.opacity = String(i/100);},10*(100-i))
                }
        }
}
function starting(){
        if(document.getElementsByTagName("body")[0].getBoundingClientRect().top == "0"){
        Fading("schedule",5,0)
        Fading("main",5,0)
        Bluring("myvid",80,5,20,0)}
        if(document.getElementById("main").style.opacity <= 0.01){
        Fading("schedule",5,1)
        Fading("main",5,1)
        Bluring("myvid",80,5,20,1)
}}
function displaySec(num){
        let mysection = document.getElementsByTagName("article")[num].getElementsByTagName('section')[0]
        flagArr[num] = !flagArr[num]
        FadingByObj(mysection,5,flagArr[num]);
        if(flagArr[num]==1){setTimeout(function(){mysection.style.setProperty('display','block','important');},1)}
        else{setTimeout(function(){mysection.style.setProperty('display','none','important');},800)}
}