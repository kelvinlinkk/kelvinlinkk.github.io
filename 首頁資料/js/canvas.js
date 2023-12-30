function draw(){
    const canvas = document.getElementById('mycanva')
    if(canvas.getContext){
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(50,100,50,100) //x,y,w,h
        ctx.strokeRect(50,100,100,50) //x,y,w,h
        ctx.clearRect(60, 110, 20, 30);//x,y,w,h
        ctx.strokeStyle="rgb(0,200,0)";
        ctx.beginPath();
        ctx.moveTo(50,50);
        ctx.lineTo(500, 200);
        ctx.closePath();//不一定要 有了會自動封閉
        ctx.stroke() //描邊
        ctx.fillStyle = "rgb(0,0,200)";
        ctx.beginPath();
        ctx.moveTo(50,50);
        ctx.lineWidth='10';
        ctx.lineTo(200, 200);ctx.lineTo(50, 200);ctx.lineTo(40, 50);
        ctx.closePath();
        ctx.fill(); //填滿區域
        ctx.beginPath();
        ctx.arc(200,200,100,0,Math.PI/2,false)//arc(x, y, r, startAngle, endAngle, anticlockwise)
        ctx.stroke(); 
        ctx.beginPath();
        ctx.moveTo(50, 50); //important
        ctx.arcTo(200, 50, 200, 200, 100); //arcTo(x1, y1, x2, y2, radius)
        ctx.stroke();

        var lineCaps = ["butt", "round", "square"];
 
        for (var i = 0; i < 3; i++){
            ctx.beginPath();
            ctx.moveTo(20 + 30 * i, 30);
            ctx.lineTo(20 + 30 * i, 100);
            ctx.lineWidth = 20;
            ctx.lineCap = lineCaps[i]; //["butt", "round", "square"] 方形(不超過)、圓形、方形(超過)
            ctx.stroke();
        }
        
        ctx.beginPath();ctx.moveTo(0, 30);ctx.lineTo(300, 30);ctx.moveTo(0, 100);ctx.lineTo(300, 100);ctx.strokeStyle = "red";ctx.lineWidth = 1;ctx.stroke();
        var lineJoin = ['round', 'bevel', 'miter'];
        ctx.lineWidth = 20;
    
        for (var i = 0; i < lineJoin.length; i++){
            ctx.lineJoin = lineJoin[i]; //['round', 'bevel', 'miter'] 圓形、削平、尖頭
            ctx.beginPath();
            ctx.moveTo(50, 50 + i * 50);
            ctx.lineTo(100, 100 + i * 50);
            ctx.lineTo(150, 50 + i * 50);
            ctx.lineTo(200, 100 + i * 50);
            ctx.lineTo(250, 50 + i * 50);
            ctx.stroke();
        }

        ctx.lineWidth = 1;
        ctx.setLineDash([20, 5]);  // [實線, 空隙]
        ctx.lineDashOffset = 1; //經過幾像素開始有實線
        ctx.strokeRect(50, 50, 210, 210);

        ctx.font = "100px sans-serif"
        ctx.fillText("領域展開", 10, 100);//fillText(text, x, y [, maxWidth])
        ctx.strokeText("無量空處", 10, 200)
        //font : 10px sans-serif
        //textAlign : start, end, left, right or center
        //textBaseline : top, hanging, middle, alphabetic, ideographic, bottom
        //direction : ltr, rtl, inherit

        var img = new Image();   // 创建img元素
        img.onload = function(){
        ctx.drawImage(img, 0, 0,600,600,300,300,100,100)//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }
        img.src = '首頁資料/background/background0.jpg'; // 设置图片源地址
        //ctx.save() 保存translate、旋轉、裁切strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation
        //ctx.restore() 復原設定
        //ctx.translate(x, y)、ctx.rotate(angle) 改變坐標軸位移角度(需要先save才能restore調回原坐標系，不然會一直疊加)
        //ctx.scale(x, y)
        
        ctx.translate(100, 100);
        var sin = Math.sin(Math.PI / 6);
        var cos = Math.cos(Math.PI / 6);
        for (var i = 0; i <= 12; i++) {
            c = Math.floor((255 / 12) * i);
            ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
            ctx.fillRect(0, 0, 100, 10);
            ctx.transform(cos, sin, -sin, cos, 0, 0);//ctx.transform(a, b, c, d, e, f)變形矩陣(水平變形、水平傾斜、垂直變形、垂直傾斜、水平位移、垂直位移)
        }

        //ctx.globalCompositeOperation 重疊處理(13種)
        //ctx.clip() 之後化的東西會再剪取區裡面
        ctx.beginPath();
        ctx.arc(20,20, 100, 0, Math.PI * 2);
        ctx.clip();
    
        ctx.fillStyle = "pink";
        ctx.fillRect(20, 20, 100,100);
    }else{
        return
    }
    
}
draw()