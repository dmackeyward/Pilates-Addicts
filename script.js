const knowledgeBase = [
  {
    key: "home",
    label: "Home",
    description: "Studio overview and teaching philosophy for Pilates teaching resources.",
    items: [
      {
        title: "What is Pilates?",
        summary: "Foundation of Pilates practice and why it matters for teaching.",
        link: "docs/home/what-is-pilates.html",
      },
      {
        title: "My Teaching Philosophy",
        summary: "Mindful movement, breath, and purposeful teaching approach.",
        link: "docs/home/teaching-philosophy.html",
      },
      {
        title: "Classical vs. Contemporary Pilates",
        summary: "A focused comparison of traditional and modern Pilates methods for teaching.",
        link: "docs/home/classical-vs-contemporary.html",
      },
    ],
  },
  {
    key: "exercises",
    label: "Exercises",
    description: "Instructional exercise series divided by reformer category.",
    items: [
      {
        title: "Standing Series",
        summary: "A set of reformer standing exercises for balance, alignment, and control.",
        link: "docs/exercises/standing-series/README.html",
      },
      {
        title: "Seated Series",
        summary: "Pilates seated reformer work for posture and core support.",
        link: "docs/exercises/seated-series/README.html",
      },
      {
        title: "Feet in Straps Series",
        summary: "Lower-body and hip work with the feet in straps for stability and articulation.",
        link: "docs/exercises/feet-in-straps-series/README.html",
      },
      {
        title: "Side Lying Glute Series",
        summary: "Side-lying glute and hip work that supports alignment and stability.",
        link: "docs/exercises/side-lying-glute-series/README.html",
      },
      {
        title: "Cheerleader Series",
        summary: "Hands-in-strap work focused on inner thigh activation and core connection.",
        link: "docs/exercises/standing-series/cheerleader-series.html",
      },
      {
        title: "Short Spine",
        summary: "A short spine variation with detailed inversion and spinal massage notes.",
        link: "docs/exercises/feet-in-straps-series/short-spine-notes.html",
      },
    ],
  },
  {
    key: "spring-settings",
    label: "Spring Settings",
    description: "A simple starter framework for choosing reformer spring tensions by support, challenge, and client readiness.",
    items: [
      {
        title: "Introduction",
        summary: "A simple overview of the spring-setting framework and how to progress from support to challenge.",
        link: "docs/spring-settings/introduction/README.html",
      },
      {
        title: "Exercises using 1 High Yellow",
        summary: "Gentle support for mobility, alignment, and early strength work.",
        link: "docs/spring-settings/yellow/README.html",
      },
      {
        title: "Exercises using 1 Yellow + 1 Green Spring",
        summary: "A slightly stronger option for transitional and coordinated work.",
        link: "docs/spring-settings/yellow-green/README.html",
      },
      {
        title: "Exercises using 2 Green Springs",
        summary: "Balanced intermediate resistance for full-body flow and strength.",
        link: "docs/spring-settings/green/README.html",
      },
      {
        title: "Exercises using 1 Red Spring",
        summary: "A stronger setting for more demanding exercises and experienced clients.",
        link: "docs/spring-settings/red/README.html",
      },
    ],
  },
  {
    key: "class-plans",
    label: "Class Plans",
    description: "Ready-made class plans for different lesson goals and experience levels.",
    items: [
      {
        title: "Class Plan 1",
        summary: "A balanced full-body session with warm-up, core work, and cool down.",
        link: "docs/class-plans/class-plan-1/README.html",
      },
      {
        title: "Class Plan 2",
        summary: "Focus on stability, breath coordination, and reformer flow.",
        link: "docs/class-plans/class-plan-2/README.html",
      },
      {
        title: "Class Plan 3",
        summary: "A timing-focused lesson plan for footwork, supine work, and hands-in-straps.",
        link: "docs/class-plans/class-plan-3/README.html",
      },
    ],
  },
  {
    key: "method",
    label: "Anatomical and Biomechanical Foundations",
    description: "Core movement guidelines that keep teaching safe, effective, and powerful.",
    items: [
      {
        title: "Neutral spine",
        summary: "A balanced spinal alignment that supports the core while remaining mobile.",
        link: "docs/home/anatomical-biomechanical-principles.html#neutral-spine",
      },
      {
        title: "Shoulders back and down",
        summary: "Upper-body positioning that supports breathing, posture, and clean movement.",
        link: "docs/home/anatomical-biomechanical-principles.html#shoulders",
      },
      {
        title: "Hips balanced",
        summary: "Pelvic alignment that creates a stable base and efficient force transfer.",
        link: "docs/home/anatomical-biomechanical-principles.html#hips",
      },
      {
        title: "Joints and muscles",
        summary: "How the body is designed to move with control, mobility, and coordination.",
        link: "docs/home/anatomical-biomechanical-principles.html#joints-and-muscles",
      },
      {
        title: "Why this matters",
        summary: "The importance of honoring anatomy and biomechanics in real Pilates work.",
        link: "docs/home/anatomical-biomechanical-principles.html#why-this-matters",
      },
      {
        title: "Teaching takeaway",
        summary: "A practical framework for teaching alignment and movement with intention.",
        link: "docs/home/anatomical-biomechanical-principles.html#teaching-takeaway",
      },
    ],
  },
  {
    key: "assessments",
    label: "Assessments",
    description: "Evaluation notes and exam-focused resources for teaching preparation.",
    items: [
      {
        title: "Exam",
        summary: "Anterior pelvic stability assessment notes and reformer exam guidance.",
        link: "docs/assessments/exam/README.html",
      },
    ],
  },
];

const categoryList = document.getElementById("categoryList");
const contentHeader = document.getElementById("contentHeader");
const contentGrid = document.getElementById("contentGrid");

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
  knowledgeBase.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = category.label;
    button.addEventListener("click", () => selectCategory(index));
    categoryList.appendChild(button);
  });
}

function selectCategory(index) {
  const selected = knowledgeBase[index];
  const buttons = document.querySelectorAll(".category-button");
  buttons.forEach((button, idx) => button.classList.toggle("active", idx === index));

  contentHeader.style.display = "block";
  contentHeader.innerHTML = `
    <h2>${selected.label}</h2>
    <p>${selected.description}</p>
  `;

  contentGrid.innerHTML = "";

  selected.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <a href="#${item.link}" class="resource-link">View resource</a>
    `;

    const link = card.querySelector(".resource-link");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigateTo(item.link, item.title, item.summary);
    });

    contentGrid.appendChild(card);
  });
}

function loadDocument(link, title, summary) {
  const pageTitle = title || "Resource";
  const pageDescription = summary || "";

  contentHeader.style.display = "none";
  contentHeader.innerHTML = `
    <h2>${pageTitle}</h2>
    <p>${pageDescription}</p>
  `;

  contentGrid.innerHTML = `
    <div class="loaded-resource">
      <iframe class="resource-iframe" src="${link}" title="${pageTitle}"></iframe>
    </div>
  `;
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

window.addEventListener("hashchange", handleRoute);

renderCategoryButtons();
handleRoute();
