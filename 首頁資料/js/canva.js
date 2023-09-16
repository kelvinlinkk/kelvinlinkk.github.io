var canvas=document.getElementsByTagName('canvas')[0]
var ctx = canvas.getContext("2d");
ctx.fillStyle="rgb(200,0,0)"
ctx.fillRect(0,20,30,40) //x y w h
ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(45, 45, 60, 60);
ctx.strokeRect(50, 50, 50, 50);
ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
