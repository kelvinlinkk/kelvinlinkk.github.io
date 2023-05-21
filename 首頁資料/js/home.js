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
};
var setdate = function(date_string){
    window.onload = function(){
        countdown(date_string);
        setInterval(countdown, 1000, date_string);
    }
};

function start(){
        var menu = document.getElementsById('123');
        menu.style.opacity = "1"
}

/*function track(e){
        var tar = document.getElementById("mousebar");
        tar.style.left = (e.pageX + 10) + 'px'
        tar.style.top = (e.pageY + 10) + 'px'
}*/

var toolInfo = [["https://www.ilovepdf.com/zh-tw","ilovepdf","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ilovepdf.png"],
        ["https://www.overleaf.com/","overleaf","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/overleaf.svg"],
        ["https://ezcv.tw/","EZ學習歷程","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ez.png"],
        ["https://www.canva.com/zh_tw/","canva","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/canva.svg"],
        ["https://www.flaticon.com/","flaticon","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/flaticon.jpg"],
        ["https://www.magicpattern.design/tools/blob-generator","blob","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/magicpattern.jpg"],
        ["https://www.openpeeps.com/","open peeps","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/openpeeps.png"],
        ["https://unsplash.com/","unsplash","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/unsplash.svg"],
        ["https://thepopp.com/templates/scheat/","Power of PPT","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/popp.svg"],
        ["https://slidesgo.com/","slidesgo","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/slidesgo.svg"],
        ["https://www.slidor.fr/en/selfone","selfone","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/slidor.png"],
        ["https://whimsical.com","whimsical","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/whimsical.jpg"],
        ["https://xmind.app/","xmind","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/xmind.svg"],
        ["https://www.notion.so/zh-tw","notion","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/notion.svg"],
        ["https://elements.envato.com/","envato","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/envato.svg"], 
        ["https://fonts.google.com/","google fonts","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/googlefonts.png"],
        ["https://reurl.cc","reurl","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/reurl.png"],
        ["https://illustimage.com","illustimage","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/illustimage.png"],
        ["https://www.fontspace.com/","fontspace","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/fontspace.jpg"],
        ["https://free.com.tw/","free sources","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/free.jpg"],
        ["https://pixelfika.com","Pixelfika","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/pixelfika.png"],
        ["https://photock.org","photock","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/photock.png"],
        ["https://undraw.co/illustrations","undraw","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/undraw.png"],
        ["https://app.haikei.app/","Haikei","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/haikei.png"],
        ["http://dig.ccmixter.org/","dig.ccMixter","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/digccMixter.png"],
        ["https://eword.ntpc.edu.tw/","生字簿","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/字.png"],
        ["https://vectorwiki.com","vectorwiki","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/vectorwiki.png"]];

var learnInfo = [["https://www.shs.edu.tw/","中學生網站","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/中學生.png"],
        ["https://ndltd.ncl.edu.tw/","博碩網","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/博碩網.jpg"],
        ["https://twsf.ntsec.gov.tw/","科教館","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/科教館.png"],
        ["https://twpat3.tipo.gov.tw/","專利檢索","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/IPO.png"],
        ["http://www.ieyiun.org/","IEYI","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ieyi.png"]];

var codeInfo = [["https://www.w3schools.com/","w3schools","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/w3logo.png"],
        ["https://www.codecademy.com/","codecademy","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/codecademy.svg"],
        ["https://www.edx.org/","edx","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/edx.png"],
        ["https://www.khanacademy.org/","khanacademy","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/khan.svg"],
        ["https://www.udacity.com/","udacity","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/udacity.svg"],
        ["https://dash.generalassemb.ly/","dash","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/dash.png"],
        ["https://www.learneroo.com/","learneroo","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/learneroo.jpg"],
        ["https://bento.io/","banto.io","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/bento.svg"],
        ["https://www.freecodecamp.org/","freecodecamp","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/freecodecamp.svg"],
        ["https://leetcode.com/","leetcode","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/leetcode.png"],
        ["http://github.com","github","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/github.png"],
        ["https://www.oxxostudio.tw/","oxxostudio","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/oxxo.png"]];

var studyInfo = [["https://tw.voicetube.com/","voicetube","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/voicetube.svg"],
        ["https://www.bbc.co.uk/learningenglish/","BBCEng","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/bbc.png"],
        ["https://www.youtube.com/user/crashcourse","Crash Course","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/crashcourse.png"],
        ["https://www.youtube.com/c/TED","TED","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ted.svg"],
        ["https://quizlet.com/zh-tw","Quizlet","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/quizlet.svg"],
        ["https://open.spotify.com/collection/podcasts","podcasts","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/spotify.svg"],
        ["https://www.geogebra.org/u/kkbestlin","geogebra","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/geogebra.png"],
        ["https://www.coolenglish.edu.tw/","cool english","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/coolenglish.png"],
        ["https://www.etymonline.com/","etymonline ","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/etymonline.jpg"],
        ["https://www.junyiacademy.org/","均一","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/均一.svg"],
        ["http://www.baysidepremier.com/","SAT","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/sat.png"],
        ["https://dict.revised.moe.edu.tw/","教育部辭典","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/dict.svg"],
        ["https://dictionary.cambridge.org/","劍橋辭典","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/cambridge.png"],
        ["https://www.twreporter.org/","報導者","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/thereporter.svg"],
        ["https://www.peopo.org/","PEOPO","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/peopo.jpg"],
        ["https://www.goodreads.com/quotes","Quotes","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/goodreads.jpg"],
        ["https://www.snexplores.org/","SNExplores","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/sn.svg"],
        ["https://www.science.org/","AAAS","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/aaas.svg"],
        ["https://www.merriam-webster.com/","韋氏字典","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/webster.jpg"],
        ["https://www.theguardian.com/science","Guardian","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/guardian.svg"]];

