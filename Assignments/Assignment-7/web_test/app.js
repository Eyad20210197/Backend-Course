/**
 * THE CAIRO GAZETTE & CLASSIC BOOKSHELF — EST. 1984
 * Simple English Client Orchestrator connecting 100% of Assignment 7 Endpoints
 */

// Determine base API URL (supports direct express server or custom port)
const API_BASE = window.location.origin.includes('http') ? '' : 'http://localhost:3000';

// Cover color themes for 3D Bookshelf variety
const COVER_THEMES = ['cover-burgundy', 'cover-forest', 'cover-prussian', 'cover-cognac', 'cover-umber', 'cover-gold'];

// Estate presets for Batch Inscriptions (POST /books/batch)
const ESTATE_PRESETS = {
  '1980s': [
    { title: "Neuromancer", author: "William Gibson", year: 1984, genres: ["Science Fiction", "Cyberpunk"] },
    { title: "The Martian Chronicles", author: "Ray Bradbury", year: 1950, genres: ["Science Fiction", "Classic Literature"] },
    { title: "Dune", author: "Frank Herbert", year: 1965, genres: ["Science Fiction", "Epic"] }
  ],
  'classics': [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genres: ["Fantasy", "Children"] },
    { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", year: 1954, genres: ["Fantasy", "Epic"] },
    { title: "The Silmarillion", author: "J.R.R. Tolkien", year: 1977, genres: ["Fantasy", "Mythology"] }
  ]
};

let currentEstatePreset = '1980s';
let allShelvedBooks = [];
let activeBookModal = null;

// ==========================================================================
// TOAST NOTIFICATIONS (Simple English)
// ==========================================================================
function dispatchTelegraph(title, text, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'telegraph-toast';
  if (isError) toast.style.borderLeftColor = '#a3222a';

  const wireCode = `CAIRO PRESS NOTICE #${Math.floor(100 + Math.random() * 900)}`;
  toast.innerHTML = `
    <div class="toast-wire-code">${wireCode}</div>
    <div class="toast-msg"><strong>${title}:</strong> ${text}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// ==========================================================================
// API HELPER
// ==========================================================================
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Error status: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    dispatchTelegraph("System Notice", err.message, true);
    throw err;
  }
}

// ==========================================================================
// 3D BOOKSHELF RENDERING
// ==========================================================================
function renderBookshelf(books) {
  const row1 = document.getElementById('books-row-1');
  const row2 = document.getElementById('books-row-2');
  const countEl = document.getElementById('count-books');
  
  if (!row1 || !row2) return;

  row1.innerHTML = '';
  row2.innerHTML = '';
  
  if (countEl) countEl.textContent = `${books.length} Books`;

  if (!books || books.length === 0) {
    row1.innerHTML = '<div class="bookshelf-loading-placeholder">No books currently on top shelf.</div>';
    row2.innerHTML = '<div class="bookshelf-loading-placeholder">No books currently on bottom shelf.</div>';
    return;
  }

  // Split books into two shelves
  const midpoint = Math.ceil(books.length / 2);
  const shelf1Books = books.slice(0, midpoint);
  const shelf2Books = books.slice(midpoint);

  shelf1Books.forEach((b, i) => {
    row1.appendChild(createBookSpineElement(b, i));
  });

  shelf2Books.forEach((b, i) => {
    row2.appendChild(createBookSpineElement(b, i + midpoint));
  });
}

function createBookSpineElement(book, index) {
  const el = document.createElement('div');
  el.className = 'vintage-book-item';
  el.title = `Click to open: "${book.title}" by ${book.author || 'Unknown'} (${book.year || 'Unknown Year'})`;
  
  // Choose consistent cover theme based on title characters
  const themeIndex = (book.title.length + index) % COVER_THEMES.length;
  const coverTheme = COVER_THEMES[themeIndex];

  // Slight height variation for natural look
  const spineHeight = 135 + ((book.title.length * 3) % 15);
  el.style.height = `${spineHeight}px`;

  el.innerHTML = `
    <div class="book-spine ${coverTheme}">
      <div class="spine-rib-top"></div>
      <div class="spine-title-container">
        <span class="spine-vertical-title">${escapeHtml(book.title)}</span>
      </div>
      <div class="spine-year-stamp">${book.year || '1984'}</div>
      <div class="spine-rib-bottom"></div>
    </div>
    <div class="spine-ribbon-tag"></div>
  `;

  el.addEventListener('click', () => {
    openReadingDesk(book);
  });

  return el;
}

// ==========================================================================
// MODAL: THE CURATOR'S READING DESK
// ==========================================================================
function openReadingDesk(book) {
  activeBookModal = book;
  const modal = document.getElementById('reading-desk-modal');
  if (!modal) return;

  document.getElementById('modal-book-title').textContent = book.title || 'Untitled Book';
  document.getElementById('modal-book-author').textContent = book.author || 'Author Unknown';
  document.getElementById('modal-book-year').textContent = book.year || 'Unknown';
  document.getElementById('modal-book-id').textContent = book._id ? `#${book._id.toString().slice(-8)}` : '#84-Standard';
  document.getElementById('modal-accession-no').textContent = `CAT. NO. 84-${Math.floor(1000 + Math.random() * 9000)}`;

  const genresContainer = document.getElementById('modal-book-genres');
  genresContainer.innerHTML = '';
  if (Array.isArray(book.genres) && book.genres.length > 0) {
    book.genres.forEach(g => {
      const tag = document.createElement('span');
      tag.className = 'wax-seal-tag';
      tag.textContent = g;
      genresContainer.appendChild(tag);
    });
  } else if (book.genres) {
    const tag = document.createElement('span');
    tag.className = 'wax-seal-tag';
    tag.textContent = book.genres;
    genresContainer.appendChild(tag);
  } else {
    genresContainer.innerHTML = '<span class="micro-body">General Literature</span>';
  }

  modal.classList.add('active');
}

