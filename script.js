const categoryList = document.getElementById("categoryList");
const contentHeader = document.getElementById("contentHeader");
const contentGrid = document.getElementById("contentGrid");
const searchInput = document.getElementById("resourceSearch");

let selectedIndex = 0;
let currentView = "category";
let currentItems = [];
let currentParentTitle = "";

function normalizeRoute(hash) {
  return (hash || window.location.hash).replace(/^#\/?/, "");
}

function findItemByLink(link) {
  return knowledgeBase.flatMap((category) => category.items).find((item) => item.link === link);
}

function navigateTo(link, title, summary) {
  const hash = `#${link}`;
  if (window.location.hash === hash) {
    loadDocument(link, title, summary);
  } else {
    window.location.hash = link;
  }
}

function renderCategoryButtons() {
  categoryList.innerHTML = "";
  knowledgeBase.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = category.label;
    button.addEventListener("click", () => selectCategory(index));
    categoryList.appendChild(button);
  });
}

function renderHomeDashboard() {
  contentGrid.classList.remove("resource-view");
  contentHeader.style.display = "block";
  contentHeader.innerHTML = `
    <h2>Welcome to your Pilates teaching hub</h2>
    <p>Jump quickly to class plans, exercise series, and foundational teaching principles.</p>
  `;

  contentGrid.innerHTML = "";

  const heroCard = document.createElement("article");
  heroCard.className = "card hero-card";
  heroCard.innerHTML = `
    <h2>Build better classes with clear, searchable teaching resources</h2>
    <p>Use this dashboard to move from theory to exercise selection and class programming with less friction.</p>
  `;
  contentGrid.appendChild(heroCard);

  const sectionGrid = document.createElement("div");
  sectionGrid.className = "section-grid";

  knowledgeBase.forEach((section) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${section.label}</h3>
      <p>${section.description}</p>
      <button data-section-index="${knowledgeBase.indexOf(section)}">Open section</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      selectCategory(knowledgeBase.indexOf(section));
    });

    sectionGrid.appendChild(card);
  });

  contentGrid.appendChild(sectionGrid);
}

