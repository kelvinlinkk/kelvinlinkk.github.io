addEventListener('scroll',starting,false)
shufflingId = setInterval(shuffling,5000)
myshuffle = 2
shuffling()
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
        myvid[2]=document.getElementsByClassName('welcome')
        for(i=0;i<3;i++){
        if (document.getElementsByTagName("body")[0].getBoundingClientRect().top < 0-screen.height/5) {
                myvid[i].style.filter="blur(5px)";clearInterval(shufflingId)}
        else{myvid[i].style.filter="blur(0px)";} }
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

function shuffling() {
        myshuffle +=1
        myshuffle = myshuffle%4
        myvid = document.getElementsByTagName('video')
        h1 = document.getElementsByTagName('h1')
        for(i=0;i<4;i++){
            if(i!=myshuffle){
                myvid[i].style.visibility = "hidden";
                h1[i].style.display = "none";
            }else{
                myvid[i].style.visibility = "visible";
                h1[i].style.display = "block";
            }    
        }
                    
}
