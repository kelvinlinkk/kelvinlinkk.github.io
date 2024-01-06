const imgs = document.getElementsByClassName('img')
const preview = document.getElementById('preview')
var pos = []
var displayPic = 0
const imgName = ["首頁資料/pic/secondtonone.JPG","首頁資料/pic/DNA.jpg","首頁資料/pic/journey.jpg","首頁資料/pic/choice.png"]

function setPos(obj, num){
    obj.style.left = pos[num] + 'vw'
}

function initImg(){
    for(let i in imgName){
        let img = document.createElement('img')
        img.src = imgName[i]
        img.className = 'img'
        preview.appendChild(img)
        pos.push(30)
        setPos(img,i)
    }
}

function moveImg(){
    if(displayPic==imgName.length-1){
        return
    }
    displayPic+=1
    for(let i in imgs){
        for(let j = 0;j<81;j++){
            setTimeout(()=>{
                let img = imgs[i]
                pos[i]-=0.5
                setPos(img,i)
            },j**2/49)
        }
    }
}

window.onload=function(){
    initImg()
}

window.addEventListener('mousedown',moveImg)