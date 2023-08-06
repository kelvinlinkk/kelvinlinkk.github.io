var flag = false;
//info is from href.js
function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1>'+ infoname[j] +'</h1><section>');
                for(let i =0; i<info[j].length;i++){
                        document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/'+ info[j][i][2] +'"></a></div>')}   
                document.write('</section></article>');
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
function Fade(){
        for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById("mousebar").style.opacity = String(i/100);},i*2)}
}