function closeReadingDesk() {
  const modal = document.getElementById('reading-desk-modal');
  if (modal) modal.classList.remove('active');
  activeBookModal = null;
}

// ==========================================================================
// INITIAL ARCHIVE DATA LOAD
// ==========================================================================
async function loadMasterLibrary() {
  try {
    // Endpoint #10: Find books by year range (wide span 0 to 3000 to fetch entire catalog)
    const res = await apiRequest('/books/year?from=0&to=3000');
    if (res.data) {
      allShelvedBooks = res.data;
      renderBookshelf(allShelvedBooks);
      renderCuratorResults(allShelvedBooks, "All Books on the Shelf");
      document.getElementById('press-status-text').textContent = "Connected & Live";
    }
  } catch (err) {
    document.getElementById('press-status-text').textContent = "Connecting...";
  }
}

// ==========================================================================
// SECTION 1: ADD & EDIT BOOKS (POST /books, BATCH, PATCH, DELETE)
// ==========================================================================

// Endpoint #6: Inscribe Single Book (POST /books)
function setupSingleBookForm() {
  const form = document.getElementById('form-single-book');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const year = Number(document.getElementById('book-year').value.trim());
    const rawGenres = document.getElementById('book-genres').value.trim();
    
    const genres = rawGenres ? rawGenres.split(',').map(g => g.trim()).filter(Boolean) : ["General"];

    try {
      const payload = { title, author: author || "Unknown", year: year || 1984, genres };
      const res = await apiRequest('/books', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      dispatchTelegraph("Book Added", `“${title}” has been put on the bookshelf.`);
      form.reset();
      document.getElementById('book-year').value = '1984';
      await loadMasterLibrary();
    } catch (err) {
      // Error handled by apiRequest
    }
  });
}

