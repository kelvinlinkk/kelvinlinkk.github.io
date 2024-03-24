const welcomeimg = document.getElementById('background-img')
const aside = document.getElementById('test')
const asideImg = document.getElementById('aside-icon')
const anime = document.getElementById('anime')
const main = document.getElementsByTagName('main')[0]
async function getjson(name) {
    const response = await fetch('首頁資料/js/' + name + '.json');
    return await response.json();
}

async function drawLogo() {
    getjson('logo').then(data => {
        for (let i in data['categories']) {
            //if (data['categories'][i]['categoryName']=="娛樂🎮"){
            //    break; //拿掉娛樂
            //}
            const category = data['categories'][i];
            const article = document.createElement('article');
            const section = document.createElement('section');
            const h2 = document.createElement('h2');
            h2.textContent = category['categoryName'];
            article.appendChild(h2);
            article.className='apps';

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
            main.appendChild(article);
        }
    });
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
        window.alert("hi")
        count = 0
    } else {
        count = 0
    }
}