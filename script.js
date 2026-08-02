const categoryList = document.getElementById("categoryList");
const contentHeader = document.getElementById("contentHeader");
const contentGrid = document.getElementById("contentGrid");
const searchInput = document.getElementById("resourceSearch");

const state = {
  selectedIndex: 0,
  currentView: "category",
  currentItems: [],
  currentParentTitle: "",
};

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

function setContentHeader(title, description) {
  contentHeader.style.display = "block";
  contentHeader.innerHTML = `
    <h2>${title}</h2>
    ${description ? `<p>${description}</p>` : ""}
  `;
}

function renderCategoryButtons() {
  categoryList.innerHTML = "";
  knowledgeBase.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.textContent = category.label;
    button.addEventListener("click", () => selectCategory(index));
    categoryList.appendChild(button);
  });
}

function createActionLabel(item, options = {}) {
  if (Array.isArray(item.children) && item.children.length) {
    return "View lessons";
  }

  if (options.sectionKey === "exercise-library") {
    return "View Exercise";
  }

  if (options.sectionKey === "lessons") {
    return "View lesson";
  }

  return "View resource";
}

function createItemCard(item, options = {}) {
  const card = document.createElement("article");
  const hasChildren = Array.isArray(item.children) && item.children.length;
  const actionLabel = createActionLabel(item, options);

  card.className = "card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    ${hasChildren
      ? `<button class="resource-link" type="button">${actionLabel}</button>`
      : `<a href="#${item.link || ""}" class="resource-link">${actionLabel}</a>`}
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

  return card;
}

function renderHomeDashboard() {
  contentGrid.classList.remove("resource-view");
  setContentHeader(
    "Welcome to your Pilates teaching hub",
    "Jump quickly to class plans, exercise series, and foundational teaching principles."
  );

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

  knowledgeBase.forEach((section, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${section.label}</h3>
      <p>${section.description}</p>
      <button class="resource-link" data-section-index="${index}" type="button">Open section</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => selectCategory(index));

    sectionGrid.appendChild(card);
  });

  contentGrid.appendChild(sectionGrid);
}

function renderItems(items, title, description, options = {}) {
  contentGrid.classList.remove("resource-view");
  setContentHeader(title, description);
  contentGrid.innerHTML = "";

  const filteredItems = getFilteredItems(items);

  if (!filteredItems.length) {
    const emptyState = document.createElement("article");
    emptyState.className = "card empty-state";
    emptyState.innerHTML = "<p>No matches for that search.</p>";
    contentGrid.appendChild(emptyState);
    return;
  }

  const isSingleCardView = filteredItems.length === 1;
  filteredItems.forEach((item) => {
    const card = createItemCard(item, options);
    if (isSingleCardView) {
      card.classList.add("single-card-full");
    }
    contentGrid.appendChild(card);
  });
}

function renderLessonChoices(items, parentTitle) {
  state.currentView = "children";
  state.currentItems = items;
  state.currentParentTitle = parentTitle;
  renderItems(items, parentTitle, "Select a lesson to open it.", { sectionKey: "lessons" });
}

function selectCategory(index) {
  state.selectedIndex = index;
  state.currentView = "category";
  const selected = knowledgeBase[index];
  const buttons = document.querySelectorAll(".category-button");
  buttons.forEach((button, idx) => button.classList.toggle("active", idx === index));

  state.currentItems = selected.items;
  state.currentParentTitle = selected.label;
  renderItems(selected.items, selected.label, selected.description, {
    sectionKey: selected.key,
  });
}

function buildResourceUrl(link) {
  const [path, hash] = link.split("#");
  const separator = path.includes("?") ? "&" : "?";
  const cacheBuster = `${separator}v=${Date.now()}`;

  return hash ? `${path}${cacheBuster}#${hash}` : `${path}${cacheBuster}`;
}

function appendNodes(nodes, target) {
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
      target.appendChild(document.importNode(node, true));
    }
  });
}

function loadDocument(link, title, summary) {
  contentGrid.classList.add("resource-view");
  const pageTitle = title || "Resource";
  const pageDescription = summary || "";

  setContentHeader(pageTitle, pageDescription);
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
    if (header) {
      header.remove();
    }

    const appShell = doc.querySelector("main.app-shell");
    if (appShell) {
      const contentPanel = appShell.querySelector(".content-panel");
      if (contentPanel) {
        appendNodes(Array.from(contentPanel.childNodes), wrapper);
      } else {
        appendNodes(Array.from(appShell.childNodes), wrapper);
      }
    } else {
      appendNodes(Array.from(doc.body.childNodes), wrapper);
    }
  } catch (error) {
    console.error("Error loading resource document:", error);
    contentGrid.innerHTML = '<div class="card empty-state"><p>Unable to load this document.</p></div>';
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
  if (state.currentView === "children") {
    renderLessonChoices(getFilteredItems(state.currentItems), state.currentParentTitle);
  } else {
    selectCategory(state.selectedIndex);
  }
});

window.addEventListener("hashchange", handleRoute);

renderCategoryButtons();
handleRoute();
