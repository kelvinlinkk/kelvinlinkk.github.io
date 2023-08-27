blurflag = 2
addEventListener('scroll',starting,false)
function Bluring(obj,speed,depth,frames,f){
        if (f){for (let i = 0;i<=frames;i++) {setTimeout(function(){clearTimeout();obj.style.filter = "blur(" + String(i*depth/frames) + "px) ";},i*speed)}}
        else{for (let i = 0;i<=frames;i++) {setTimeout(function(){clearTimeout();obj.style.filter = "blur(" + String((frames-i)*depth/frames) + "px) ";},i*speed)}} 
}
function Fading(obj,speed,frames,f){
        if (f){for (let i = 0;i<=frames;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String(i/frames);},i*speed)}}
        else{for (let i = 0;i<=frames;i++) {setTimeout(function(){clearTimeout();obj.style.opacity = String((frames-i)/frames);},i*speed)}} 
}
//info is from href.js
function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1>'+ infoname[j] +'</h1><section>');
                for(let i =0; i<info[j].length;i++){
                        document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="首頁資料/logo/'+ info[j][i][2] +'"></a></div>')}   
                document.write('</section></article>');
        }
};
function starting() {
        myvid=document.getElementById('myvid')
        if (document.getElementsByTagName("body")[0].getBoundingClientRect().top < 0-screen.height/5) {
                if(blurflag==2){
                        blurflag=1;
                        setTimeout(function(){blurflag=0;},300)
                        Bluring(myvid, 60, 5, 10, 1);
                }
        }
        else if(blurflag==0){
                blurflag=1;
                setTimeout(function(){blurflag=2;},300)
                Bluring(myvid, 60, 5, 10, 0);
        } 
}
function display() {
        var articles = document.getElementsByTagName('article');
        for(i = 0;i<articles.length;i++){
                articles[i].getElementsByTagName('h1')[0].addEventListener('click',function()
        {
                let mysection = this.parentNode.getElementsByTagName('section')[0]
                let myflag = (mysection.style.display != 'block')
                if (myflag == 1) {
                        setTimeout(function () { mysection.style.setProperty('display', 'block', 'important'); }, 1)
                        Fading(mysection, 5,100, myflag);}
                else if (mysection.style.opacity == '1') {
                        setTimeout(function () { mysection.style.setProperty('display', 'none', 'important'); }, 800)
                        Fading(mysection, 5,100, myflag);}
        },false)}            
}
