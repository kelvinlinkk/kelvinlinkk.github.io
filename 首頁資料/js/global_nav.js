// global_nav.js
(function () {
    // Check if the FAB already exists
    if (document.getElementById('global-nav-fab')) return;

    // Determine the root path relatively or use root relative
    // If the path contains 'genshin', path to root is '../'
    let rootPath = './';
    const pathName = window.location.pathname;
    if (pathName.includes('/genshin/') || pathName.includes('/dialog/')) {
        rootPath = '../';
    }

    const fab = document.createElement('a');
    fab.id = 'global-nav-fab';
    fab.href = rootPath + 'index.html#tools';

    // SVG Home Icon
    fab.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
    `;

    document.body.appendChild(fab);

    // If the page imports this script but doesn't have the CSS
    if (!document.querySelector('link[href*="global_nav.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = rootPath + '首頁資料/css/global_nav.css';
        document.head.appendChild(link);
    }
})();
