myshuffle = 4
themelist=["#3c3834","#040606","#11140e","#3f2a28"]
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
        myshuffle = (myshuffle+1)%4
        myvid = document.getElementsByTagName('video')
        body = document.getElementsByTagName('body')[0]
        mask = document.getElementsByClassName('mask')[0]
        h1 = document.getElementsByTagName('h1')
        for(i=0;i<4;i++){
            if(i!=myshuffle){
                myvid[i].style.display = "none";h1[i].style.display = "none";
            }else{
                myvid[i].style.display = "block";
                Fading(myvid[i], 5,50, 1);
                h1[i].style.display = "block";
            }    
        }
        if(body.getBoundingClientRect().top==0){
                body.style.backgroundColor = themelist[myshuffle]
                mask.style.background = "linear-gradient(#00000000 77%," + themelist[myshuffle] + "b4 90%," + themelist[myshuffle] + " 100%)"}                   
}
