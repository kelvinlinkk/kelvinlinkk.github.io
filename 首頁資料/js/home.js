//Thanks to https://gist.github.com/AndyG1128/893207
var flag = false;
var mouse = "";
var infoname = ["工具","報告","程式","學習","高中","Google","Microsoft","升學","AI","運動","社交"]
var info = [
        /*工具*/
        [["https://www.ilovepdf.com/zh-tw","ilovepdf","ilovepdf.png"],
        ["https://www.overleaf.com/","overleaf","overleaf.svg"],
        ["https://ezcv.tw/","EZ學習歷程","ez.png"],
        ["https://www.canva.com/zh_tw/","canva","canva.svg"],
        ["https://www.flaticon.com/","flaticon","flaticon.jpg"],
        ["https://www.magicpattern.design/tools/blob-generator","blob","magicpattern.jpg"],
        ["https://www.openpeeps.com/","open peeps","openpeeps.png"],
        ["https://unsplash.com/","unsplash","unsplash.svg"],
        ["https://thepopp.com/templates/scheat/","Power of PPT","popp.svg"],
        ["https://slidesgo.com/","slidesgo","slidesgo.svg"],
        ["https://www.slidor.fr/en/selfone","selfone","slidor.png"],
        ["https://whimsical.com","whimsical","whimsical.svg"],
        ["https://xmind.app/","xmind","xmind.svg"],
        ["https://www.notion.so/zh-tw","notion","notion.svg"],
        ["https://elements.envato.com/","envato","envato.svg"], 
        ["https://fonts.google.com/","google fonts","googlefonts.png"],
        ["https://reurl.cc","reurl","reurl.png"],
        ["https://illustimage.com","illustimage","illustimage.png"],
        ["https://www.fontspace.com/","fontspace","fontspace.jpg"],
        ["https://free.com.tw/","free sources","free.jpg"],
        ["https://pixelfika.com","Pixelfika","pixelfika.png"],
        ["https://photock.org","photock","photock.png"],
        ["https://undraw.co/illustrations","undraw","undraw.png"],
        ["https://app.haikei.app/","Haikei","haikei.png"],
        ["http://dig.ccmixter.org/","dig.ccMixter","digccMixter.png"],
        ["https://eword.ntpc.edu.tw/","生字簿","字.png"],
        ["https://vectorwiki.com","vectorwiki","vectorwiki.png"]],
        /*科學 */
        [["https://www.shs.edu.tw/","中學生網站","中學生.png"],
        ["https://ndltd.ncl.edu.tw/","博碩網","博碩網.jpg"],
        ["https://twsf.ntsec.gov.tw/","科教館","科教館.png"],
        ["https://twpat3.tipo.gov.tw/","專利檢索","IPO.png"],
        ["http://www.ieyiun.org/","IEYI","ieyi.png"],
        ["https://www.mxeduc.org.tw/scienceaward/","旺宏科學獎","旺宏.jfif"]],
        /*程式*/
        [["https://www.w3schools.com/","w3schools","w3logo.png"],
        ["https://www.codecademy.com/","codecademy","codecademy.svg"],
        ["https://www.edx.org/","edx","edx.png"],
        ["https://www.khanacademy.org/","khanacademy","khan.svg"],
        ["https://www.udacity.com/","udacity","udacity.svg"],
        ["https://dash.generalassemb.ly/","dash","dash.png"],
        ["https://www.learneroo.com/","learneroo","learneroo.jpg"],
        ["https://bento.io/","banto.io","bento.svg"],
        ["https://www.freecodecamp.org/","freecodecamp","freecodecamp.svg"],
        ["https://leetcode.com/","leetcode","leetcode.png"],
        ["http://github.com","github","github.png"],
        ["https://www.oxxostudio.tw/","oxxostudio","oxxo.png"],
        ["https://stackoverflow.com/","stack overflow","stackoverflow.jpg"]],
        /*學習*/
        [["https://tw.voicetube.com/","voicetube","voicetube.svg"],
        ["https://www.bbc.co.uk/learningenglish/","BBCEng","bbc.png"],
        ["https://www.youtube.com/user/crashcourse","Crash Course","crashcourse.png"],
        ["https://www.youtube.com/c/TED","TED","ted.svg"],
        ["https://quizlet.com/zh-tw","Quizlet","quizlet.svg"],
        ["https://open.spotify.com/collection/podcasts","podcasts","spotify.svg"],
        ["https://www.geogebra.org/u/kkbestlin","geogebra","geogebra.png"],
        ["https://www.coolenglish.edu.tw/","cool english","coolenglish.png"],
        ["https://www.etymonline.com/","etymonline ","etymonline.jpg"],
        ["https://www.junyiacademy.org/","均一","均一.svg"],
        ["http://www.baysidepremier.com/","SAT","sat.png"],
        ["https://dict.revised.moe.edu.tw/","教育部辭典","dict.svg"],
        ["https://dictionary.cambridge.org/","劍橋辭典","cambridge.png"],
        ["https://www.twreporter.org/","報導者","thereporter.svg"],
        ["https://www.peopo.org/","PEOPO","peopo.jpg"],
        ["https://www.goodreads.com/quotes","Quotes","goodreads.jpg"],
        ["https://www.snexplores.org/","SNExplores","sn.svg"],
        ["https://www.science.org/","AAAS","aaas.svg"],
        ["https://www.merriam-webster.com/","韋氏字典","webster.jpg"],
        ["https://www.theguardian.com/science","Guardian","guardian.svg"],
        ["https://lawplayer.com/","lawplayer","lawplayer.jpg"],
        ["https://highscope.ch.ntu.edu.tw/","科學online","online.jpg"],
        ["https://pansci.asia/","泛科學","pansci.jpg"]],
        /*學校*/
        [["http://www.ytjh.ylc.edu.tw/","揚子高中","yths.png"],
        ["https://www.ewant.org/","ewant","ewant.jpg"],
        ["https://epf.mlife.org.tw/Portal.do","學習歷程上傳","學習歷程.png"],
        ["http://ocw.aca.ntu.edu.tw/ntu-ocw/","台大開放式課程","台大.svg"],
        ["https://students.tw/","高中生資訊網","student.jpg"]],
        /*google*/
        [["https://www.google.com/","search","googlesearch.png"],
        ["https://mail.google.com/","gmail","gmail.png"],
        ["https://translate.google.com/","translate","translate.png"],
        ["https://drive.google.com/","drive","drive.png"],
        ["https://keep.google.com/","keep","keep.png"],
        ["https://classroom.google.com/","classroom","classroom.png"],
        ["https://chrome.google.com/webstore/","web store","webstore.svg"],
        ["https://photos.google.com/","photo","photo.svg"],
        ["https://www.google.com/maps/","map","map.png"],
        ["https://meet.google.com/","meet","meet.png"], 
        ["https://docs.google.com/drawings/","drawings","drawing.png"], 
        ["https://www.kaggle.com/","kaggle","kaggle.svg"],    
        ["https://podcasts.google.com/","podcast","podcast.png"]],
        /*microsoft*/ 
        [["https://to-do.live.com/tasks/","to-do","todo.svg"],  
        ["https://www.bing.com/","bing","bing.jpg"],      
        ["https://o365oid-my.sharepoint.com/","onedrive","onedrive.png"],           
        ["https://outlook.office365.com/","outlook","outlook.png"],   
        ["https://www.office.com/launch/word","word","word.png"],  
        ["https://www.office.com/launch/excel","excel","excel.png"],   
        ["https://www.office.com/launch/powerpoint","powerpoint","powerpoint.png"],   
        ["https://www.office.com/","office","office.png"]],
        /*升學*/
        [["https://collego.edu.tw/","collego","collego.svg"],
        ["https://ioh.tw/","IOH","ioh.jpg"],
        ["https://www.unews.com.tw/","大學問","大學問.jpg"],
        ["https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/index.php","大學招生委員會","college.jpg"],
        ["https://career.cloud.ncnu.edu.tw/","學生生涯輔導網","career.png"],
        ["https://srecruit.moe.edu.tw/","特殊選才","特殊選才.jpg"],
        ["https://www.ceec.edu.tw/","大考中心","大考中心.jpg"],
        ["https://nsdua.moe.edu.tw/","多元入學","多元入學.jpg"],
        ["https://university.1111.com.tw/index.asp","1111大學網","1111大學網.jpg"],
        ["https://www.104.com.tw/jb/career/","104求職網","104.svg"]],
        /*AI*/ 
        [["https://chat.openai.com","chatGPT","chatgpt.jpg"],
        ["https://creator.nightcafe.studio/","nightcafe","nightcafe.jpg"],
        ["https://hotpot.ai/","hotpot","hotpot.jpg"],
        ["https://leonardo.ai/","Leonardo","leonardo.png"],
        ["https://www.naturalreaders.com/","Natural Readers","nr.svg"],
        ["http://127.0.0.1:7860/","Stable Diffusion","sd.svg"],
        ["https://designer.microsoft.com","msdesigner","msdesigner.jpg"],
        ["https://tome.app/","tome","tome.jpg"],
        ["https://scribblediffusion.com/","scribblediffusion","scribblediffusion.jpg"]],
        /*賽車 */
        [["https://www.formula1.com/","f1","f1.svg"],
        ["https://www.motogp.com/","motogp","motogp.png"],
        ["https://www.motorsport.com/","motorsport","motorsport.jpg"],
        ["https://www.autosport.com/","autosport","autosport.jpg"],
        ["https://www.sportsv.net/racing","運動視界","運動視界.jpg"]],
        /*社交*/
        [["https://www.youtube.com/","YouTube","YouTube.svg"],
        ["https://www.messenger.com/","messenger","messenger.svg"],
        ["https://www.instagram.com/","instagram","ig.jpg"],
        ["https://www.facebook.com/","Facebook","facebook.svg"],
        ["https://twitter.com/","twitter","twitter.svg"],
        ["https://www.twitch.tv/","twitch","twitch.svg"],
        ["https://discord.com/app","discord","discord.svg"],
        ["https://www.tiktok.com/","tiktok","tiktok.jpg"]]
        ]

