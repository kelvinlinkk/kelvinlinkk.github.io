userOpt = 0
level = 0
story = ["一隻飢餓的狐狸看見葡萄架上掛著一串串晶瑩剔透的粉色葡萄，垂涎三尺，想要摘下來吃，但憑他的四肢都無法摘到，於是他去尋找有甚麼工具可以輔助牠。"
        ,"正當狐狸要把葡萄吃掉的時候，葡萄突然被腳步迅速兔子搶走了，這時火冒三丈的狐狸應該怎麼做呢？"
        ,"喊出咒語"
        ,"經過一番波折，狐狸終於能安心的吃下那串奇妙的葡萄了一口接著一口，狐狸能趕受到，有一股莫名的力量正在湧入他的身體，他的肌肉變得更加結實，身軀龐大，它活成了動物們所畏懼的形象，大家看到它都落荒而逃， 連他的白狐女朋友都離它遠去，這時候有個老奶奶要過馬路，請問他要做出什麼行為呢？"
        ,"今晚狐狸要為他的女友舉辦一場生日派對，請問它要準備什麼樣的禮物才能討白狐小姐的歡心呢？"
        ,"故事結束~~"]

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
    setTimeout(()=>{mytext.innerHTML = "";writing(index,wait);},wait)
    if(level==5){
        return
    }
    setTimeout(()=>{
    fadeIn()
    if(level==0){
        bt1.innerHTML = "納西妲的元素戰技"
        bt2.innerHTML = "樹枝"
        bt3.innerHTML = "長相奇特的魔杖"
    }else if(level==1){
        bt1.innerHTML = "拿魔杖戳牠"
        bt2.innerHTML = "拿魔杖丟牠"
        bt3.innerHTML = "拿魔杖使出技能"
    }else if(level==2){
        bt1.innerHTML = "原神啟動（口嗨別選）"
        bt2.innerHTML = "avada kedavra(讓人事物被摧毀)"
        bt3.innerHTML = "領域展開（用沙士幫兔子洗頭）"
    }else if(level==3){
        bt1.innerHTML = "扶老奶奶過馬路"
        bt2.innerHTML = "跟她索取錢財"
        bt3.innerHTML = "故意在車開過來的時候把她推倒"
    }else if(level==4){
        bt1.innerHTML = "她想要很久的香奈兒包包"
        bt2.innerHTML = "狐狸的手寫信"
        bt3.innerHTML = "啥都不給"
    }},wait)
    h1.innerHTML = 'Chapter ' + (level+1)
}

function setText(lev, opt){
    let flag = 0
    var mytext = document.getElementById('text')
    if(lock == true ){
        return
    }
    else if(lev==0){

        if(opt == 0){mytext.innerHTML = "要玩原神回家玩，這裡不是୧( ಠ Д ಠ )୨"}
        else if(opt == 1){mytext.innerHTML = "樹枝過短鈎不到"}
        else{mytext.innerHTML = "牠拿到魔杖之後發現牠可以隨心意改變形狀，於是牠成功獲得一串葡萄";window.alert("獲得道具：葡萄ｘ１");flag = 1}

    }else if(lev==1){

        if(opt == 0){mytext.innerHTML = "由於魔杖太脆弱，一戳就斷"}
        else if(opt == 1){mytext.innerHTML = "由於丟不準，兔子逃走了"}
        else{mytext.innerHTML ="將魔杖指向兔子"; flag = 1}

    }else if(lev==2){

        if(opt == 0){mytext.innerHTML = "原神啟動成功";flag = 1}
        else if(opt == 1){mytext.innerHTML = "兔子成功被咒語擊敗";flag = 1}
        else{mytext.innerHTML = "兔子美味品嚐兩口就蹦蹦跳走了";flag = 1}

    }else if(lev==3){

        if(opt == 0){mytext.innerHTML = "善良的作為被全動物界讚揚，狐狸也重新獲得了大家的喜愛"}
        else if(opt == 1){mytext.innerHTML = "君子愛財取之有道"}
        else{mytext.innerHTML = "你覺得合理嗎：）？";flag = 1}

    }else if(lev==4){

        if(opt == 0){mytext.innerHTML = "其實她已經買過這款了，前幾天才背著那個包包出門，白狐抱怨狐狸根本沒注意她"}
        else if(opt == 1){mytext.innerHTML = "白狐看完後感動的落淚，它們堅信彼此能長長久久的維持感情。";flag = 1}
        else{mytext.innerHTML = "被女友嘎了ᕦ(ò_óˇ)ᕤ"}

    } 

    if(flag==1){
        fadeOut() 
        level++
        nowLevel(3000)
    }else{
        nowLevel(3000)
    }
}