function renderItems(items, title, description, options = {}) {
  contentGrid.classList.remove("resource-view");
  contentHeader.style.display = "block";
  contentHeader.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;

  contentGrid.innerHTML = "";

  const filteredItems = getFilteredItems(items);

  if (!filteredItems.length) {
    const emptyState = document.createElement("article");
    emptyState.className = "card empty-state";
    emptyState.innerHTML = `<p>No matches for that search.</p>`;
    contentGrid.appendChild(emptyState);
    return;
  }

  filteredItems.forEach((item) => {
    const card = document.createElement("article");
    const isSingleCardView = filteredItems.length === 1;
    card.className = `card${isSingleCardView ? " single-card-full" : ""}`;
    const hasChildren = Array.isArray(item.children) && item.children.length;
    const actionLabel = hasChildren
      ? "View lessons"
      : options.sectionKey === "exercise-library"
        ? "View Exercise"
        : options.sectionKey === "lessons"
          ? "View lesson"
          : "View resource";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      ${hasChildren ? '<button class="resource-link" type="button">' + actionLabel + '</button>' : '<a href="#' + (item.link || "") + '" class="resource-link">' + actionLabel + '</a>'}
    `;

    const action = card.querySelector(".resource-link");
    action.addEventListener("click", (event) => {
      event.preventDefault();
      if (hasChildren) {
        renderLessonChoices(item.children, item.title);
      } else {
        navigateTo(item.link, item.title, item.summary);
      }
    });

    contentGrid.appendChild(card);
  });
}

function renderLessonChoices(items, parentTitle) {
  currentView = "children";
  currentItems = items;
  currentParentTitle = parentTitle;
  renderItems(items, parentTitle, "Select a lesson to open it.", { sectionKey: "lessons" });
}

function selectCategory(index) {
  selectedIndex = index;
  currentView = "category";
  const selected = knowledgeBase[index];
  const buttons = document.querySelectorAll(".category-button");
  buttons.forEach((button, idx) => button.classList.toggle("active", idx === index));

  currentItems = selected.items;
  currentParentTitle = selected.label;
  renderItems(selected.items, selected.label, selected.description, {
    useExerciseLabel: selected.key === "exercise-library",
    sectionKey: selected.key,
  });
}

function buildResourceUrl(link) {
  const [path, hash] = link.split("#");
  const separator = path.includes("?") ? "&" : "?";
  const cacheBuster = `${separator}v=${Date.now()}`;

  return hash ? `${path}${cacheBuster}#${hash}` : `${path}${cacheBuster}`;
}

function loadDocument(link, title, summary) {
  contentGrid.classList.add("resource-view");
  const pageTitle = title || "Resource";
  const pageDescription = summary || "";
  const descriptionMarkup = pageDescription ? `<p>${pageDescription}</p>` : "";

  contentHeader.style.display = "block";
  contentHeader.innerHTML = `
    <h2>${pageTitle}</h2>
    ${descriptionMarkup}
  `;

  contentGrid.innerHTML = "";

  const wrapper = document.createElement("article");
  wrapper.className = "card resource-card";
  contentGrid.appendChild(wrapper);

  if (link && link.startsWith("docs/")) {
    fetchResourceDocument(link, wrapper);
    return;
  }

  const frameContainer = document.createElement("div");
  frameContainer.className = "single-resource-frame";

  const iframe = document.createElement("iframe");
  iframe.className = "resource-iframe";
  iframe.src = buildResourceUrl(link);
  iframe.title = pageTitle;

  frameContainer.appendChild(iframe);
  wrapper.appendChild(frameContainer);
}

async function fetchResourceDocument(link, wrapper) {
  const resourceUrl = buildResourceUrl(link);
  try {
    const response = await fetch(resourceUrl);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const header = doc.querySelector("header.site-header");
    if (header) header.remove();

    const appShell = doc.querySelector("main.app-shell");
    if (appShell) {
      const contentPanel = appShell.querySelector(".content-panel");
      if (contentPanel) {
        Array.from(contentPanel.childNodes).forEach((node) => {
          wrapper.appendChild(document.importNode(node, true));
        });
      }
    } else {
      Array.from(doc.body.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          wrapper.appendChild(document.importNode(node, true));
        }
      });
    }

    const bodyCard = wrapper.querySelector("article.card.hero-card");
    if (bodyCard) {
      Array.from(bodyCard.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          wrapper.insertBefore(document.importNode(node, true), bodyCard);
        }
      });
      bodyCard.remove();
    }

    const nestedShell = wrapper.querySelector("main.app-shell");
    if (nestedShell) {
      const innerPanel = nestedShell.querySelector(".content-panel");
      if (innerPanel) {
        Array.from(innerPanel.childNodes).forEach((node) => {
          wrapper.appendChild(document.importNode(node, true));
        });
      }
      nestedShell.remove();
    }
  } catch (error) {
    console.error("Error loading resource document:", error);
    contentGrid.innerHTML = `<div class="card empty-state"><p>Unable to load this document.</p></div>`;
  }
}

function getFilteredItems(items) {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) return items;

  return items.filter((item) => {
    const haystack = `${item.title} ${item.summary}`.toLowerCase();
    return haystack.includes(term);
  });
}

function handleRoute() {
  const route = normalizeRoute(window.location.hash);
  if (!route) {
    selectCategory(0);
    return;
  }

  const item = findItemByLink(route);
  if (item) {
    loadDocument(item.link, item.title, item.summary);
  } else {
    loadDocument(route, "Resource", "");
  }
}

searchInput.addEventListener("input", () => {
  if (currentView === "children") {
    renderLessonChoices(getFilteredItems(currentItems), currentParentTitle);
  } else {
    selectCategory(selectedIndex);
  }
});

window.addEventListener("hashchange", handleRoute);

renderCategoryButtons();
handleRoute();
