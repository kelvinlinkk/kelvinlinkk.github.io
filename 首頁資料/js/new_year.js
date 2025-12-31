let activeRegion = 'all';
let searchQuery = '';

// Initialize Datalist (The smart Dropdown)
document.addEventListener('DOMContentLoaded', () => {
    const datalist = document.getElementById('searchSuggestions');
    const cities = new Set();
    const artists = new Set();
    const channels = new Set();

    // 1. Scrape all data from HTML
    document.querySelectorAll('.city-title').forEach(el => cities.add(el.innerText));
    document.querySelectorAll('.artist-btn').forEach(el => {
        // Cleanup text (remove flags)
        let text = el.innerText.replace(/🇰🇷|🇯🇵/g, '').trim();
        artists.add(text);
    });
    document.querySelectorAll('.broadcast-row span:first-child').forEach(el => {
        const text = el.innerText.trim();
        if (text && text !== '時間' && text !== '特色' && text !== '網路' && text !== '轉播') {
            channels.add(text);
        }
    });

    // 2. Build the dropdown options
    const createOption = (val, type) => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.label = type;
        return opt;
    };

    // Sort and add options
    const sortedCities = Array.from(cities).sort();
    const sortedArtists = Array.from(artists).sort();
    const sortedChannels = Array.from(channels).sort();

    sortedCities.forEach(c => datalist.appendChild(createOption(c, '📍 地點')));
    sortedArtists.forEach(a => datalist.appendChild(createOption(a, '🎤 藝人')));
    sortedChannels.forEach(ch => datalist.appendChild(createOption(ch, '📺 電視台')));
});

// Main Filter Logic
function applyFilters() {
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const regionMatch = (activeRegion === 'all' || card.dataset.region === activeRegion);
        const textContent = card.innerText.toLowerCase();
        const searchMatch = textContent.includes(searchQuery);

        if (regionMatch && searchMatch) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });

    // Show "No Results" message
    const noRes = document.getElementById('noResults');
    if (visibleCount === 0) {
        noRes.classList.remove('hidden');
        noRes.style.display = 'block';
    } else {
        noRes.classList.add('hidden');
        noRes.style.display = 'none';
    }
}

// Region Button Click
function setRegion(region) {
    activeRegion = region;

    // Update button visual state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.filter-btn[data-target="${region}"]`).classList.add('active');

    applyFilters();
}

// Search Input Event
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
});

// Modal
function toggleModal() {
    const modal = document.getElementById('modModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

window.onclick = function (e) {
    if (e.target == document.getElementById('modModal')) toggleModal();
}

// Artist Search
document.querySelectorAll('.artist-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const artist = this.innerText.replace(/🇰🇷|🇯🇵/g, '').trim();
        const toast = document.getElementById('toast');
        toast.innerText = `🔍 搜尋 ${artist} 跨年現場...`;
        toast.className = 'show';
        setTimeout(() => toast.className = '', 2000);

        const query = encodeURIComponent(`${artist} 2026 跨年 現場`);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    });
});