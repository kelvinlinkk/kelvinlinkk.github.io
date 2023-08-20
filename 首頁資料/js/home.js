var flag = false;
var flagArr = [];
addEventListener('scroll',starting,false)
//info is from href.js
function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1 onclick="displaySec(' + j + ')">'+ infoname[j] +'</h1><section>');
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
        if(document.getElementById("main").style.opacity == "0"){
        Fading("schedule",5,1)
        Fading("main",5,1)
}}
function Fading(id,speed,f){
        if (f){for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.opacity = String(i/100);},i*speed)}}
        else{for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById(id).style.opacity = String((100-i)/100);},i*speed)}} 
}
function FadingByObj(obj,speed,f){
        if (f){for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String(i/100);},i*speed)}}
        else{for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String((100-i)/100);},i*speed)}} 
}
function displaySec(num){
        let mysection = document.getElementsByTagName("article")[num].getElementsByTagName('section')[0]
        FadingByObj(mysection,5,!flagArr[num]);
        if(flagArr[num]==0){mysection.style.setProperty('display','block','important');flagArr[num] = 1}
        else{setTimeout(function(){mysection.style.setProperty('display','none','important');flagArr[num] = 0;},800)}
}