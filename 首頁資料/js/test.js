ballx=[30,60,90,120]
bally=[0,0,0,0]
ballr=[20,20,20,20]
function setPos(obj,x,y,r){
    obj.style.width=String(r) + 'px'
    obj.style.height=String(r) + 'px'
    obj.style.top = 'calc(50vh + ' + String(0 - y - r/2) + 'px)'
    obj.style.left = String(screen.width/2 + x - r/2) + 'px'
}
for(let i=1;i<=4;i++){
    setInterval(()=>{setPos(document.getElementById('ball'+String(i)), ballx[i-1],bally[i-1],ballr[i-1])},1)
}
function rotate(num,degree){
    let x = ballx[num-1]
    let y = bally[num-1]
    ballx[num-1] = x*Math.cos(degree) - y*Math.sin(degree);
    bally[num-1] = x*Math.sin(degree) + y*Math.cos(degree);
}
function move(num,x,y){
    ballx[num-1] += x;
    bally[num-1] += y;
}
setInterval(()=>{rotate(4,-0.05)},0)