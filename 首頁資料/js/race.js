function fillList(type) {
    const table = document.getElementById(type)
    async function getjson() {
        const response = await fetch('首頁資料/'+ type + '.json');
        return await response.json();
    }
    getjson().then(datas => {
        for (let i in datas) {
            const tr = document.createElement('tr');
            const name = document.createElement('td');
            const score = document.createElement('td');
            name.textContent = i;
            score.textContent = datas[i];
            tr.appendChild(name); tr.appendChild(score);
            table.appendChild(tr)
        }
    })
}
document.addEventListener('DOMContentLoaded', function() {
    let types = ["motogp","f1"];
    for(let type of types){
        fillList(type);
    }
});