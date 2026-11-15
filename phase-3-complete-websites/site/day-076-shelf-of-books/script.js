const books = [
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", year: 1967, category: "Fiction", score: "4.42", width: 58, height: 520, color: "#68a9b6", ink: "#18383e", band: "#d2cbc1" },
  { title: "The Medium is the Message", author: "Marshall McLuhan", year: 1967, category: "Theory", score: "4.08", width: 47, height: 505, color: "#91aec7", ink: "#f3eadb", band: "#23486f" },
  { title: "To Live", author: "Yu Hua", year: 1992, category: "Fiction", score: "4.38", width: 31, height: 526, color: "#e8e5dc", ink: "#222", band: "#bf1830", tilt: "-0.4deg" },
  { title: "The Creative Act", author: "Rick Rubin", year: 2023, category: "Philosophy", score: "4.21", width: 46, height: 568, color: "#d2cdc0", ink: "#171717", band: "#242424" },
  { title: "The Anatomy of Story", author: "John Truby", year: 2007, category: "Theory", score: "4.35", width: 55, height: 474, color: "#324c61", ink: "#d7c8a6", band: "#1c2c3a" },
  { title: "George Orwell Essays", author: "George Orwell", year: 1946, category: "Theory", score: "4.18", width: 45, height: 510, color: "#17434d", ink: "#b5c0b0", band: "#c2a96a" },
  { title: "Vinyl: Album Cover Art", author: "Aubrey Powell", year: 2017, category: "Visual Arts", score: "4.47", width: 72, height: 675, color: "#dedbd2", ink: "#151515", band: "#efefeb" },
  { title: "The Package Design Book", author: "Julius Wiedemann", year: 2017, category: "Visual Arts", score: "4.12", width: 86, height: 548, color: "#d3b94f", ink: "#423410", band: "#c89c1e" },
  { title: "The History of Graphic Design", author: "Jens Müller", year: 2022, category: "Visual Arts", score: "4.65", width: 71, height: 610, color: "#d4d1ca", ink: "#171717", band: "#df492c" },
  { title: "The Graphic Design Bible", author: "Theo Inglis", year: 2023, category: "Visual Arts", score: "4.34", width: 56, height: 558, color: "#d84735", ink: "#f2e4d4", band: "#542525" },
  { title: "Tesla vs Edison", author: "Joel Martin", year: 2020, category: "Science", score: "3.94", width: 56, height: 506, color: "#306278", ink: "#c1d1ce", band: "#d0bd91" },
  { title: "Design Thinking", author: "Tim Brown", year: 2019, category: "Visual Arts", score: "4.06", width: 43, height: 515, color: "#d6d3c4", ink: "#32372c", band: "#222" },
  { title: "Sea & Myth", author: "M. Gürbüz Beydiz", year: 2021, category: "Sociology", score: "4.22", width: 77, height: 560, color: "#0f2837", ink: "#527a88", band: "#081921" },
  { title: "The Social Animal", author: "Elliot Aronson", year: 2018, category: "Psychology", score: "4.11", width: 78, height: 624, color: "#e0ded4", ink: "#286c55", band: "#0e6654" },
  { title: "Sophie's World", author: "Jostein Gaarder", year: 1991, category: "Philosophy", score: "4.39", width: 75, height: 514, color: "#9c405b", ink: "#3e1724", band: "#7e2b45" },
  { title: "A Traveler's Notes", author: "İlber Ortaylı", year: 2017, category: "Sociology", score: "3.81", width: 42, height: 535, color: "#db5262", ink: "#f7ddd0", band: "#f7c6b1", tilt: "0.35deg" },
  { title: "The Artist's Way", author: "Julia Cameron", year: 1992, category: "Psychology", score: "4.17", width: 60, height: 548, color: "#c2cac6", ink: "#4e6b70", band: "#8eadad" },
  { title: "The Interpretation of Dreams", author: "Sigmund Freud", year: 1899, category: "Psychology", score: "4.08", width: 78, height: 494, color: "#d28b50", ink: "#f5dfbb", band: "#37889b" },
  { title: "Twilight of the Idols", author: "Friedrich Nietzsche", year: 1889, category: "Philosophy", score: "4.24", width: 38, height: 520, color: "#e4e2dd", ink: "#222", band: "#272727" },
  { title: "Deep Work", author: "Cal Newport", year: 2016, category: "Psychology", score: "4.48", width: 48, height: 566, color: "#e6dcd7", ink: "#272326", band: "#dd9fa5" },
  { title: "Principles of Logo Design", author: "George Bokhua", year: 2022, category: "Visual Arts", score: "4.07", width: 70, height: 658, color: "#282828", ink: "#777", band: "#111" },
  { title: "What Is Political Philosophy?", author: "Leo Strauss", year: 1959, category: "Philosophy", score: "4.26", width: 55, height: 520, color: "#d2d0c9", ink: "#232323", band: "#252525" },
  { title: "Plato and a Platypus", author: "Cathcart & Klein", year: 2007, category: "Philosophy", score: "4.01", width: 46, height: 500, color: "#7d3a24", ink: "#d7af91", band: "#5a2417" },
  { title: "The Pythagorean Legacy", author: "Marcel Danesi", year: 2021, category: "Science", score: "4.31", width: 45, height: 546, color: "#ddd9cb", ink: "#383327", band: "#bdc0aa" },
  { title: "A Clockwork Orange", author: "Anthony Burgess", year: 1962, category: "Science Fiction", score: "4.02", width: 44, height: 505, color: "#e9dcd3", ink: "#b83b4b", band: "#ab1f35" },
  { title: "Middle East Mythology", author: "Yavuz Kalkan", year: 2023, category: "Sociology", score: "3.91", width: 33, height: 512, color: "#afa58c", ink: "#4c4030", band: "#83745a" },
  { title: "Death at Intervals", author: "José Saramago", year: 2005, category: "Fiction", score: "4.19", width: 51, height: 512, color: "#c4af79", ink: "#322d22", band: "#a87f44" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, category: "Fiction", score: "4.16", width: 40, height: 554, color: "#2b2a27", ink: "#78736b", band: "#111" },
  { title: "Modern Art and the Idea", author: "Herbert Read", year: 1968, category: "Visual Arts", score: "4.13", width: 53, height: 520, color: "#bea884", ink: "#7b527b", band: "#a49171" },
  { title: "Mythology 101", author: "Kathleen Sears", year: 2014, category: "Sociology", score: "4.06", width: 62, height: 527, color: "#c9cfcb", ink: "#4a7075", band: "#83a9ad" },
  { title: "Menu Design in America", author: "Jim Heimann", year: 2011, category: "Visual Arts", score: "4.36", width: 79, height: 710, color: "#eee9d8", ink: "#b54232", band: "#e2c772" },
  { title: "A Brief History of Mathematics", author: "Mickaël Launay", year: 2018, category: "Science", score: "4.27", width: 42, height: 500, color: "#56aab9", ink: "#e4f4ef", band: "#2b7b8e" },
  { title: "Dune", author: "Frank Herbert", year: 1965, category: "Science Fiction", score: "4.61", width: 68, height: 600, color: "#d7793e", ink: "#3f241b", band: "#80aab5" },
  { title: "Do Androids Dream?", author: "Philip K. Dick", year: 1968, category: "Science Fiction", score: "4.33", width: 50, height: 534, color: "#6d3850", ink: "#e4c8d4", band: "#3f2435" },
  { title: "The Selfish Gene", author: "Richard Dawkins", year: 1976, category: "Science", score: "4.44", width: 49, height: 550, color: "#c9904e", ink: "#362516", band: "#81411f" },
  { title: "A Room of One's Own", author: "Virginia Woolf", year: 1929, category: "Theory", score: "4.46", width: 51, height: 510, color: "#c5546d", ink: "#f4d3d8", band: "#8d3048" }
];

