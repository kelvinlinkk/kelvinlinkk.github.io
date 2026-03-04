// global_nav.js - Premium Unified Navigation Drawer
(function () {
    if (document.getElementById('global-nav-fab')) return;

    // Determine the root path relatively
    let rootPath = './';
    const pathName = window.location.pathname;
    const isSpecialFolder = pathName.includes('/genshin/') || pathName.includes('/dialog/');
    if (isSpecialFolder) {
        rootPath = '../';
        if (pathName.includes('/dialog/script/') || pathName.includes('/dialog/style/')) {
            rootPath = '../../';
        }
    } else if (pathName.includes('首頁資料')) {
        rootPath = '../'; // Just in case
    }

    // Create FAB
    const fab = document.createElement('div');
    fab.id = 'global-nav-fab';
    fab.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="fab-menu-icon" class="nav-icon-menu">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="fab-close-icon" class="nav-icon-close" style="display:none;">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    `;
    document.body.appendChild(fab);

    // Create Sidebar Navigation Structure
    const overlay = document.createElement('div');
    overlay.id = 'global-nav-overlay';

    const sidebar = document.createElement('div');
    sidebar.id = 'global-nav-sidebar';

    const navData = [
        {
            title: "🌐 主站點 (Main)",
            links: [
                { name: "首頁 / 關於 / 專案", url: "index.html", icon: "fa-solid fa-house" },
                { name: "學習作品集", url: "portfolio.html", icon: "fa-solid fa-book" },
                { name: "專題報告", url: "report.html", icon: "fa-solid fa-file-alt" },
            ]
        },
        {
            title: "🛠️ 網頁應用與工具 (Tools)",
            links: [
                { name: "2026 跨年戰情室", url: "new_year.html", icon: "fa-solid fa-fire" },
                { name: "數獨遊戲與小幫手", url: "sudoku.html", icon: "fa-solid fa-border-all" },
                { name: "猜數字 (幾A幾B)", url: "guessnum.html", icon: "fa-solid fa-question-circle" },
                { name: "RGB 3D 色彩方塊", url: "color.html", icon: "fa-solid fa-palette" },
                { name: "極簡全熒幕時鐘", url: "search.html", icon: "fa-solid fa-clock" },
                { name: "CSS 旋轉藝術", url: "rotate.html", icon: "fa-solid fa-sync" }
            ]
        },
        {
            title: "✨ 原神互動實用專區 (Gacha)",
            links: [
                { name: "祈願抽卡模擬器", url: "genshin/card.html", icon: "fa-solid fa-star" },
                { name: "抽卡機率分佈 (PMF)", url: "genshin/pmf.html", icon: "fa-solid fa-chart-line" },
                { name: "UP池機率分佈 (PMF UP)", url: "genshin/pmfup.html", icon: "fa-solid fa-chart-bar" },
                { name: "累積出率曲線 (CDF)", url: "genshin/cdf.html", icon: "fa-solid fa-chart-area" },
                { name: "機率變異數分析", url: "genshin/variance.html", icon: "fa-solid fa-chart-pie" },
                { name: "原神資料模擬", url: "genshin/gacha.html", icon: "fa-solid fa-cube" },
                { name: "祭典小遊戲", url: "genshin/festival.html", icon: "fa-solid fa-gamepad" }
            ]
        },
        {
            title: "💬 其他系統 (Others)",
            links: [
                { name: "對話系統", url: "dialog/main.html", icon: "fa-solid fa-comments" }
            ]
        }
    ];

    let sidebarHTML = `<div class="gn-header">
        <img src="${rootPath}首頁資料/pic/profile.jpg" alt="Profile" class="gn-avatar" onerror="this.src='${rootPath}首頁資料/logo/logo.png'; this.onerror=null;">
        <div class="gn-user-info">
            <span class="gn-name">Kelvin 林坤逸</span>
            <span class="gn-desc">四通八達的數位宇宙</span>
        </div>
    </div>
    <div class="gn-content">`;

    navData.forEach(section => {
        sidebarHTML += `<div class="gn-section">
            <h4 class="gn-section-title">${section.title}</h4>
            <ul class="gn-list">`;
        section.links.forEach(link => {
            const fullUrl = rootPath + link.url;
            sidebarHTML += `<li><a href="${fullUrl}" class="gn-link"><i class="${link.icon}"></i> ${link.name}</a></li>`;
        });
        sidebarHTML += `</ul></div>`;
    });
    sidebarHTML += `</div>
    <div class="gn-footer">
       <span style="opacity:0.6; font-size:12px;">© 2026 KelvinLinkk. All rights reserved.</span>
    </div>`;
    sidebar.innerHTML = sidebarHTML;

    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);

    // Toggle logic
    let isOpen = false;
    fab.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            sidebar.classList.add('gn-open');
            overlay.classList.add('gn-open');
            document.getElementById('fab-menu-icon').style.display = 'none';
            document.getElementById('fab-close-icon').style.display = 'block';
            document.body.style.overflow = 'hidden';
            fab.style.background = 'rgba(255, 42, 109, 0.85)';
            fab.style.borderColor = 'rgba(255, 42, 109, 1)';
            fab.style.boxShadow = '0 8px 30px rgba(255, 42, 109, 0.5)';
            fab.style.transform = 'rotate(90deg) scale(1.05)';
        } else {
            sidebar.classList.remove('gn-open');
            overlay.classList.remove('gn-open');
            document.getElementById('fab-menu-icon').style.display = 'block';
            document.getElementById('fab-close-icon').style.display = 'none';
            document.body.style.overflow = '';
            fab.style.background = '';
            fab.style.borderColor = '';
            fab.style.boxShadow = '';
            fab.style.transform = '';
        }
    });

    overlay.addEventListener('click', () => {
        if (isOpen) fab.click();
    });

    // FontAwesome + CSS Load
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    if (!document.querySelector('link[href*="global_nav.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = rootPath + '首頁資料/css/global_nav.css';
        document.head.appendChild(cssLink);
    }
})();
