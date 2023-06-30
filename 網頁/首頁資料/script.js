var countdown = function(date_string) {
var now = new Date();
var end = new Date(date_string);
var t = end.getTime() - now.getTime();
var s = Math.round(t/1000);
var m = Math.round(s / 60);
s = Math.round(s % 60);
var h = Math.round(m / 60);
m = Math.round(m % 60);
var d = Math.round((h - 12) / 24 + 1);
h = Math.round(h % 24);       
document.getElementById("days").innerHTML = d;
document.getElementById("hours").innerHTML = (h < 10) ? "0" + h : h;
document.getElementById("minutes").innerHTML = (m < 10) ? "0" + m : m;
document.getElementById("seconds").innerHTML = (s < 10) ? "0" + s : s;
document.getElementById("end").innerHTML = end.toString().split(' ').splice(1, 4).join(' ');
}
        
window.onload = function() {
countdown("07/31/2023");
setInterval(countdown, 1000, "07/31/2023");
}