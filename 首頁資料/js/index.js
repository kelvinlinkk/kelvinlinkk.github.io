function getHeader(){
        window.removeEventListener('scroll',getHeader)
        header = document.getElementsByTagName('header')[0];
        Fading(header, 5,100, 1)
        setTimeout(()=>{header.style.visibility="visible"},1)
}
window.addEventListener('scroll',getHeader,false)

function Fading(obj,speed,frames,f){
        if (f){for (let i = 0;i<=frames;i++) {setTimeout(()=>{clearTimeout();obj.style.opacity = String(i/frames);},i*speed)}}
        else{for (let i = 0;i<=frames;i++) {setTimeout(()=>{clearTimeout();obj.style.opacity = String((frames-i)/frames);},i*speed)}} 
}
//info is from href.js
function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h3>'+ infoname[j] +'</h3><section>');
                for(let i =0; i<info[j].length;i++){
                        document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="首頁資料/logo/'+ info[j][i][2] +'"></a></div>' )}   
                document.write('</section></article>');
        }
};

function displayArticle() {
        var articles = document.getElementsByTagName('article');
        for(i = 0;i<articles.length;i++){
                articles[i].getElementsByTagName('h3')[0].addEventListener('click',function()
        {
                let mysection = this.parentNode.getElementsByTagName('section')[0]
                let myflag = (mysection.style.display != 'block')
                if (myflag == 1) {
                        setTimeout(()=>{ mysection.style.setProperty('display', 'block', 'important'); }, 1)
                        Fading(mysection, 5,100, myflag);}
                else if (mysection.style.opacity == '1') {
                        setTimeout(()=>{ mysection.style.setProperty('display', 'none', 'important'); }, 800)
                        Fading(mysection, 5,100, myflag);}
        },false)}      
}

function displayHeader() {
        var myselect = document.getElementsByClassName('header-select');
        for(i = 0;i<myselect.length;i++){
                myselect[i].addEventListener('click',function()
        {
                let mylist = this.getElementsByClassName('header-list')[0]
                let myflag = (mylist.style.display != 'block')
                if (myflag == 1) {
                        for(j = 0;j<myselect.length;j++){
                                myselect[j].getElementsByClassName('header-list')[0].style.setProperty('display', 'none');
                        }
                        setTimeout(()=>{ mylist.style.setProperty('display', 'block', 'important'); }, 1)
                        Fading(mylist, 5,100, myflag);}
                else if (mylist.style.opacity == '1') {
                        setTimeout(()=>{ mylist.style.setProperty('display', 'none', 'important'); }, 800)
                        Fading(mylist, 5,100, myflag);}
        },false)}      
}