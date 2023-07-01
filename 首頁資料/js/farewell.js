addEventListener('scroll', track, false);
flag = false;
window.onload = track
function track(){
    var tar = document.getElementById("tt");
    var h1 = tar.getElementsByTagName('h1')[0];
    var lyrics = tar.getElementsByTagName('p')[0];
    toppos = tar.getBoundingClientRect().top
    console.log(flag + ' ' + toppos);
    if(toppos > 0 || toppos < screen.height * (-1) + 50){
        lyrics.style.color = "#d9d0c0"
        flag = false;
    }else if(toppos <= 0 && flag == false){
        fade(lyrics);
        move(h1);
        flag = true;
    }     
}

function move(tar){
    for (let i = 0;i<1000;i++){
        setTimeout(
            function(){
                clearTimeout();tar.style.left = String((i-2000)/200) + '%';
            },i)
    }
}
function fade(tar){
    for (let i = 0;i<1000;i++){
        setTimeout(
            function(){
                clearTimeout();tar.style.opacity = i/1000;
            },i*2)
    }
}