const shelf = document.querySelector("#bookshelf");
const library = document.querySelector("#library");
const toggle = document.querySelector(".collection-toggle");
const menu = document.querySelector("#collection-menu");
const popover = document.querySelector("#book-popover");
const visibleCount = document.querySelector("#visible-count");
const collectionStatus = document.querySelector(".collection-status");
const resetButton = document.querySelector("[data-filter-reset]");
let activeBook = null;
let selectedCategory = "All";
let menuTimer;
let statusTimer;

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function searchableLink(book) {
  return `https://openlibrary.org/search?q=${encodeURIComponent(`${book.title} ${book.author}`)}`;
}

function renderShelf() {
  shelf.innerHTML = books
    .map((book, index) => {
      const safeTitle = escapeHtml(book.title);
      const safeAuthor = escapeHtml(book.author);
      return `
        <button
          class="book"
          type="button"
          role="listitem"
          aria-label="${safeTitle} by ${safeAuthor}"
          data-index="${index}"
          data-category="${escapeHtml(book.category)}"
          style="--book-width:${book.width}px;--book-height:${book.height}px;--book-color:${book.color};--book-ink:${book.ink};--band-color:${book.band};--tilt:${book.tilt || "0deg"};--band-top:${11 + ((index * 7) % 28)}%;--band-height:${index % 5 === 0 ? 18 : index % 4 === 0 ? 7 : 3}px;--radius:${index % 6 === 0 ? 7 : 2}px;"
        >
          <span class="book-band" aria-hidden="true"></span>
          <span class="spine-title">${safeTitle}</span>
          <span class="spine-author">${safeAuthor}</span>
          <span class="publisher-mark" aria-hidden="true">SB</span>
        </button>`;
    })
    .join("");

  const nodes = [...shelf.querySelectorAll(".book")];
  nodes.forEach((book, index) => {
    window.setTimeout(() => book.classList.add("is-ready"), 80 + index * 24);
    book.addEventListener("pointerenter", () => showBook(index, book));
    book.addEventListener("focus", () => showBook(index, book));
    book.addEventListener("click", () => {
      if (activeBook === book && popover.classList.contains("is-visible")) {
        hideBook();
      } else {
        showBook(index, book);
      }
    });
  });

  shelf.addEventListener("pointerleave", (event) => {
    if (!popover.contains(event.relatedTarget)) hideBook();
  });
  visibleCount.textContent = String(books.length);
}

