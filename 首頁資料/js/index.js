function getHeader() {
        window.removeEventListener('scroll', getHeader)
        header = document.getElementsByTagName('header')[0];
        Fading(header, 5, 100, 1)
        setTimeout(() => { header.style.visibility = "visible" }, 1)
}
window.addEventListener('scroll', getHeader, false)

function Fading(obj, speed, frames, f) {
        for (let i = 0; i <= frames; i++) { setTimeout(() => { obj.style.opacity = String((f ? i : (frames - i)) / frames); }, i * speed) }
}

//info is from href.jsasync function
async function getjson() {
        const response = await fetch('首頁資料/js/data.json');
        return await response.json();
}

async function drawLogo() {
        const container = document.getElementById('test'); // Replace 'yourContainerId' with the actual ID of the container where you want to append the content
        getjson().then(data => {
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
                                div.className = 'infos'; // Add the class attribute here
                                const a = document.createElement('a');
                                const span = document.createElement('span');
                                const img = document.createElement('img');

                                a.href = category['links'][link]['url'];
                                span.textContent = link;
                                img.src = '首頁資料/logo/' + category['links'][link]['icon'];

                                a.appendChild(span);
                                a.appendChild(img);
                                div.appendChild(a);
                                section.appendChild(div);
                                article.appendChild(section);
                        }

                        container.appendChild(article);
                }
                displayArticle();displayHeader();
        });
         
}

function displayArticle() {
        var articles = document.getElementsByTagName('article');
        for (i = 0; i < articles.length; i++) {
                articles[i].getElementsByTagName('h3')[0].addEventListener('click', function () {
                        let mysection = this.parentNode.getElementsByTagName('section')[0]
                        let myflag = (mysection.style.display != 'block')
                        if (myflag == 1) {
                                setTimeout(() => { mysection.style.setProperty('display', 'block', 'important'); }, 1)
                                Fading(mysection, 5, 100, myflag);
                        }
                        else if (mysection.style.opacity == '1') {
                                setTimeout(() => { mysection.style.setProperty('display', 'none', 'important'); }, 800)
                                Fading(mysection, 5, 100, myflag);
                        }
                }, false)
        }
}

function displayHeader() {
        var myselect = document.getElementsByClassName('header-select');
        window.onclick = () => {
                for (j = 0; j < myselect.length; j++) {
                        myselect[j].getElementsByClassName('header-list')[0].style.setProperty('display', 'none');
                }
        }
        for (i = 0; i < myselect.length; i++) {
                myselect[i].addEventListener('click', function () {
                        let mylist = this.getElementsByClassName('header-list')[0]
                        let myflag = (mylist.style.display != 'block')
                        if (myflag == 1) {
                                setTimeout(() => { mylist.style.setProperty('display', 'block', 'important'); }, 1)
                                Fading(mylist, 5, 100, myflag);
                        }
                        else if (mylist.style.opacity == '1') {
                                setTimeout(() => { mylist.style.setProperty('display', 'none', 'important'); }, 800)
                                Fading(mylist, 5, 100, myflag);
                        }
                }, false)
        }
}