function drawLogo(){
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1>'+ infoname[j] +'</h1><section>');
                for(let i =0; i<info[j].length;i++){document.write('<div class="infos"><a href="' + info[j][i][0] +'"><span>'+ info[j][i][1] + '</span><img src="https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/'+ info[j][i][2] +'" onmouseenter="inMouse(\''+ info[j][i][1] +'\')"></a></div>')}   
                document.write('</section></article>');
        }
        
};
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
};
var setdate = function(date_string){
    window.onload = function(){
        countdown(date_string);
        setInterval(countdown, 1000, date_string);
    }
};

function display(){ 
        var search = document.getElementById("search");
        var time = document.getElementById("time");
        var countdown = document.getElementById("countdown");
        if(flag){flag = !flag;
                for (let i = 0;i<100;i++) {
                        setTimeout(function(){
                        search.style.opacity = String(i/100);
                        time.style.opacity = String(i/100);
                        countdown.style.opacity = String(i/100);},10*i)
                }
        }     
        else{flag = !flag;
                for (let i = 100;i>0;i--) {
                        setTimeout(function(){
                        search.style.opacity = String(i/100);
                        time.style.opacity = String(i/100);
                        countdown.style.opacity = String(i/100);},10*(100-i))
                }
        }
                
        
}
function inMouse(name){ mouse = name;console.log(mouse);}
function outMouse(){return mouse;}
/*function track(e){
        var tar = document.getElementById("mousebar");
        tar.style.left = (e.pageX + 10) + 'px'
        tar.style.top = (e.pageY + 10) + 'px'
}*/
