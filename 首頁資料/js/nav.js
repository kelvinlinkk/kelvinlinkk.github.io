
document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine relative paths
    const isSubPage = window.location.pathname.includes('/%E5%AD%B8%E7%BF%92%E6%AD%B7%E7%A8%8B/') || window.location.pathname.includes('/學習歷程/');
    const pfx = isSubPage ? '../' : './';
    const subPfx = isSubPage ? '' : '學習歷程/';

    // 2. Define menu items
    const menuItems = [
        { name: 'Portfolio Home', link: pfx + 'portfolio.html', icon: '🏠' },
        { name: 'Chinese (國文)', link: subPfx + 'Chinese.html', icon: '📜' },
        { name: 'English (英文)', link: subPfx + 'English.html', icon: '🅰️' },
        { name: 'Biology (生物)', link: subPfx + 'Biology.html', icon: '🧬' },
        { name: 'History (歷史)', link: subPfx + 'History.html', icon: '🏺' },
        { name: 'Geography (地理)', link: subPfx + 'Geography.html', icon: '🌏' },
        { name: 'Career (生涯)', link: subPfx + 'Career.html', icon: '🎓' },
        { name: 'Activity (活動)', link: subPfx + 'Activity.html', icon: '🎭' },
        { name: 'Competition (競賽)', link: subPfx + 'Competition.html', icon: '🏆' },
        { name: 'Back to Main Site', link: pfx + 'index.html', icon: '🔙', special: true }
    ];

    // 3. Create the nav structure
    const navContainer = document.createElement('nav');
    navContainer.className = 'modern-nav';

    const logoDiv = document.createElement('div');
    logoDiv.className = 'nav-logo';
    logoDiv.innerHTML = `<h2>My Portfolio</h2>`;
    navContainer.appendChild(logoDiv);

    const ul = document.createElement('ul');

    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.innerHTML = `<span class="icon">${item.icon}</span> <span class="text">${item.name}</span>`;
        if (item.special) a.classList.add('special-link');

        // Active state check
        // We compare the filename part of the path
        const currentFile = window.location.pathname.split('/').pop() || 'portfolio.html';
        const linkFile = item.link.split('/').pop();
        if (currentFile === linkFile) {
            li.classList.add('active');
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    navContainer.appendChild(ul);

    // 4. Inject into the body (prepend)
    document.body.insertAdjacentElement('afterbegin', navContainer);

    // 5. Add a mobile toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.onclick = () => {
        navContainer.classList.toggle('open');
    };
    document.body.appendChild(toggleBtn);
});
