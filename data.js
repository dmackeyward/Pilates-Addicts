const knowledgeBase = [
  {
key: "home",
    label: "Home",
    description:
      "A quick-access dashboard for class plans, exercise series, spring settings, and anatomical foundations.",
    items: [
      {
        title: "What is Pilates?",
        summary:
          "A foundation for understanding Pilates and why it matters in teaching.",
        link: "docs/home/what-is-pilates.html",
      },
      {
        title: "Pilates Principles",
        summary:
          "Core principles that guide alignment, breath, and purposeful movement.",
        link: "docs/home/pilates-principles.html",
      },
      {
        title: "Teaching Philosophy",
        summary:
          "A mindful, breath-led teaching approach grounded in purpose and precision.",
        link: "docs/home/teaching-philosophy.html",
      },
      {
        title: "Classical vs. Contemporary Pilates",
        summary:
          "A focused comparison of traditional and modern Pilates methods.",
        link: "docs/home/classical-vs-contemporary.html",
      },
      {
        title: "Teaching Key Aspects",
        summary:
          "Strategies for clear verbal cueing, tactile feedback, and client observation.",
        link: "docs/home/teaching-key-aspects.html",
      },
      {
        title: "Manipulating Teaching Variables",
        summary:
          "How to adapt tempo, levers, resistance, and range of motion to tailor intensity.",
        link: "docs/home/manipulating-teaching-variables.html",
      },
      {
        title: "Class Variables",
        summary:
          "Key factors for structuring sessions, including class format, flow, duration, and apparatus.",
        link: "docs/home/class-variables.html",
      },
      {
        title: "Health and Safety",
        summary:
          "Essential protocols for equipment safety, injury prevention, and client contraindications.",
        link: "docs/home/health-and-safety.html",
      },
    ],
  },
  {
    key: "exercise-library",
    label: "Exercises",
    description:
      "Comprehensive Pilates Reformer exercise library featuring classical repertoire, functional sequencing, and athletic variations.",
    items: [
      {
        title: "Footwork Series",
        summary:
          "Lower-extremity tracking, alignment, foot articulation, and warm-up sequencing.",
        link: "docs/exercises/footwork-series/index.html",
        children: [
          {
            title: "Press Away - Double Leg Parallel",
            summary:
              "Footwork focused on heel/hip tracking, neutral pelvis, and even foot placement.",
            link: "docs/exercises/footwork-series/press-away-parallel.html",
          },
          {
            title: "Press Away - Double Leg Pliē (V-Position)",
            summary:
              "External hip rotation focusing on inner thigh engagement and heel connection.",
            link: "docs/exercises/footwork-series/press-away-plie.html",
          },
          {
            title: "Press Away - Double Leg Wide",
            summary:
              "Wide stance work targeting lateral hip stability and deep adductor connection.",
            link: "docs/exercises/footwork-series/press-away-wide.html",
          },
          {
            title: "Press Away - Single Leg",
            summary:
              "Unilateral leg press to identify asymmetries, pelvic rotation, and strength imbalance.",
            link: "docs/exercises/footwork-series/press-away-single-leg.html",
          },
          {
            title: "Calf Raises (Running / Lower & Lift)",
            summary:
              "Ankle articulation, gastrocnemius/soleus strengthening, and Achilles tendon mobility.",
            link: "docs/exercises/footwork-series/calf-raises.html",
          },
          {
            title: "Jogging",
            summary:
              "Dynamic alternating ankle articulation and pelvic stabilization on moving carriage.",
            link: "docs/exercises/footwork-series/jogging.html",
          },
          {
            title: "Pelvic Bridge",
            summary:
              "Hamstring and glute activation emphasizing segmental spinal articulation on the footbar.",
            link: "docs/exercises/footwork-series/pelvic-bridge.html",
          },
        ],
      },
      {
        title: "Feet in Straps Series",
        summary:
          "Hip mobility, hamstring control, and pelvic stability through open-chain leg work.",
        link: "docs/exercises/feet-in-straps-series/index.html",
      },
      {
        title: "Hands in Straps & Midback Series",
        summary:
          "Supine upper-body repertoire focusing on shoulder girdle organization, core connection, and trunk stability.",
        link: "docs/exercises/hands-in-straps-series/index.html",
      },
      {
        title: "Long Stretch & Plank Series",
        summary:
          "High-plank support work, anti-extension core strength, and shoulder stability (Long Stretch, Up Stretch, Elephant).",
        link: "docs/exercises/long-stretch-series/index.html",
      },
      {
        title: "Kneeling Series (Knee Stretches & Side Arms)",
        summary:
          "Kneeling carriage control challenging balance, shoulder endurance, and deep abdominal lift.",
        link: "docs/exercises/kneeling-series/index.html",
      },
      {
        title: "Side Lying Glute & Sprinter Series",
        summary:
          "Targeted hip abductor strength, unilateral leg work, and gluteal endurance.",
        link: "docs/exercises/side-lying-glute-series/index.html",
      },
      {
        title: "Long Box Series (Pulling Straps & Swan)",
        summary:
          "Prone posterior chain activation, thoracic extension, and scapular control.",
        link: "docs/exercises/long-box-series/index.html",
      },
      {
        title: "Short Box Series (Abs & Lateral Flexion)",
        summary:
          "Abdominal articulation, deep core endurance, flat back work, and Mermaid side-bends.",
        link: "docs/exercises/short-box-series/index.html",
      },
      {
        title: "Quadruped Ab Series",
        summary:
          "Four-point kneeling variations, bird-dog patterns, and dynamic core stabilization.",
        link: "docs/exercises/quadruped-series/index.html",
      },
      {
        title: "Standing & Balance Series",
        summary:
          "High-challenge standing repertoire emphasizing adductor control, balance, and Cheerleader variations.",
        link: "docs/exercises/standing-series/index.html",
      },
      {
        title: "Inversions & Advanced Articulation",
        summary:
          "Classical intermediate to advanced repertoire including Short Spine, Long Spine, and Teaser variations.",
        link: "docs/exercises/inversions-series/index.html",
      },
      {
        title: "Reformer Stretches & Recovery",
        summary:
          "Restorative flexibility work, Eve's Lunge, hip opening, and dynamic recovery using carriage tension.",
        link: "docs/exercises/stretches-series/index.html",
      },
    ],
  },
  {
    key: "lessons",
    label: "Lessons",
    description: "Structured teaching resources for private and group lessons.",
    items: [
      {
        title: "Private Lessons",
        summary:
          "Tailored lesson plans for one-on-one instruction, pacing, and individualized progression.",
        children: [
          {
            title: "Foundations Private",
            summary:
              "A beginner-friendly private lesson focused on alignment, breath, and control.",
            link: "docs/class-plans/class-plan-1/index.html",
          },
          {
            title: "Intermediate Private",
            summary:
              "A more dynamic private lesson for balance, strength, and coordination.",
            link: "docs/class-plans/class-plan-2/index.html",
          },
          {
            title: "Advanced Private",
            summary:
              "A challenging private lesson plan for athletic, strength-led work.",
            link: "docs/class-plans/class-plan-3/index.html",
          },
        ],
      },
      {
        title: "Group Lessons",
        summary:
          "Classroom-ready lesson plans for shared sessions, coordination, and group flow.",
        children: [
          {
            title: "Beginner Group",
            summary:
              "A simple group lesson with foundational movement and clear pacing.",
            link: "docs/class-plans/class-plan-1/index.html",
          },
          {
            title: "Full-Body Group",
            summary:
              "A cohesive group lesson for more complete reformer flow and sequencing.",
            link: "docs/class-plans/class-plan-2/index.html",
          },
          {
            title: "Athletic Group",
            summary:
              "A high-energy group lesson designed for strength, control, and challenge.",
            link: "docs/class-plans/class-plan-3/index.html",
          },
        ],
      },
      {
        title: "Lesson Templates",
        summary:
          "Reusable lesson-planning templates for warm-up, standing, core, and cool down segments.",
        link: "docs/class-plans/class-plan-3/index.html",
      },
    ],
  },
  {
    key: "foundations",
    label: "Anatomy & Biomechanics",
    description:
      "Core anatomical and biomechanical principles that keep teaching safe, effective, and purposeful.",
    items: [
      {
        title: "Neutral spine",
        summary:
          "A balanced spinal alignment that supports the core while remaining mobile.",
        link: "docs/home/pilates-principles.html#neutral-spine",
      },
      {
        title: "Shoulders back and down",
        summary:
          "Upper-body positioning that supports breathing, posture, and clean movement.",
        link: "docs/home/pilates-principles.html#shoulders",
      },
      {
        title: "Hips balanced",
        summary:
          "Pelvic alignment that creates a stable base and efficient force transfer.",
        link: "docs/home/pilates-principles.html#hips",
      },
      {
        title: "Joints and muscles",
        summary:
          "How the body is designed to move with control, mobility, and coordination.",
        link: "docs/home/pilates-principles.html#joints-and-muscles",
      },
      {
        title: "Why this matters",
        summary:
          "The importance of honoring anatomy and biomechanics in real Pilates work.",
        link: "docs/home/pilates-principles.html#why-this-matters",
      },
      {
        title: "Winging",
        summary:
          "How scapular winging affects shoulder blade control and upper-body movement.",
        link: "docs/home/pilates-principles.html#winging",
      },
      {
        title: "Dome-ing",
        summary:
          "How breath and core organization influence ribcage and abdominal support.",
        link: "docs/home/pilates-principles.html#dome-ing",
      },
      {
        title: "Teaching takeaway",
        summary:
          "A practical framework for teaching alignment and movement with intention.",
        link: "docs/home/pilates-principles.html#teaching-takeaway",
      },
    ],
  },
];
