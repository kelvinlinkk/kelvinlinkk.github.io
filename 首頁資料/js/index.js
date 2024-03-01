const welcomeimg = document.getElementById('background-img')
const aside = document.getElementById('test')
const asideImg = document.getElementById('aside-icon')
const anime = document.getElementById('anime')

var asideflag = 0
var backgroundnum = 0

function fade(tar, speed, dir) {
    for (let i = 0; i <= 500; i++) {
        setTimeout(() => { tar.style.opacity = (dir ? i : 500 - i) / 500; }, i * speed)
    }
}
function color(tar, speed, dir) {
    for (let i = 0; i <= 500; i++) {
        setTimeout(() => { tar.style.filter = 'brightness(' + (dir ? i : 500 - i) / 500 + ')'; }, i * speed)
    }
}
function slide(tar, speed, from, to) {
    let startTime;
    const duration = 2500/speed; // Animation duration in milliseconds

    function animateSlide(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        const progress = timestamp - startTime;

        if (progress < duration) {
            const newPosition = from + ((progress / duration) * (to - from));
            tar.style.left = `${newPosition}vw`;
            requestAnimationFrame(animateSlide);
        } else {
            tar.style.left = `${to}vw`;
            startTime = null;
        }
    }

    requestAnimationFrame(animateSlide);
}

function bounce(tar, speed) {
    for (let i = 0; i < 500; i++) {
        setTimeout(
            function () {
                tar.style.transform = 'scale(' + (4500 + i) / 5000 + ',' + (4500 + i) / 5000 + ')';
            }, i * speed)
    }
}

async function getjson(name) {
    const response = await fetch('首頁資料/js/' + name + '.json');
    return await response.json();
}

async function drawLogo() {
    getjson('logo').then(data => {
        for (let i in data['categories']) {
            const category = data['categories'][i];
            const article = document.createElement('article');
            const section = document.createElement('section');
            const h3 = document.createElement('h3');
            h3.textContent = category['categoryName'];
            article.appendChild(h3);

            for (let j in Object.keys(category['links'])) {
                const link = Object.keys(category['links'])[j];
                const div = document.createElement('div');
                div.className = 'infos';
                const a = document.createElement('a');
                const span = document.createElement('span');
                const img = document.createElement('img');

                a.href = category['links'][link]['url'];
                span.textContent = link;
                img.src = '首頁資料/logo/' + category['links'][link]['icon'];
                img.alt = category['links'][link]['icon'];
                a.setAttribute('tabindex', '-1')

                a.appendChild(span);
                a.appendChild(img);
                div.appendChild(a);
                section.appendChild(div);
                article.appendChild(section);
            }
            aside.appendChild(article);
        }
    });
}

asideImg.onclick = function () {
    if (asideflag == 0) {
        asideflag = 1
        slide(aside, 2, 100, 0)
        color(asideImg, 1, 1)
        setTimeout(() => { asideflag = 2 }, 1000)
    } else if (asideflag == 2) {
        asideflag = 1
        slide(aside, 2, 0, 100)
        color(asideImg, 1, 0)
        setTimeout(() => { asideflag = 0 }, 1000)
    }
}

/*換背景上上下下左左右右ABAB*/
mylist = [38, 38, 40, 40, 37, 37, 39, 39, 65, 66, 65, 66]
count = 0
window.onkeydown = function (e) {
    if (e.which == 38 && count == 0) {
        count = 1
    } else if (e.which == mylist[count] && count < mylist.length - 1) {
        count += 1
    } else if (e.which == mylist[count] && count == mylist.length - 1) {
        backgroundnum < 2 ? backgroundnum += 1 : backgroundnum = 0
        welcomeimg.src = "首頁資料/background/background" + backgroundnum + ".jpg"
        count = 0
    } else {
        count = 0
    }
}
flag = []
function track(n) {
    var tar = document.getElementsByClassName("content")[n];
    var section = tar.getElementsByTagName('section')[0];
    var mypic = section.getElementsByTagName('img')[0];
    var mytext = section.getElementsByTagName('p')[0];
    tarTop = tar.getBoundingClientRect().top;
    tarBot = tar.getBoundingClientRect().bottom;
    if (tarTop > screen.height - 100 || tarBot < 0) {
        flag[n] = false;
    } else if (flag[n] == false) {
        bounce(mypic, 0.5);
        fade(mytext, 1.7, 1)
        flag[n] = true;
    } else {
        flag[n] = true;
    }
}
for (let i in document.getElementsByClassName('content')) {
    flag.push(false)
    track(i)
    window.addEventListener('scroll', () => { track(i) })
}