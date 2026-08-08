const categoryList = document.getElementById("categoryList");
const contentHeader = document.getElementById("contentHeader");
const contentGrid = document.getElementById("contentGrid");
const searchInput = document.getElementById("resourceSearch");

const state = {
  selectedIndex: 0,
  currentView: "category",
  currentItems: [],
  currentParentTitle: "",
  currentParentLink: "",
  currentSectionKey: "",
};

// --- Utilities ---

function debounce(func, wait = 250) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// --- Routing & Navigation ---

function normalizeRoute(hash) {
  return (hash || window.location.hash).replace(/^#\/?/, "");
}

function buildCategoryRoute(categoryKey) {
  return `category/${categoryKey}`;
}

function buildChildrenRoute(sectionKey, parentLink) {
  return `children/${sectionKey}/${encodeURIComponent(parentLink)}`;
}

function navigateTo(link, title, summary) {
  const hash = `#${link}`;
  if (window.location.hash === hash) {
    loadDocument(link, title, summary);
  } else {
    window.location.hash = link;
  }
}

function navigateToCategory(categoryKey) {
  const route = buildCategoryRoute(categoryKey);
  if (normalizeRoute(window.location.hash) === route) {
    const categoryIndex = knowledgeBase.findIndex((c) => c.key === categoryKey);
    if (categoryIndex !== -1) selectCategory(categoryIndex, false);
  } else {
    window.location.hash = route;
  }
}

function navigateToChildren(sectionKey, parentLink) {
  const route = buildChildrenRoute(sectionKey, parentLink);
  if (normalizeRoute(window.location.hash) === route) {
    const parentItem = findItemByLink(parentLink);
    if (parentItem) {
      renderLessonChoices(parentItem.children, parentItem.title, sectionKey, parentLink);
    }
  } else {
    window.location.hash = route;
  }
}

// --- Data Queries ---

function findCategoryByKey(key) {
  return knowledgeBase.find((category) => category.key === key);
}

function findItemByLink(link, items) {
  // Prevent flatMap from running on every recursive iteration if items aren't provided
  const searchItems = items || knowledgeBase.flatMap((category) => category.items);
  
  for (const item of searchItems) {
    if (item.link === link) return item;
    if (Array.isArray(item.children)) {
      const found = findItemByLink(link, item.children);
      if (found) return found;
    }
  }
  return null;
}

function getFilteredItems(items) {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) return items;

  return items.filter((item) => {
    const haystack = `${item.title} ${item.summary}`.toLowerCase();
    return haystack.includes(term);
  });
}

// --- Rendering ---

function setContentHeader(title, description) {
  contentHeader.style.display = "block";
  contentHeader.innerHTML = ""; // Clear existing content securely
  
  const h2 = document.createElement("h2");
  h2.textContent = title;
  contentHeader.appendChild(h2);

  if (description) {
    const p = document.createElement("p");
    p.textContent = description;
    contentHeader.appendChild(p);
  }
}

function renderCategoryButtons() {
  const fragment = document.createDocumentFragment();
  categoryList.innerHTML = "";
  
  knowledgeBase.forEach((category) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.textContent = category.label;
    button.addEventListener("click", () => navigateToCategory(category.key));
    fragment.appendChild(button);
  });
  
  categoryList.appendChild(fragment);
}

function createActionLabel(item, options = {}) {
  const hasChildren = Array.isArray(item.children) && item.children.length;
  const isExerciseSection = options.sectionKey === "exercise-library" || options.sectionKey === "exercises";

  if (hasChildren) return isExerciseSection ? "View exercises" : "View lessons";
  if (isExerciseSection) return "View Exercise";
  if (options.sectionKey === "lessons") return "View lesson";
  
  return "View resource";
}