// Endpoint #7: Batch Inscribe Estate (POST /books/batch)
function setupBatchEstate() {
  const previewBox = document.getElementById('batch-preview-container');
  const btn1980s = document.getElementById('btn-preset-1980s');
  const btnClassics = document.getElementById('btn-preset-classics');
  const btnExecute = document.getElementById('btn-execute-batch');

  function renderPreview() {
    const list = ESTATE_PRESETS[currentEstatePreset];
    previewBox.innerHTML = list.map(b => 
      `• “${escapeHtml(b.title)}” by ${escapeHtml(b.author)} (${b.year}) [${b.genres.join(', ')}]`
    ).join('<br>');
  }

  btn1980s.addEventListener('click', () => {
    currentEstatePreset = '1980s';
    btn1980s.classList.add('active');
    btnClassics.classList.remove('active');
    renderPreview();
  });

  btnClassics.addEventListener('click', () => {
    currentEstatePreset = 'classics';
    btnClassics.classList.add('active');
    btn1980s.classList.remove('active');
    renderPreview();
  });

  btnExecute.addEventListener('click', async () => {
    const list = ESTATE_PRESETS[currentEstatePreset];
    try {
      const res = await apiRequest('/books/batch', {
        method: 'POST',
        body: JSON.stringify(list)
      });
      const count = res.data?.insertedCount || list.length;
      dispatchTelegraph("Collection Added", `Added ${count} books to the shelf at once.`);
      await loadMasterLibrary();
    } catch (err) {
      // Error handled
    }
  });

  renderPreview();
}

// Endpoint #8: Update Book by Title (PATCH /books/:title)
function setupUpdateBookForm() {
  const form = document.getElementById('form-update-book');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('update-target-title').value.trim();
    const newYear = Number(document.getElementById('update-new-year').value.trim());

    if (!title) return;

    try {
      const res = await apiRequest(`/books/${encodeURIComponent(title)}`, {
        method: 'PATCH',
        body: JSON.stringify({ year: newYear })
      });

      dispatchTelegraph("Year Updated", `Book “${title}” release year changed to ${newYear}.`);
      await loadMasterLibrary();
    } catch (err) {
      // Error handled
    }
  });
}

// Endpoint #15: Delete Books Before Year (DELETE /books/before-year)
function setupDeleteBeforeYearForm() {
  const form = document.getElementById('form-delete-before');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const year = Number(document.getElementById('delete-cutoff-year').value.trim());
    if (isNaN(year)) return;

    if (!confirm(`Are you sure you want to delete all books published before year ${year}?`)) {
      return;
    }

    try {
      const res = await apiRequest(`/books/before-year?year=${year}`, {
        method: 'DELETE'
      });
      const count = res.data?.deletedCount ?? 0;
      dispatchTelegraph("Books Deleted", `Successfully removed ${count} old books published before ${year}.`);
      await loadMasterLibrary();
    } catch (err) {
      // Error handled
    }
  });
}

// ==========================================================================
// SECTION 2: SEARCH & FILTER
// ==========================================================================

// Endpoint #9: Find Book by Title (GET /books/title?title=...)
function setupSearchTitleForm() {
  const form = document.getElementById('form-search-title');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('search-title-input').value.trim();
    if (!title) return;

    try {
      const res = await apiRequest(`/books/title?title=${encodeURIComponent(title)}`);
      if (res.data) {
        renderCuratorResults([res.data], `Search Result: “${title}”`);
        dispatchTelegraph("Book Found", `Found details for “${title}”.`);
      } else {
        renderCuratorResults([], `Search Result: “${title}”`);
        dispatchTelegraph("Not Found", `No book with title “${title}” found.`);
      }
    } catch (err) {
      // Handled
    }
  });
}

// Endpoint #10: Find Books by Year Range (GET /books/year?from=...&to=...)
function setupSearchYearForm() {
  const form = document.getElementById('form-search-year');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('year-from').value.trim();
    const to = document.getElementById('year-to').value.trim();

    try {
      const res = await apiRequest(`/books/year?from=${from}&to=${to}`);
      renderCuratorResults(res.data || [], `Books Between ${from} and ${to}`);
      dispatchTelegraph("Year Filter", `Found ${(res.data || []).length} books from ${from} to ${to}.`);
    } catch (err) {
      // Handled
    }
  });
}