var schoolInfo = [["http://www.ytjh.ylc.edu.tw/","揚子高中","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/yths.png"],
        ["https://www.ewant.org/","ewant","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ewant.jpg"],
        ["https://epf.mlife.org.tw/Portal.do","學習歷程上傳","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/學習歷程.png"],
        ["http://ocw.aca.ntu.edu.tw/ntu-ocw/","台大開放式課程","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/台大.svg"],
        ["https://students.tw/","高中生資訊網","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/student.jpg"]];

var googleInfo = [["https://www.google.com/","search","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/googlesearch.png"],
        ["https://mail.google.com/","gmail","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/gmail.png"],
        ["https://translate.google.com/","translate","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/translate.png"],
        ["https://drive.google.com/","drive","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/drive.png"],
        ["https://keep.google.com/","keep","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/keep.png"],
        ["https://classroom.google.com/","classroom","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/classroom.png"],
        ["https://chrome.google.com/webstore/","web store","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/webstore.svg"],
        ["https://photos.google.com/","photo","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/photo.svg"],
        ["https://www.google.com/maps/","map","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/map.png"],
        ["https://meet.google.com/","meet","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/meet.png"], 
        ["https://docs.google.com/drawings/","drawings","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/drawing.png"], 
        ["https://www.kaggle.com/","kaggle","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/kaggle.svg"],    
        ["https://podcasts.google.com/","podcast","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/podcast.png"]];

var msInfo = [["https://to-do.live.com/tasks/","to-do","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/todo.svg"],  
        ["https://www.bing.com/","bing","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/bing.jpg"],      
        ["https://o365oid-my.sharepoint.com/","onedrive","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/onedrive.png"],           
        ["https://outlook.office365.com/","outlook","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/outlook.png"],   
        ["https://www.office.com/launch/word","word","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/word.png"],  
        ["https://www.office.com/launch/excel","excel","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/excel.png"],   
        ["https://www.office.com/launch/powerpoint","powerpoint","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/powerpoint.png"],   
        ["https://www.office.com/","office","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/office.png"]];

var collegeInfo = [["https://collego.edu.tw/","collego","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/collego.svg"],
        ["https://ioh.tw/","IOH","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ioh.jpg"],
        ["https://www.unews.com.tw/","大學問","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/大學問.jpg"],
        ["https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/index.php","大學招生委員會","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/college.jpg"],
        ["https://career.cloud.ncnu.edu.tw/","學生生涯輔導網","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/career.png"],
        ["https://srecruit.moe.edu.tw/","特殊選才","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/特殊選才.jpg"],
        ["https://www.ceec.edu.tw/","大考中心","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/大考中心.jpg"],
        ["https://nsdua.moe.edu.tw/","多元入學","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/多元入學.jpg"],
        ["https://university.1111.com.tw/index.asp","1111大學網","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/1111大學網.jpg"],
        ["https://www.104.com.tw/jb/career/","104求職網","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/104.svg"]];

var aiInfo = [["https://creator.nightcafe.studio/","nightcafe","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/nightcafe.jpg"],
        ["https://hotpot.ai/","hotpot","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/hotpot.jpg"],
        ["https://leonardo.ai/","Leonardo","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/leonardo.png"],
        ["https://www.naturalreaders.com/","Natural Readers","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/nr.svg"]];

var raceInfo = [["https://www.formula1.com/","f1","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/f1.svg"],
        ["https://www.motogp.com/","motogp","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/motogp.png"],
        ["https://www.motorsport.com/","motorsport","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/motorsport.jpg"],
        ["https://www.autosport.com/","autosport","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/autosport.jpg"],
        ["https://www.sportsv.net/racing","運動視界","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/運動視界.jpg"]];

var socialInfo =[["https://www.youtube.com/","YouTube","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/YouTube.svg"],
        ["https://www.messenger.com/","messenger","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/messenger.svg"],
        ["https://www.instagram.com/","instagram","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/ig.jpg"],
        ["https://www.facebook.com/","Facebook","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/facebook.svg"],
        ["https://twitter.com/","twitter","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/twitter.svg"],
        ["https://www.twitch.tv/","twitch","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/twitch.svg"],
        ["https://discord.com/app","discord","https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/discord.svg"]];

function drawLogo(arrName){
        for(let i =0; i<arrName.length;i++){
                document.write('<div class="infos"><a href="' + arrName[i][0] +'"><span>'+ arrName[i][1] + '</span><img src="'+ arrName[i][2] +'"></a></div>')
        }
};