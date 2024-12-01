async function fillList(type) {
    const table = document.getElementById(type);
    try {
        const response = await fetch(`首頁資料/${type}.json`);
        const data = await response.json();
        
        const fragment = document.createDocumentFragment();
        
        Object.entries(data).forEach(([name, score]) => {
            const tr = document.createElement('tr');
            const nameTd = document.createElement('td');
            const link = document.createElement('a');
            
            link.href = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
            link.textContent = name;
            
            nameTd.appendChild(link);
            tr.appendChild(nameTd);
            tr.appendChild(Object.assign(document.createElement('td'), {textContent: score}));
            
            fragment.appendChild(tr);
        });
        
        table.appendChild(fragment);
    } catch (err) {
        console.error(`Error loading ${type} data:`, err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ['motogp', 'f1'].forEach(fillList);
});