// Endpoint #11: Find Books by Genre (GET /books/genre?genre=...)
function setupSearchGenreForm() {
  const form = document.getElementById('form-search-genre');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const genre = document.getElementById('search-genre-select').value;

    try {
      const res = await apiRequest(`/books/genre?genre=${encodeURIComponent(genre)}`);
      renderCuratorResults(res.data || [], `Category: ${genre}`);
      dispatchTelegraph("Category Filter", `Found ${(res.data || []).length} books under ${genre}.`);
    } catch (err) {
      // Handled
    }
  });
}

// Endpoint #12: Curator's Reserve (GET /books/skip-limit)
// Endpoint #13: Integer Year (GET /books/year-integer)
// Endpoint #14: Sanctuary / Exclude Genres (GET /books/exclude-genres?genres=...)
function setupSpecialCuratorButtons() {
  const btnReserve = document.getElementById('btn-curator-reserve');
  const btnInteger = document.getElementById('btn-curator-integer');
  const btnSanctuary = document.getElementById('btn-curator-sanctuary');
  const btnShowAll = document.getElementById('btn-show-all-books');

  // Skip 2, Limit 3
  btnReserve.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/books/skip-limit');
      renderCuratorResults(res.data || [], "Special Pick (Skip First 2, Show Next 3 Books)");
      dispatchTelegraph("Special Pick", "Skipped 2 newest books and loaded the next 3 books.");
    } catch (err) {}
  });

  // Integer year type
  btnInteger.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/books/year-integer');
      renderCuratorResults(res.data || [], "Books with Number Years (Integer Format)");
      dispatchTelegraph("Year Check", `Found ${(res.data || []).length} books with verified number years.`);
    } catch (err) {}
  });

  // Exclude Horror, Science Fiction
  btnSanctuary.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/books/exclude-genres?genres=Horror,Science Fiction');
      renderCuratorResults(res.data || [], "Peaceful Books Only (No Horror & No Sci-Fi)");
      dispatchTelegraph("Peaceful Filter", `Found ${(res.data || []).length} calm books.`);
    } catch (err) {}
  });

  btnShowAll.addEventListener('click', () => {
    renderCuratorResults(allShelvedBooks, "All Books on the Shelf");
  });
}

function renderCuratorResults(books, label) {
  const titleEl = document.getElementById('curator-results-title');
  const stampEl = document.getElementById('curator-results-stamp');
  const grid = document.getElementById('curator-results-grid');

  if (titleEl) titleEl.textContent = label;
  if (stampEl) stampEl.textContent = `${books.length} Books Found`;
  if (!grid) return;

  grid.innerHTML = '';
  if (books.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 30px; text-align: center; font-style: italic; color: var(--color-ink-muted);">
        No books found matching this filter.
      </div>
    `;
    return;
  }

  books.forEach(b => {
    const card = document.createElement('div');
    card.className = 'folio-catalog-card';
    const genresList = Array.isArray(b.genres) ? b.genres : (b.genres ? [b.genres] : []);
    
    card.innerHTML = `
      <div>
        <div class="card-callout-stamp">BOOK</div>
        <h4 class="card-book-title">${escapeHtml(b.title)}</h4>
        <div class="card-book-author">by ${escapeHtml(b.author || 'Unknown')}</div>
        <div class="card-tags-list">
          ${genresList.map(g => `<span class="card-genre-pill">${escapeHtml(g)}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer-info">
        <span class="card-year-stamp">Year: ${b.year || '—'}</span>
        <button class="broadsheet-action-btn text-only btn-read-card" type="button">Open Book &rarr;</button>
      </div>
    `;

    card.querySelector('.btn-read-card').addEventListener('click', () => {
      openReadingDesk(b);
    });

    grid.appendChild(card);
  });
}

// ==========================================================================
// SECTION 3: BOOK REPORTS & ANALYTICS (Aggregations)
// ==========================================================================

let activeStudy = 'agg-modern';

function setupGazetteStudies() {
  const tabs = document.querySelectorAll('.gazette-tab');
  const btnRun = document.getElementById('btn-run-study');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeStudy = tab.dataset.study;
      updateStudyView();
    });
  });

  btnRun.addEventListener('click', () => {
    executeCurrentStudy();
  });

  updateStudyView();
}

