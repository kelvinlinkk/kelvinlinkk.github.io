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
    var h2 = tar.getElementsByTagName('h2')[0];
    var lyrics = tar.getElementsByTagName('p')[0];
    var mypic = tar.getElementsByTagName('img')[0];
    tarTop = tar.getBoundingClientRect().top;
    tarBot = tar.getBoundingClientRect().bottom;
    console.log(flag2 + ' ' + tarBot + ' ' + screen.height);
    //LYRICS
    if(tarTop > screen.height || tarBot < 0){
        h2.style.left = '-5%'
        flag[n] = false;
    }else if(flag[n] == false){
        move(h2);
        flag[n] = true;
    }
}

function move(tar){
    for (let i = 0;i<1000;i++){
        setTimeout(
            function(){
                clearTimeout(tar);tar.style.left = String((i-1000)/200) + '%';
            },i*0.5)
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