userOpt = 0
level = 0
story = ["一隻飢餓的狐狸看見葡萄架上掛著一串串晶瑩剔透的粉色葡萄，垂涎三尺，想要摘下來吃，但憑牠的四肢都無法摘到，請幫牠尋找可以輔助牠的工具，請選擇："
        ,"正當狐狸要把葡萄吃掉的時候，葡萄突然被腳步迅速兔子搶走了，這時火冒三丈的狐狸應該怎麼做呢？"
        ,"喊出咒語吧！"
        ,"經過一番波折，狐狸終於能安心的吃下那串奇妙的葡萄了一口接著一口，狐狸能感受到，有一股莫名的力量正在湧入牠的身體，牠的肌肉變得更加結實，身軀龐大，牠活成了動物們所畏懼的形象，大家看到牠都落荒而逃， 連牠的白狐女朋友都離牠遠去，這時候有個老奶奶要過馬路，請問牠要做出什麼行為呢？"
        ,"今晚狐狸要為牠的女友舉辦一場生日派對，請問牠要準備什麼樣的禮物才能討白狐小姐的歡心呢？"
        ,"不久之後他們便決定步入婚姻，他們一般新婚夫妻一樣，會一起煮飯、一起捕獵，互相打鬧、扶持，但花朵也有他的花期，數年後他們的婚姻也伴隨著一場吵架而分離， 白狐說：「我當初真的是瞎了眼才跟你結婚，我沒有你也可以過得很瀟灑，大不了就離婚啊」狐狸說：「事情到此地步，我們之間就沒有什麼好說的，到此為止吧。」請問狐狸要試著去挽回這段已經破碎的婚姻嗎？"
        ,"離婚後他們終於可以做回自己，一個人的世界同樣有月升月落，也有美麗的瞬間，把它歸為記憶。白狐沒了婚約的束縛終於迎來了自由，狐狸也變回了不再因感情而困擾的朝氣狐狸，一個人也可以過得很好，螢幕前的你也不要再為感情所困了，先愛自己在試著去愛他人，完結灑花。"]

var index  = 0
var lock = false
function getUserOpt(num){
    // console.log(level,num)
    userOpt = num
    setText(level,num)
}

function fadeIn(){
    var bt1 = document.getElementById('bt1');
    var bt2 = document.getElementById('bt2');
    var bt3 = document.getElementById('bt3');
    if(bt1.style.opacity != 0){
        return
    }
    for(let i = 0;i<=100;i++){
        setTimeout(()=>bt1.style.opacity = i/100,i*10)
        setTimeout(()=>bt2.style.opacity = i/100,i*10)
        setTimeout(()=>bt3.style.opacity = i/100,i*10)
    }
}
function fadeOut(){
    var bt1 = document.getElementById('bt1');
    var bt2 = document.getElementById('bt2');
    var bt3 = document.getElementById('bt3');
    for(let i = 0;i<=100;i++){
        setTimeout(()=>bt1.style.opacity = (100-i)/100,i*10)
        setTimeout(()=>bt2.style.opacity = (100-i)/100,i*10)
        setTimeout(()=>bt3.style.opacity = (100-i)/100,i*10)
    }
}

function cover(){
    var cover = document.getElementById('cover')
    if(cover.style.opacity!=0){
        return
    }
    for(let i = 0;i<=100;i++){
        setTimeout(()=>{cover.style.opacity = (100-i)/100;if(i==100){cover.style.visibility="hidden"}},i*10)
        
    }
}