function updateStudyView() {
  const tagEl = document.getElementById('study-tag');
  const titleEl = document.getElementById('study-title');
  const descEl = document.getElementById('study-description');
  const controlsEl = document.getElementById('study-controls');

  if (activeStudy === 'agg-modern') {
    tagEl.textContent = "CHRONOLOGICAL REPORT";
    titleEl.textContent = "Modern Books Report (Post-2000)";
    descEl.textContent = "Shows books published after the chosen year, sorted from newest to oldest.";
    controlsEl.style.display = 'flex';
  } else if (activeStudy === 'agg-projection') {
    tagEl.textContent = "SIMPLE SUMMARY";
    titleEl.textContent = "Clean Book Summary List";
    descEl.textContent = "Shows clean list of Title, Author, and Year only without extra IDs.";
    controlsEl.style.display = 'flex';
  } else if (activeStudy === 'agg-unwind') {
    tagEl.textContent = "CATEGORY BREAKDOWN";
    titleEl.textContent = "Books by Individual Category";
    descEl.textContent = "Splits books with multiple categories into separate cards per category.";
    controlsEl.style.display = 'none';
  } else if (activeStudy === 'agg-provenance') {
    tagEl.textContent = "HISTORY & AUDIT LOGS";
    titleEl.textContent = "Books Connected to History Logs";
    descEl.textContent = "Shows each book together with all its activity logs using MongoDB $lookup.";
    controlsEl.style.display = 'none';
  }

  executeCurrentStudy();
}

async function executeCurrentStudy() {
  const viewport = document.getElementById('study-results-viewport');
  const year = document.getElementById('study-year-input').value || 2000;
  viewport.innerHTML = '<div class="bookshelf-loading-placeholder"><span class="quill-spinner"></span> Loading report...</div>';

  try {
    let data;
    if (activeStudy === 'agg-modern') {
      // Endpoint #16: Aggregate books after year (GET /books/aggregate-1?year=...)
      const res = await apiRequest(`/books/aggregate-1?year=${year}`);
      data = res.data;
      renderModernStudy(data);
    } else if (activeStudy === 'agg-projection') {
      // Endpoint #17: Aggregate projection (GET /books/aggregate-2?year=...)
      const res = await apiRequest(`/books/aggregate-2?year=${year}`);
      data = res.data;
      renderProjectionStudy(data);
    } else if (activeStudy === 'agg-unwind') {
      // Endpoint #18: Aggregate unwind (GET /books/aggregate-3)
      const res = await apiRequest('/books/aggregate-3');
      data = res.data;
      renderUnwindStudy(data);
    } else if (activeStudy === 'agg-provenance') {
      // Endpoint #19: Aggregate lookup logs (GET /books/aggregate-4)
      const res = await apiRequest('/books/aggregate-4');
      data = res.data;
      renderProvenanceStudy(data);
    }
  } catch (err) {
    viewport.innerHTML = `<div style="padding: 20px; color: var(--color-wax-seal);">Could not load report: ${escapeHtml(err.message)}</div>`;
  }
}

