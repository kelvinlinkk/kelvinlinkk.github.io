/*setup*/
ballx=[30,60,90,120]
bally=[0,0,0,0]
ballr=[20,20,20,20]
function setPos(obj,x,y,r){
    obj.style.width=String(r) + 'px'
    obj.style.height=String(r) + 'px'
    obj.style.top = String(window.innerHeight/2 - y - r/2) + 'px'
    obj.style.left = String(window.innerWidth/2 + x - r/2) + 'px'
}
for(let i=1;i<=4;i++){
    setInterval(()=>{setPos(document.getElementById('ball'+String(i)), ballx[i-1],bally[i-1],ballr[i-1])},0)
}
document.getElementById('angle').defaultValue=30

/*action*/
function rotate(num,a){
    myangle = a/180*Math.PI
    let x = ballx[num-1]
    let y = bally[num-1]
    ballx[num-1] = x*Math.cos(myangle) - y*Math.sin(myangle);
    bally[num-1] = x*Math.sin(myangle) + y*Math.cos(myangle);
}
function move(num,x,y){
    ballx[num-1] += x;
    bally[num-1] += y;
}
function toPolar(x,y){
    return [(x**2+y**2)**0.5,Math.atan2(y,x)]
}

/*ball1*/
vx=0
vy=2
function thinkingname(){
    [dis,ang]=toPolar(ballx[0],bally[0])
    a = -120/dis/dis
    ax=a*Math.cos(ang)
    ay=a*Math.sin(ang)
    vx+=ax;vy+=ay
    move(1,vx,vy)
}
setInterval(thinkingname,10)

/*ball2*/
velx=0
vely=4
function thinkname(){
    [mydis,myang]=toPolar(ballx[1],bally[1])
    accer = -600/mydis/mydis
    accerx=accer*Math.cos(myang)
    accery=accer*Math.sin(myang)
    velx+=accerx;vely+=accery
    move(2,velx,vely)
}
setInterval(thinkname,1)

/*ball3*/
acceleration = -1000
speed = 500
setInterval(()=>{move(3,1,speed/100);speed+=acceleration*0.01},10)

/*ball4*/
angle=30
setInterval(()=>{rotate(4,angle/200);},5)
document.getElementById('angle').addEventListener('change',(e)=>{angle=e.target.value},false)