function createItemCard(item, options = {}) {
  const card = document.createElement("article");
  card.className = "card";
  
  const hasChildren = Array.isArray(item.children) && item.children.length;
  const actionLabel = createActionLabel(item, options);

  // Using textContent for dynamic user/knowledgeBase strings prevents XSS
  const titleEl = document.createElement("h3");
  titleEl.textContent = item.title;
  
  const summaryEl = document.createElement("p");
  summaryEl.textContent = item.summary;

  const actionEl = document.createElement(hasChildren ? "button" : "a");
  actionEl.className = "resource-link";
  actionEl.textContent = actionLabel;
  
  if (!hasChildren) {
    actionEl.href = `#${item.link || ""}`;
  } else {
    actionEl.type = "button";
  }

  actionEl.addEventListener("click", (event) => {
    event.preventDefault();
    if (hasChildren) {
      navigateToChildren(options.sectionKey, item.link);
    } else {
      navigateTo(item.link, item.title, item.summary);
    }
  });

  card.append(titleEl, summaryEl, actionEl);
  return card;
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

  const fragment = document.createDocumentFragment();
  const isSingleCardView = filteredItems.length === 1;

  filteredItems.forEach((item) => {
    const card = createItemCard(item, options);
    if (isSingleCardView) card.classList.add("single-card-full");
    fragment.appendChild(card);
  });

  contentGrid.appendChild(fragment);
}

function renderLessonChoices(items, parentTitle, sectionKey = "lessons", parentLink = "") {
  state.currentView = "children";
  state.currentItems = items;
  state.currentParentTitle = parentTitle;
  state.currentParentLink = parentLink;
  state.currentSectionKey = sectionKey;
  
  const isExerciseSection = sectionKey === "exercise-library" || sectionKey === "exercises";
  const subTitle = isExerciseSection ? "Select an exercise to open it." : "Select a lesson to open it.";

  renderItems(items, parentTitle, subTitle, { sectionKey });
}

function selectCategory(index, updateHash = true) {
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

  if (updateHash) {
    const route = buildCategoryRoute(selected.key);
    if (normalizeRoute(window.location.hash) !== route) {
      window.location.hash = route;
    }
  }
}

// --- Content Loading ---

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
    if (header) header.remove();

    const appShell = doc.querySelector("main.app-shell");
    if (appShell) {
      const contentPanel = appShell.querySelector(".content-panel");
      appendNodes(Array.from((contentPanel || appShell).childNodes), wrapper);
    } else {
      appendNodes(Array.from(doc.body.childNodes), wrapper);
    }
  } catch (error) {
    console.error("Error loading resource document:", error);
    wrapper.innerHTML = '<p class="error-text">Unable to load this document.</p>';
  }
}

// --- Initialization & Event Listeners ---

function handleRoute() {
  const route = normalizeRoute(window.location.hash);
  if (!route) {
    selectCategory(0, false);
    return;
  }

  const [segment, ...rest] = route.split("/");
  
  if (segment === "category") {
    const key = rest.join("/");
    const categoryIndex = knowledgeBase.findIndex((c) => c.key === key);
    if (categoryIndex !== -1) {
      selectCategory(categoryIndex, false);
      return;
    }
  }

  if (segment === "children") {
    const sectionKey = rest.shift();
    const parentLink = decodeURIComponent(rest.join("/"));
    const parentItem = findItemByLink(parentLink);
    if (parentItem && Array.isArray(parentItem.children)) {
      renderLessonChoices(parentItem.children, parentItem.title, sectionKey, parentLink);
      return;
    }
  }

  const item = findItemByLink(route);
  if (item) {
    loadDocument(item.link, item.title, item.summary);
  } else {
    loadDocument(route, "Resource", "");
  }
}

// Debounced search handler
searchInput.addEventListener(
  "input",
  debounce(() => {
    if (state.currentView === "children") {
      renderLessonChoices(
        getFilteredItems(state.currentItems),
        state.currentParentTitle,
        state.currentSectionKey,
        state.currentParentLink
      );
    } else {
      selectCategory(state.selectedIndex, false);
    }
  }, 250)
);

window.addEventListener("hashchange", handleRoute);

// Bootstrap app
renderCategoryButtons();
handleRoute();