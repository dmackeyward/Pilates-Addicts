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

function normalizeRoute(hash) {
  return (hash || window.location.hash).replace(/^#\/?/, "");
}

function buildCategoryRoute(categoryKey) {
  return `category/${categoryKey}`;
}

function buildChildrenRoute(sectionKey, parentLink) {
  return `children/${sectionKey}/${encodeURIComponent(parentLink)}`;
}

function findCategoryByKey(key) {
  return knowledgeBase.find((category) => category.key === key);
}

function findItemByLink(link, items = knowledgeBase.flatMap((category) => category.items)) {
  for (const item of items) {
    if (item.link === link) return item;
    if (Array.isArray(item.children)) {
      const found = findItemByLink(link, item.children);
      if (found) return found;
    }
  }
  return null;
}

function findParentItemByLink(link) {
  return findItemByLink(link);
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
    const category = findCategoryByKey(categoryKey);
    if (category) {
      selectCategory(knowledgeBase.indexOf(category), false);
    }
  } else {
    window.location.hash = route;
  }
}

function navigateToChildren(sectionKey, parentLink) {
  const route = buildChildrenRoute(sectionKey, parentLink);
  if (normalizeRoute(window.location.hash) === route) {
    const parentItem = findParentItemByLink(parentLink);
    if (parentItem) {
      renderLessonChoices(parentItem.children, parentItem.title, sectionKey, parentLink);
    }
  } else {
    window.location.hash = route;
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
  knowledgeBase.forEach((category) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.textContent = category.label;
    button.addEventListener("click", () => navigateToCategory(category.key));
    categoryList.appendChild(button);
  });
}

function createActionLabel(item, options = {}) {
  const hasChildren = Array.isArray(item.children) && item.children.length;
  const isExerciseSection = options.sectionKey === "exercise-library" || options.sectionKey === "exercises";

  if (hasChildren) {
    return isExerciseSection ? "View exercises" : "View lessons";
  }

  if (isExerciseSection) {
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
      // Pass the current sectionKey down to the sub-level view
      navigateToChildren(options.sectionKey, item.link);
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
    button.addEventListener("click", () => navigateToCategory(section.key));

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
    selectCategory(0, false);
    return;
  }

  const [segment, ...rest] = route.split("/");
  if (segment === "category") {
    const key = rest.join("/");
    const category = findCategoryByKey(key);
    if (category) {
      selectCategory(knowledgeBase.indexOf(category), false);
      return;
    }
  }

  if (segment === "children") {
    const sectionKey = rest.shift();
    const parentLink = decodeURIComponent(rest.join("/"));
    const parentItem = findParentItemByLink(parentLink);
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

searchInput.addEventListener("input", () => {
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
});

window.addEventListener("hashchange", handleRoute);

renderCategoryButtons();
handleRoute();
