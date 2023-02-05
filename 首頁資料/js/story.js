//Thanks to https://gist.github.com/AndyG1128/893207
var countdown = function(date_string) {
    var now = new Date();
    var end = new Date(date_string);
 
    var t = end.getTime() - now.getTime();
    var s = Math.round(t/1000);
 
    var m = Math.round(s / 60);
    s = Math.round(s % 60);
 
    var h = Math.round(m / 60);
    m = Math.round(m % 60);
 
    var d = Math.round((h - 12) / 24);
    h = Math.round(h % 24);
 
    document.getElementById("days").innerHTML = d;
    document.getElementById("hours").innerHTML = (h < 10) ? "0" + h : h;
    document.getElementById("minutes").innerHTML = (m < 10) ? "0" + m : m;
    document.getElementById("seconds").innerHTML = (s < 10) ? "0" + s : s;
    document.getElementById("end").innerHTML = end.toString().split(' ').splice(1, 4).join(' ');
}
var setdate = function(date_string){
    window.onload = function(){
        countdown(date_string);
        setInterval(countdown, 1000, date_string);
    }
}