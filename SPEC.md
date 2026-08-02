# Pilates Addicts Product Spec

## 1. Home (Dashboard)

Make this a quick-access hub rather than a reading page.

- Welcome / Quick Links: Jump to the most-used class plans or exercise series.
- Recent Updates: For example, "Added new Short Spine notes".
- Search Bar: A key feature for the knowledge base so instructors can search for topics such as "Boxing" or "1 Yellow spring".

## 2. Anatomy & Biomechanics

Consolidate the theory, history, and core principles in this section.

- Introduction to Pilates: What Pilates is and why it matters.
- Teaching Philosophy: Your specific teaching approach.
- Classical vs. Contemporary: Differences, history, and how to blend the two.
- Core Principles: Breath, pelvic placement, ribcage placement, scapular movement, and head/neck placement.

## 3. Exercises

Group exercises by apparatus or position. Since the current content implies Reformer work, label it clearly or organize it logically.

### Suggested categories

- Standing Series
- Seated Series
- Supine / Feet in Straps Series
- Side-Lying Series (including glutes and mermaid variations)
- Cheerleader Series
- Short Spine & Articulation

### Standardized exercise template

Each exercise entry should include:

- Setup & Alignment
- Movement / Execution
- Key Cues (including imagery and tactile cues)
- Springs Used (linked to the Spring Settings section)
- Modifications & Contraindications

## 4. Spring Settings Guide

Instead of simply listing spring numbers, explain the feel and purpose of the load.

- Introduction to Spring Tension: Heavy vs. light load, and concentric vs. eccentric loading.
- 1 High Yellow: Focus on mobility, warm-up, and specific exercises.
- 1 Yellow + 1 Green: Focus on transitional support.
- 2 Green: Focus on standard resistance and core engagement.
- 1 Red: Focus on heavier load and strength building.

### Recommended addition

- Add a quick reference matrix showing which exercises use which springs.

## 5. Class Plans & Programming

Structure the class plans so instructors can clearly see the flow of the session.

- Class Plan 1: Beginner / Fundamentals
- Class Plan 2: Intermediate / Full Body
- Class Plan 3: Advanced / Athletic

Each class plan should include:

- Warm-up (Mat or Reformer)
- Standing / Seated Work
- Supine / Core Work
- Cool Down / Stretching

## 6. Teacher Tools / Resources

Provide extra value for instructors.

- Anatomy Quick-Ref: Muscles used in specific movements.
- Cue Bank: A searchable list of favorite verbal and tactile cues.
- Business / Studio Tips: Optional guidance on injuries, client retention, and teaching support.

## Technical & UX Recommendations

Because the project is lightweight and currently centered around HTML, CSS, and JavaScript, the code should be structured carefully to avoid becoming messy.

### 1. Use a Single Page Application (SPA) approach

- Keep the main experience in one page.
- Use JavaScript to show and hide different views based on navigation clicks.
- Store content in a data file such as data.js or inside script.js as JSON objects.

Example data structure:

```js
const exercises = [
  {
    id: "short-spine",
    title: "Short Spine",
    category: "supine",
    springs: ["1 Yellow + 1 Green"]
  }
];
```

### 2. Implement hash routing

Use URL hashes such as `#/exercises/short-spine` so instructors can bookmark specific pages or share links.

### 3. Use a mobile-first CSS approach

- Use CSS Grid or Flexbox for layout.
- Make buttons and tabs large enough for touch interaction.
- Hide the main navigation behind a hamburger menu on smaller screens.

### 4. Add a quick filter or search

A simple search bar at the top of the page can filter exercises, class plans, and spring settings in real time.
