
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const menuItems = [
        { key: 'home', name: 'Portfolio Home', icon: 'fa-home' },
        { key: 'chinese', name: 'Chinese (國文)', icon: 'fa-book' },
        { key: 'english', name: 'English (英文)', icon: 'fa-language' },
        { key: 'biology', name: 'Biology (生物)', icon: 'fa-dna' },
        { key: 'history', name: 'History (歷史)', icon: 'fa-landmark' },
        { key: 'geography', name: 'Geography (地理)', icon: 'fa-globe-asia' },
        { key: 'career', name: 'Career (生涯)', icon: 'fa-graduation-cap' },
        { key: 'activity', name: 'Activity (活動)', icon: 'fa-users' },
        { key: 'competition', name: 'Competitions (競賽)', icon: 'fa-trophy' }
    ];

    const mainElement = document.getElementById('main-content');
    const sidebarList = document.getElementById('portfolio-nav-list');

    // Modal Elements
    const modalOverlay = document.getElementById('article-modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalCategoryLabel = document.getElementById('modal-category-label');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // 1. Build Sidebar
    if (sidebarList) {
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + item.key;
            a.dataset.key = item.key;
            a.className = 'sidebar-link';
            a.innerHTML = `<i class="fas ${item.icon}"></i> ${item.name}`;
            li.appendChild(a);
            sidebarList.appendChild(li);
        });
    }

    // Modal Logic
    function openModal(categoryKey, articleData) {
        if (!modalOverlay) return;

        const categoryName = menuItems.find(m => m.key === categoryKey)?.name || categoryKey;
        if (modalCategoryLabel) modalCategoryLabel.textContent = categoryName;

        let contentHtml = '';
        if (articleData.image) {
            contentHtml += `<img src="${articleData.image}" class="modal-hero-image" alt="Cover">`;
        }
        contentHtml += `<h1 class="modal-title">${articleData.title}</h1>`;

        if (articleData.detailHtml) {
            contentHtml += articleData.detailHtml;
        } else {
            contentHtml += `<p>${articleData.content || articleData.summary}</p>`;
        }

        if (articleData.downloadLink) {
            contentHtml += `
             <div style="margin-top: 32px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 24px;">
                 <a href="${articleData.downloadLink}" target="_blank" class="read-btn" style="font-size:1rem; padding:10px 20px;">
                     ${articleData.downloadText || 'Download File'} <i class="fas fa-download"></i>
                 </a>
             </div>
             `;
        }

        modalBody.innerHTML = contentHtml;
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Remove ID from hash but keep category
        const hash = window.location.hash;
        const [cat] = hash.slice(1).split('/');
        if (cat) {
            // Use replaceState to avoid cluttering history stack when closing
            history.replaceState(null, null, '#' + cat);
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // State Tracking
    let currentCategory = null;

    // 2. Render Function
    function render(hash) {
        const [pageKey, articleId] = hash.split('/');
        let key = pageKey;
        if (!portfolioData[key]) key = 'home';
        const data = portfolioData[key];

        // A. LIST RENDERING (Only if specific category changed)
        // We always re-render to highlight active state, but maybe optimize DOM later if needed.
        // For simplicity, we diff existing category.

        // Sidebar Active
        if (sidebarList) {
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.sidebar-link[data-key="${key}"]`);
            if (activeLink) activeLink.classList.add('active');
        }

        if (currentCategory !== key) {
            currentCategory = key;

            let listHtml = `
                <div class="content-header">
                    <h1 class="content-title">${data.title}</h1>
                    ${data.description ? `<p class="content-subtitle">${data.description}</p>` : ''}
                </div>
                <div class="article-grid">
            `;

            if (data.articles) {
                data.articles.forEach(article => {
                    let hasDetail = !!article.id;
                    let summaryText = article.summary || article.content || "";
                    // Strip HTML
                    const tmpDiv = document.createElement('div');
                    tmpDiv.innerHTML = summaryText;
                    let plainText = tmpDiv.textContent || tmpDiv.innerText || "";
                    if (plainText.length > 120) plainText = plainText.substring(0, 120) + "...";

                    let imageHtml = '';
                    if (article.image) {
                        imageHtml = `<img src="${article.image}" alt="${article.title}" class="article-image">`;
                    }

                    // Click Action:
                    // - Detail -> Hash Change (opens modal)
                    // - External -> Open New Tab
                    let clickAction = '';
                    if (hasDetail) {
                        clickAction = `onclick="window.location.hash='#${key}/${article.id}'"`;
                    } else if (article.link) {
                        clickAction = `onclick="window.open('${article.link}', '_blank')"`;
                    }

                    listHtml += `
                    <div class="article-card" ${clickAction} role="button" tabindex="0">
                        ${imageHtml}
                        <div class="article-card-content">
                            <h3>${article.title}</h3>
                            <p class="article-summary">${plainText}</p>
                            ${hasDetail ? `<span class="read-btn">Open <i class="fas fa-expand-alt" style="margin-left:4px;"></i></span>` : ''}
                        </div>
                    </div>
                    `;
                });
            } else {
                listHtml += `<p style="color:var(--text-muted);">No articles found.</p>`;
            }
            listHtml += `</div>`;

            // Render Transition
            mainElement.style.opacity = '0';
            setTimeout(() => {
                mainElement.innerHTML = listHtml;
                mainElement.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 100);
        }

        // B. MODAL STATE (Check every hash change)
        if (articleId && data.articles) {
            const article = data.articles.find(a => a.id === articleId);
            if (article) {
                openModal(key, article);
            }
        } else {
            // Close if open
            if (modalOverlay && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        }
    }

    if (mainElement) mainElement.style.transition = 'opacity 0.2s ease';

    // 3. Router
    function handleHashChange() {
        const hash = window.location.hash.slice(1) || 'home';
        render(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});
