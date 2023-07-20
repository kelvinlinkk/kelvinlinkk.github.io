//info is from href.js
function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1 onclick=\"showthis(\'list' + j + '\')\">'+ infoname[j] +'</h1><section id=\"list' + j + '\">');
                for(let i =0; i<info[j].length;i++){
                        document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/'+ info[j][i][2] +'" onmouseenter="inMouse('+ j + ',' + i +')" onmouseout="mouse=\'\';document.getElementById(\'mousebar\').style.opacity = \'0\';"></a></div>')}   
                document.write('</section></article>');
        }
};

function start(){
        for (let i = 0;i<100;i++) {
                setTimeout(function(){
                document.getElementById('cover').style.opacity = String((100-i)/100);
                document.getElementById('main').style.opacity = String(i/100);
                document.getElementById('search').style.opacity = String(i/100);
                document.getElementById('page').style.opacity = String(i/100);
                },10*i)
        }
        setTimeout(function(){
                document.getElementById('cover').style.display = "none"},1000)
}

function showthis(elem){
        document.getElementById(elem).style.display='inherit'
        for (let i = 0;i<100;i++) {
                setTimeout(function(){
                        document.getElementById(elem).style.opacity = String(i/100);}
                        ,5*i)
        }
}
function closeall(){
        for (let j = 0; j < info.length; j++){
                for (let i = 0;i<100;i++) {
                        setTimeout(function(){
                                document.getElementById('list' + j).style.opacity = String(i/100);}
                                ,5*(100-i))
                }
                setTimeout(()=>document.getElementById('list' + j).style.display='none',500)
        }
        
}
function Fade(){
        for (let i = 0;i<100;i++) {setTimeout(function(){clearTimeout();document.getElementById("mousebar").style.opacity = String(i/100);},i*2)}
}