function positionPopover(bookElement) {
  const rect = bookElement.getBoundingClientRect();
  const popoverWidth = Math.min(390, window.innerWidth - 32);
  const popoverHeight = popover.offsetHeight || 172;
  const gap = 16;
  const left = Math.min(
    Math.max(16, rect.left + rect.width / 2 - popoverWidth / 2),
    window.innerWidth - popoverWidth - 16
  );
  let top = rect.top + Math.min(80, rect.height * 0.18);
  if (top + popoverHeight > window.innerHeight - 86) {
    top = window.innerHeight - popoverHeight - 86;
  }
  if (window.innerWidth <= 580) return;
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(gap, top)}px`;
}

function showBook(index, bookElement) {
  const book = books[index];
  if (!book || bookElement.classList.contains("is-filtered-out")) return;
  if (activeBook && activeBook !== bookElement) activeBook.classList.remove("is-active");
  activeBook = bookElement;
  bookElement.classList.add("is-active");
  library.classList.add("has-focus");

  popover.querySelector(".popover-category").textContent = book.category;
  popover.querySelector(".popover-title").textContent = book.title;
  popover.querySelector(".popover-author").textContent = book.author;
  popover.querySelector(".popover-year").textContent = book.year;
  popover.querySelector(".popover-rating strong").textContent = `${book.score} / 5`;
  popover.querySelector(".book-link").href = searchableLink(book);
  popover.querySelector(".mini-cover-kicker").textContent = book.category;
  popover.querySelector(".mini-cover-title").textContent = book.title;
  popover.style.setProperty("--cover-one", book.color);
  popover.style.setProperty("--cover-two", book.band);
  popover.setAttribute("aria-hidden", "false");
  positionPopover(bookElement);
  popover.classList.add("is-visible");
}

function hideBook() {
  if (activeBook) activeBook.classList.remove("is-active");
  activeBook = null;
  library.classList.remove("has-focus");
  popover.classList.remove("is-visible");
  popover.setAttribute("aria-hidden", "true");
}

function openMenu() {
  window.clearTimeout(menuTimer);
  menu.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
  library.classList.add("menu-open");
  requestAnimationFrame(() => menu.classList.add("is-visible"));
}

function closeMenu({ focusToggle = false } = {}) {
  toggle.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-visible");
  library.classList.remove("menu-open");
  menuTimer = window.setTimeout(() => {
    menu.hidden = true;
  }, 260);
  if (focusToggle) toggle.focus();
}

function filterBooks(category) {
  selectedCategory = category;
  hideBook();
  let count = 0;
  shelf.querySelectorAll(".book").forEach((book) => {
    const isVisible = category === "All" || book.dataset.category === category;
    book.classList.toggle("is-filtered-out", !isVisible);
    if (isVisible) count += 1;
  });
  visibleCount.textContent = String(count);
  collectionStatus.querySelector("span").textContent = category;
  collectionStatus.classList.add("is-visible");
  window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => collectionStatus.classList.remove("is-visible"), 1800);
  document.querySelectorAll(".filter-option").forEach((option) => {
    option.classList.toggle("is-selected", option.dataset.filter === category);
  });
  if (window.innerWidth <= 900) document.querySelector(".shelf-stage").scrollTo({ left: 0, behavior: "smooth" });
  closeMenu();
}

toggle.addEventListener("click", () => {
  toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
});

document.querySelectorAll(".filter-option").forEach((option) => {
  option.addEventListener("click", () => filterBooks(option.dataset.filter));
});

resetButton.addEventListener("click", () => filterBooks("All"));

document.addEventListener("pointerdown", (event) => {
  if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  if (!shelf.contains(event.target) && !popover.contains(event.target)) hideBook();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideBook();
    if (toggle.getAttribute("aria-expanded") === "true") closeMenu({ focusToggle: true });
  }
});

popover.addEventListener("pointerleave", (event) => {
  if (!shelf.contains(event.relatedTarget)) hideBook();
});

window.addEventListener("resize", () => {
  if (activeBook) positionPopover(activeBook);
});

renderShelf();