function renderModernStudy(data) {
  const viewport = document.getElementById('study-results-viewport');
  if (!data || data.length === 0) {
    viewport.innerHTML = '<div style="padding: 20px; font-style: italic;">No books found after this year.</div>';
    return;
  }

  viewport.innerHTML = `
    <table class="parchment-ledger-table">
      <thead>
        <tr>
          <th>YEAR</th>
          <th>BOOK TITLE</th>
          <th>AUTHOR</th>
          <th>CATEGORIES</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(b => `
          <tr>
            <td><strong>${b.year}</strong></td>
            <td><strong>${escapeHtml(b.title)}</strong></td>
            <td>${escapeHtml(b.author || '—')}</td>
            <td>${Array.isArray(b.genres) ? b.genres.join(', ') : (b.genres || '—')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderProjectionStudy(data) {
  const viewport = document.getElementById('study-results-viewport');
  if (!data || data.length === 0) {
    viewport.innerHTML = '<div style="padding: 20px; font-style: italic;">No books found.</div>';
    return;
  }

  viewport.innerHTML = `
    <table class="parchment-ledger-table">
      <thead>
        <tr>
          <th>BOOK TITLE</th>
          <th>AUTHOR</th>
          <th>YEAR</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(b => `
          <tr>
            <td>“${escapeHtml(b.title)}”</td>
            <td>${escapeHtml(b.author || '—')}</td>
            <td><span class="chip-value">${b.year}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderUnwindStudy(data) {
  const viewport = document.getElementById('study-results-viewport');
  if (!data || data.length === 0) {
    viewport.innerHTML = '<div style="padding: 20px; font-style: italic;">No categories found.</div>';
    return;
  }

  viewport.innerHTML = `
    <table class="parchment-ledger-table">
      <thead>
        <tr>
          <th>CATEGORY</th>
          <th>BOOK TITLE</th>
          <th>AUTHOR</th>
          <th>YEAR</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(b => `
          <tr>
            <td><span class="wax-seal-tag">${escapeHtml(b.genres || 'General')}</span></td>
            <td><strong>${escapeHtml(b.title)}</strong></td>
            <td>${escapeHtml(b.author || '—')}</td>
            <td>${b.year || '—'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderProvenanceStudy(data) {
  const viewport = document.getElementById('study-results-viewport');
  if (!data || data.length === 0) {
    viewport.innerHTML = '<div style="padding: 20px; font-style: italic;">No books found.</div>';
    return;
  }

  viewport.innerHTML = data.map(b => {
    const logs = Array.isArray(b.logs) ? b.logs : [];
    return `
      <div class="provenance-folio-card">
        <div class="provenance-card-head">
          <h4 class="card-book-title">“${escapeHtml(b.title)}” <small style="font-weight:normal; font-size:0.85rem; color:var(--color-ink-muted)">by ${escapeHtml(b.author || 'Unknown')} (${b.year})</small></h4>
          <span class="card-callout-stamp">${logs.length} LOGS</span>
        </div>
        
        <div class="provenance-logs-history">
          ${logs.length > 0 ? logs.map(l => `
            <div class="log-entry-row">
              <span class="log-action-tag">[${escapeHtml(l.action || 'EVENT')}]</span>
              <span>${escapeHtml(l.timestamp ? new Date(l.timestamp).toLocaleDateString() : 'Recorded')}</span>
              <span>&mdash;</span>
              <span>${escapeHtml(l.notes || l.bookTitle || 'Library Activity')}</span>
            </div>
          `).join('') : '<div style="color:var(--color-ink-muted); font-style:italic">No activity logs recorded for this book yet.</div>'}
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// SECTION 4: SYSTEM SETUP & LOG JOURNAL
// ==========================================================================

function setupGuildGovernance() {
  // Endpoint #1: Create Books Collection (POST /collection/books)
  const btnBooks = document.getElementById('btn-charter-books');
  btnBooks.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/collection/books', { method: 'POST' });
      dispatchTelegraph("Setup Complete", "Books table created with title rule.");
    } catch (err) {}
  });

  // Endpoint #3: Create Capped Logs Collection (POST /collection/logs/capped)
  const btnLogs = document.getElementById('btn-charter-logs');
  btnLogs.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/collection/logs/capped', { method: 'POST' });
      dispatchTelegraph("Setup Complete", "1MB capped logs table created.");
    } catch (err) {}
  });

  // Endpoint #4: Create Title Index (POST /collection/books/index)
  const btnIndex = document.getElementById('btn-charter-index');
  btnIndex.addEventListener('click', async () => {
    try {
      const res = await apiRequest('/collection/books/index', { method: 'POST' });
      dispatchTelegraph("Index Ready", "Fast title search index created.");
    } catch (err) {}
  });

  // Endpoint #2: Create Author (POST /collection/authors)
  const authorForm = document.getElementById('form-author-register');
  authorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('author-name').value.trim();
    const era = document.getElementById('author-era').value.trim();
    const distinction = document.getElementById('author-distinction').value.trim();

    try {
      const res = await apiRequest('/collection/authors', {
        method: 'POST',
        body: JSON.stringify({ name, era, distinction })
      });
      dispatchTelegraph("Author Saved", `Author “${name}” enrolled successfully.`);
      authorForm.reset();
      document.getElementById('author-name').value = "Naguib Mahfouz";
      document.getElementById('author-era').value = "1911–2006";
      document.getElementById('author-distinction').value = "Nobel Laureate in Literature";
    } catch (err) {}
  });

  // Endpoint #5: Create Log (POST /logs)
  const logForm = document.getElementById('form-create-log');
  logForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const action = document.getElementById('log-action').value;
    const bookTitle = document.getElementById('log-book-title').value.trim();
    const notes = document.getElementById('log-notes').value.trim();

    try {
      const res = await apiRequest('/logs', {
        method: 'POST',
        body: JSON.stringify({
          action,
          bookTitle,
          notes,
          timestamp: new Date().toISOString()
        })
      });
      dispatchTelegraph("Log Saved", `Archived event [${action}] for “${bookTitle}”.`);
      logForm.reset();
      document.getElementById('log-book-title').value = "Brave New World";
      document.getElementById('log-notes').value = "Checked by librarian and placed on top shelf.";
    } catch (err) {}
  });
}

// ==========================================================================
// TABS & MODAL INTERACTION
// ==========================================================================
function setupTabNavigation() {
  const tabs = document.querySelectorAll('.department-tab-btn');
  const panels = document.querySelectorAll('.department-content-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

function setupModalButtons() {
  const closeBtn = document.getElementById('btn-close-desk');
  const modal = document.getElementById('reading-desk-modal');
  const btnAmend = document.getElementById('modal-btn-amend');
  const btnLookupLogs = document.getElementById('modal-btn-lookup-logs');

  if (closeBtn) closeBtn.addEventListener('click', closeReadingDesk);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeReadingDesk();
    });
  }

  // Quick Amend from modal
  if (btnAmend) {
    btnAmend.addEventListener('click', () => {
      if (!activeBookModal) return;
      const newYear = prompt(`Enter new release year for “${activeBookModal.title}”:`, activeBookModal.year || 2024);
      if (newYear && !isNaN(Number(newYear))) {
        apiRequest(`/books/${encodeURIComponent(activeBookModal.title)}`, {
          method: 'PATCH',
          body: JSON.stringify({ year: Number(newYear) })
        }).then(() => {
          dispatchTelegraph("Year Updated", `Book “${activeBookModal.title}” updated to ${newYear}.`);
          activeBookModal.year = Number(newYear);
          document.getElementById('modal-book-year').textContent = newYear;
          loadMasterLibrary();
        });
      }
    });
  }

  // Quick Lookup Logs from modal
  if (btnLookupLogs) {
    btnLookupLogs.addEventListener('click', () => {
      if (!activeBookModal) return;
      closeReadingDesk();
      // Switch to Section 3 and open Tab 4 (Logs Join)
      const tabDept3 = document.querySelector('[data-tab="dept-broadsheet"]');
      if (tabDept3) tabDept3.click();
      const tabStudy4 = document.querySelector('[data-study="agg-provenance"]');
      if (tabStudy4) tabStudy4.click();
    });
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupTabNavigation();
  setupSingleBookForm();
  setupBatchEstate();
  setupUpdateBookForm();
  setupDeleteBeforeYearForm();
  setupSearchTitleForm();
  setupSearchYearForm();
  setupSearchGenreForm();
  setupSpecialCuratorButtons();
  setupGazetteStudies();
  setupGuildGovernance();
  setupModalButtons();

  const btnRefresh = document.getElementById('btn-refresh-all');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      loadMasterLibrary();
      dispatchTelegraph("Shelf Refreshed", "Loaded latest books from database.");
    });
  }

  // Load initial data
  loadMasterLibrary();
});