function nowLevel(wait){
    var mytext = document.getElementById('text');
    var bt1 = document.getElementById('bt1');
    var bt2 = document.getElementById('bt2');
    var bt3 = document.getElementById('bt3');
    var h1 = document.getElementById('h1')
    mywords = ""

    index = 0
    lock = true
    function writing(index) {

        if (index < story[level].length) {
            mytext.innerHTML += story[level][index]
            setTimeout(writing.bind(this) ,60, ++index)
        }
        else{
            lock = false
        }
    }
    setTimeout(()=>{mytext.innerHTML = '';writing(index,wait);},wait)
    if(level==story.length-1){
        return
    }
    setTimeout(()=>{
    fadeIn()
    switch(level){
        case 0:
            bt1.innerHTML = "納西妲的元素戰技（遠距離取素材）"
            bt2.innerHTML = "樹枝"
            bt3.innerHTML = "長相奇特的魔杖"
            break;
        case 1:
            bt1.innerHTML = "拿魔杖戳牠"
            bt2.innerHTML = "拿魔杖丟牠"
            bt3.innerHTML = "拿魔杖使出技能"
            break;
        case 2:
            bt1.innerHTML = "原神啟動（口嗨別選）"
            bt2.innerHTML = "avada kedavra(讓人事物被摧毀)"
            bt3.innerHTML = "領域展開（用沙士幫兔子洗頭）"
            break;
        case 3:
            bt1.innerHTML = "扶老奶奶過馬路"
            bt2.innerHTML = "跟牠索取錢財"
            bt3.innerHTML = "故意在車開過來的時候把牠推倒"
            break;
        case 4:
            bt1.innerHTML = "牠想要很久的香奈兒包包"
            bt2.innerHTML = "狐狸的手寫信"
            bt3.innerHTML = "啥都不給"
            break;
        case 5:
            bt1.innerHTML = "要"
            bt2.innerHTML = "不要"
            bt3.innerHTML = "選我啊笨蛋"
            break;
    }},wait)
    h1.innerHTML = 'Chapter ' + (level+1)
}

function setText(lev, opt){
    let flag = 0
    var mytext = document.getElementById('text')
    if(lock == true ){
        return
    }
    else switch(lev){
        case 0:

            if(opt == 0){mytext.innerHTML = "要玩原神回家玩，這裡不是୧( ಠ Д ಠ )୨"}
            else if(opt == 1){mytext.innerHTML = "樹枝過短，人家鈎不到啦"}
            else{mytext.innerHTML = "牠拿到魔杖之後發現牠可以隨心意改變形狀，於是牠成功獲得一串葡萄！";flag = 1}
            break

        case 1:

            if(opt == 0){mytext.innerHTML = "由於魔杖太脆弱，一戳就斷..."}
            else if(opt == 1){mytext.innerHTML = "由於丟不準，兔子逃走了..."}
            else{mytext.innerHTML ="狐狸將魔杖指向了兔子！"; flag = 1}
            break

        case 2:

            if(opt == 0){mytext.innerHTML = "原神啟動成功，啊然後呢？";}
            else if(opt == 1){mytext.innerHTML = "兔子成功被咒語擊敗！";flag = 1}
            else{mytext.innerHTML = "兔子美味品嚐兩口就蹦蹦跳走了...";}
            break

        case 3:

            if(opt == 0){mytext.innerHTML = "善良的作為被全動物界讚揚，狐狸也重新獲得了大家的喜愛🧡";flag = 1}
            else if(opt == 1){mytext.innerHTML = "君子愛財取之有道啊！"}
            else{mytext.innerHTML = "地獄十九層為你而設"}
            break

        case 4:

            if(opt == 0){mytext.innerHTML = "其實牠已經買過這款了，前幾天才背著那個包包出門，白狐抱怨狐狸根本沒注意牠..."}
            else if(opt == 1){mytext.innerHTML = "白狐看完後感動的落淚，牠們堅信彼此能長長久久的維持感情。";flag = 1}
            else{mytext.innerHTML = "被女友嘎了ᕦ(ò_óˇ)ᕤ"}
            break

        case 5:
    
            if(opt == 0){mytext.innerHTML = "遇到問題的他們倆依舊沒去面對問題的根本，且不斷的忽視彼此的感受，再次複合的婚姻又出現了裂痕..."}
            else if(opt == 1){mytext.innerHTML = "不適合的就不要去迎合，沒有彼此他們自己的生活也可以過得很精彩。";flag = 1}
            else{mytext.innerHTML = "笨蛋"}
            break

    } 

    if(flag==1){
        fadeOut() 
        level++
        nowLevel(3000)
    }else{
        nowLevel(3000)
    }
}