const flag = []
const flag2 = []
window.onload = function(){
    for(let i = 0; i < document.getElementsByTagName("article").length; i++){
        addEventListener('scroll', function(){track(i)}, false);
        flag.push(false);
        flag2.push(false);
    }
    track(0);
}
function track(n){
    var tar = document.getElementsByTagName("article")[n];
    var h1 = tar.getElementsByTagName('h1')[0];
    var lyrics = tar.getElementsByTagName('p')[0];
    var mypic = tar.getElementsByTagName('img')[0];
    tarTop = lyrics.getBoundingClientRect().top;
    contentTop = h1.getBoundingClientRect().top;
    tarBot = tar.getBoundingClientRect().bottom;
    console.log(flag2 + ' ' + tarBot + ' ' + contentTop + ' ' + screen.height);
    //LYRICS
    if(tarTop > screen.height || tarBot < 0){
        lyrics.style.opacity = "0";
        flag[n] = false;
    }else if(flag[n] == false){
        fade(lyrics,3);
        flag[n] = true;
    }
    //H1
    if(tarBot < 0 || contentTop > screen.height -200){
        mypic.style.opacity = '0';
        h1.style.left = '-10%';
        flag2[n] = false;
    }
    else if(tarBot >= 0 && flag2[n] == false){
        move(h1);
        fade(mypic,2);
        flag2[n] = true;
    }     
}

function move(tar){
    for (let i = 0;i<1000;i++){
        setTimeout(
            function(){
                clearTimeout(tar);tar.style.left = String((i-2000)/200) + '%';
            },i*1.5)
    }
}
function fade(tar, speed){
    for (let i = 0;i<1000;i++){
        setTimeout(
            function(){
                clearTimeout();tar.style.opacity = i/1000;
            },i*speed)
    }
}