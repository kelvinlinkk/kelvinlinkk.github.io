//info is from href.js
function drawLogo() {
        for (let j = 0; j < info.length; j++) {
                document.write('<article><h1 onclick=\"showthis(\'list' + j + '\')\">' + infoname[j] + '</h1><section id=\"list' + j + '\">');
                for (let i = 0; i < info[j].length; i++) {
                        document.write('<div class="infos"><a href="' + info[j][i][0] + '"><span>' + info[j][i][1] + '</span><img src="https://github.com/kelvinlinkk/web-source/raw/main/網頁資料/icon/' + info[j][i][2] + '" onmouseenter="inMouse(' + j + ',' + i + ')" onmouseout="mouse=\'\';document.getElementById(\'mousebar\').style.opacity = \'0\';"></a></div>')
                }
                document.write('</section></article>');
        }
};

function fade(name, speed, io) {
        for (let i = 0; i < 100; i++) {
                setTimeout(function () {
                        if (io == 1) { document.getElementById(name).style.opacity = String(i / 100); }
                        else { document.getElementById(name).style.opacity = String((100 - i) / 100); }
                }, speed * i)
        }
}

function start() {
        for (let i = 0; i < 100; i++) {
                fade('cover', 10, 0);
                fade('main', 10, 1);
                fade('search', 10, 1);
                fade('page', 10, 1);
        }
        setTimeout(function () {
                document.getElementById('cover').style.display = "none";
        }, 1000);
}

function showthis(elem) {
        document.getElementById(elem).style.display = 'inherit';
        fade(elem, 5, 1);
}
function closeall() {
        for (let j = 0; j < info.length; j++) {
                fade('list' + j, 5, 0);
                setTimeout(() => document.getElementById('list' + j).style.display = 'none', 500);
        }

}