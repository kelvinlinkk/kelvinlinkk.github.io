
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const menuItems = [
        { key: 'home', name: 'Portfolio Home', icon: '🏠' },
        { key: 'chinese', name: 'Chinese (國文)', icon: '📜' },
        { key: 'english', name: 'English (英文)', icon: '🅰️' },
        { key: 'biology', name: 'Biology (生物)', icon: '🧬' },
        { key: 'history', name: 'History (歷史)', icon: '🏺' },
        { key: 'geography', name: 'Geography (地理)', icon: '🌏' },
        { key: 'career', name: 'Career (生涯)', icon: '🎓' },
        { key: 'activity', name: 'Activity (活動)', icon: '🎭' },
        { key: 'competition', name: 'Competition (競賽)', icon: '🏆' },
        { link: 'index.html', name: 'Back to Main Site', icon: '🔙', special: true }
    ];

    const mainElement = document.querySelector('main');

    // 1. Build Navigation
    const navContainer = document.createElement('nav');
    navContainer.className = 'modern-nav';
    navContainer.innerHTML = `
        <div class="nav-logo"><h2>My Portfolio</h2></div>
        <ul></ul>
    `;
    const ul = navContainer.querySelector('ul');

    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        if (item.special) {
            a.href = item.link;
            a.classList.add('special-link');
        } else {
            a.href = '#' + item.key;
            a.dataset.key = item.key;
        }

        a.innerHTML = `<span class="icon">${item.icon}</span> <span class="text">${item.name}</span>`;
        li.appendChild(a);
        ul.appendChild(li);
    });

    // Mobile Toggle
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.onclick = () => navContainer.classList.toggle('open');

    document.body.insertAdjacentElement('afterbegin', navContainer);
    document.body.appendChild(toggleBtn);

    // 2. Render Function
    function render(hash) {
        // Handle #category/articleId
        const [pageKey, articleId] = hash.split('/');

        // Fallback to home if pageKey not found
        let key = pageKey;
        if (!portfolioData[key]) key = 'home';

        const data = portfolioData[key];

        // Update Active State in Nav
        document.querySelectorAll('.modern-nav li').forEach(li => li.classList.remove('active'));
        const activeLink = document.querySelector(`.modern-nav a[data-key="${key}"]`);
        if (activeLink) activeLink.parentElement.classList.add('active');

        // Close mobile nav if open
        navContainer.classList.remove('open');

        let html = '';

        // DETAIL VIEW
        if (articleId) {
            const article = data.articles ? data.articles.find(a => a.id === articleId) : null;
            if (article && article.detailHtml) {
                html = `
                    <div class="detail-header">
                        <button onclick="window.location.hash='${key}'" class="back-btn">← Back to List</button>
                    </div>
                    ${article.detailHtml}
                `;
            } else {
                html = `
                    <div class="error-container">
                        <h2>Article not found or not migrated yet.</h2>
                        <button onclick="window.location.hash='${key}'" class="back-btn">Go Back</button>
                    </div>`;
            }
        }
        // LIST VIEW
        else {
            html = `<h1>${data.title}</h1>`;
            if (data.articles) {
                data.articles.forEach(article => {
                    let downloadBtn = '';
                    if (article.downloadLink) {
                        downloadBtn = `
                            <div style="margin-top: 10px;">
                                <a href="${article.downloadLink}" target="_blank" style="color: var(--primary); font-weight: bold; display: inline-flex; align-items: center; gap: 5px;">
                                    ${article.downloadText || '📥 Download'}
                                </a>
                            </div>
                        `;
                    }

                    // Determine if we have a detail page or just external link
                    let readMoreLink = '';
                    if (article.id && article.detailHtml) {
                        readMoreLink = `<br><a href="#${key}/${article.id}" class="read-more">Read More →</a>`;
                    } else if (article.externalLink) {
                        readMoreLink = `<br><a href="${article.externalLink}" target="_blank" class="read-more">Read More →</a>`;
                    }

                    // Use summary if available, else content (legacy support)
                    const contentText = article.summary || article.content;

                    html += `
                    <article>
                        <div class="content">
                            <h2>${article.title}</h2>
                            <div class="article-body">${contentText} ${readMoreLink}</div>
                            ${downloadBtn}
                        </div>
                        <div class="pic">
                            ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
                        </div>
                    </article>
                    `;
                });
            }
        }

        // Fade out, then swap content and fade in
        mainElement.style.opacity = '0';
        setTimeout(() => {
            mainElement.innerHTML = html;
            mainElement.style.opacity = '1';
            window.scrollTo(0, 0); // Scroll to top
        }, 200);
    }

    // Add transition style to main
    mainElement.style.transition = 'opacity 0.2s ease';

    // 3. Router
    function handleHashChange() {
        const hash = window.location.hash.slice(1) || 'home';
        render(hash);
    }

    window.addEventListener('hashchange', handleHashChange);

    // Initial Load
    handleHashChange();
});
