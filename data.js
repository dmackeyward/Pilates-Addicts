/**
 * @typedef {Object} KnowledgeNode
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} link
 */

/**
 * @typedef {KnowledgeNode & { children?: KnowledgeNode[] }} KnowledgeItem
 */

/**
 * @typedef {Object} KnowledgeCategory
 * @property {string} key
 * @property {string} label
 * @property {string} description
 * @property {KnowledgeItem[]} items
 */

/** @type {KnowledgeCategory[]} */
export const knowledgeBase = [
  {
    key: "home",
    label: "Home",
    description:
      "A practical dashboard for Pilates principles, class planning, spring settings, apparatus setup, safety, and teaching foundations.",
    items: [
      {
        id: "what-is-pilates",
        title: "What is Pilates?",
        summary:
          "A foundation for understanding Pilates and why it matters in teaching.",
        link: "/docs/home/what-is-pilates.html",
      },
      {
        id: "pilates-principles",
        title: "Pilates Principles",
        summary:
          "Breath, concentration, control, centering, precision, and flow as practical teaching tools.",
        link: "/docs/home/pilates-principles.html",
      },
      {
        id: "teaching-philosophy",
        title: "Teaching Philosophy",
        summary:
          "A mindful, breath-led teaching approach grounded in purpose and precision.",
        link: "/docs/home/teaching-philosophy.html",
      },
      {
        id: "classical-vs-contemporary",
        title: "Classical vs. Contemporary Pilates",
        summary:
          "A focused comparison of traditional and modern Pilates methods.",
        link: "/docs/home/classical-vs-contemporary.html",
      },
      {
        id: "health-and-safety",
        title: "Health, Safety & Contraindications",
        summary:
          "Essential protocols for equipment safety, client screening, injury prevention, and when to modify or refer.",
        link: "/docs/home/health-and-safety.html",
      },
      {
        id: "teaching-key-aspects",
        title: "Observation, Cueing & Feedback",
        summary:
          "Clear verbal cueing, tactile feedback, visual observation, and client-centered corrections.",
        link: "/docs/home/teaching-key-aspects.html",
      },
      {
        id: "manipulating-teaching-variables",
        title: "Manipulating Teaching Variables",
        summary:
          "How to adapt tempo, levers, spring load, range of motion, and support to tailor intensity.",
        link: "/docs/home/manipulating-teaching-variables.html",
      },
      {
        id: "class-variables",
        title: "Class Structure & Variables",
        summary:
          "Key factors for structuring sessions, including class format, flow, duration, apparatus, and progression.",
        link: "/docs/home/class-variables.html",
      },
      {
        id: "spring-settings",
        title: "Spring Settings Guide",
        summary:
          "Quick spring recommendations by exercise, plus how load affects assistance, resistance, and control.",
        link: "/docs/home/spring-settings.html",
      },
      {
        id: "apparatus-setup",
        title: "Reformer Setup & Adjustments",
        summary:
          "Carriage, springs, straps, ropes, footbar, shoulder blocks, headrest, and safety checks.",
        link: "/docs/home/apparatus-setup.html",
      },
      {
        id: "modifications-progressions",
        title: "Modifications & Progressions",
        summary:
          "A framework for regressing, progressing, and adapting exercises for different bodies and goals.",
        link: "/docs/home/modifications-progressions.html",
      },
    ],
  },
  {
    key: "exercise-library",
    label: "Exercise Library",
    description:
      "Comprehensive Reformer exercise library organized by series and class flow. Each exercise should include purpose, setup, spring guidance, cueing, modifications, progressions, common faults, and safety notes.",
    items: [
      {
        id: "footwork-series",
        title: "Footwork Series",
        summary:
          "Warm-up series for foot and ankle articulation, knee and hip tracking, pelvic control, and carriage connection.",
        link: "/docs/exercises/footwork-series/index.html",
        children: [
          {
            id: "press-away-parallel",
            title: "Press Away - Double Leg Parallel",
            summary:
              "Double-leg press focusing on even foot pressure, knee tracking, neutral pelvis, and smooth carriage return.",
            link: "/docs/exercises/footwork-series/press-away-parallel.html",
          },
          {
            id: "press-away-plie",
            title: "Press Away - Double Leg Plié (V-Position)",
            summary:
              "Turnout-based press from the hips, emphasizing external rotation without forcing the knees or ankles.",
            link: "/docs/exercises/footwork-series/press-away-plie.html",
          },
          {
            id: "press-away-wide",
            title: "Press Away - Double Leg Wide",
            summary:
              "Wide stance work targeting adductor engagement and lateral pelvic stability.",
            link: "/docs/exercises/footwork-series/press-away-wide.html",
          },
          {
            id: "press-away-single-leg",
            title: "Press Away - Single Leg",
            summary:
              "Unilateral leg press to identify asymmetries while maintaining a level pelvis and stable trunk.",
            link: "/docs/exercises/footwork-series/press-away-single-leg.html",
          },
          {
            id: "calf-raises",
            title: "Calf Raises (Lower & Lift)",
            summary:
              "Controlled heel lifts and lowers for ankle strength, calf control, and Achilles mobility.",
            link: "/docs/exercises/footwork-series/calf-raises.html",
          },
          {
            id: "running",
            title: "Running / Jogging",
            summary:
              "Dynamic alternating ankle articulation with stable pelvis and carriage control.",
            link: "/docs/exercises/footwork-series/running.html",
          },
          {
            id: "pelvic-bridge",
            title: "Pelvic Bridge",
            summary:
              "Segmental spinal articulation with glute and hamstring activation, avoiding lumbar compression.",
            link: "/docs/exercises/footwork-series/pelvic-bridge.html",
          },
        ],
      },
      {
        id: "feet-in-straps-series",
        title: "Feet-in-Straps Series",
        summary:
          "Open-chain leg work for hip mobility, hamstring control, and pelvic stability.",
        link: "/docs/exercises/feet-in-straps-series/index.html",
        children: [
          {
            id: "leg-lower-lift",
            title: "Leg Lower & Lift",
            summary:
              "Controlled leg lowering and lifting with straps while maintaining lumbopelvic stability.",
            link: "/docs/exercises/feet-in-straps-series/leg-lower-lift.html",
          },
          {
            id: "frog",
            title: "Frog",
            summary:
              "External hip rotation and adductor control with heel-to-heel connection.",
            link: "/docs/exercises/feet-in-straps-series/frog.html",
          },
          {
            id: "leg-circles",
            title: "Leg Circles",
            summary:
              "Hip circumduction targeting hip disassociation, deep rotators, and pelvic control.",
            link: "/docs/exercises/feet-in-straps-series/leg-circles.html",
          },
          {
            id: "walking-in-straps",
            title: "Walking in Straps",
            summary:
              "Alternating hip flexion and extension emphasizing unilateral control in an open chain.",
            link: "/docs/exercises/feet-in-straps-series/walking.html",
          },
        ],
      },
      {
        id: "hands-in-straps-series",
        title: "Hands-in-Straps & Mid-Back Series",
        summary:
          "Supine upper-body repertoire for shoulder organization, trunk control, and coordinated breath.",
        link: "/docs/exercises/hands-in-straps-series/index.html",
        children: [
          {
            id: "the-hundred",
            title: "The Hundred",
            summary:
              "Classic dynamic abdominal endurance and rhythmic breathwork; modify head and neck position as needed.",
            link: "/docs/exercises/hands-in-straps-series/the-hundred.html",
          },
          {
            id: "midback-press-down",
            title: "Midback Press Down",
            summary:
              "Latissimus dorsi and core integration through controlled sagittal arm levers.",
            link: "/docs/exercises/hands-in-straps-series/midback-press-down.html",
          },
          {
            id: "tricep-press",
            title: "Tricep Press",
            summary:
              "Elbow extension targeting triceps brachii while maintaining stable trunk and shoulder alignment.",
            link: "/docs/exercises/hands-in-straps-series/tricep-press.html",
          },
          {
            id: "arm-circles",
            title: "Arm Circles",
            summary:
              "Scapulothoracic stability and shoulder range of motion in supine positioning.",
            link: "/docs/exercises/hands-in-straps-series/arm-circles.html",
          },
          {
            id: "coordination",
            title: "Coordination",
            summary:
              "Supine arm and leg integration challenge focusing on breath timing, trunk control, and limb independence.",
            link: "/docs/exercises/hands-in-straps-series/coordination.html",
          },
        ],
      },
      {
        id: "long-stretch-series",
        title: "Long Stretch & Plank Series",
        summary:
          "Plank-based support work, anti-extension core strength, and shoulder stability.",
        link: "/docs/exercises/long-stretch-series/index.html",
        children: [
          {
            id: "elephant",
            title: "Elephant",
            summary:
              "Flexed-spine press with flat feet, targeting hamstring length and abdominal scooping.",
            link: "/docs/exercises/long-stretch-series/elephant.html",
          },
          {
            id: "long-stretch",
            title: "Long Stretch",
            summary:
              "Full-body plank moving the carriage away and back; requires shoulder stability and trunk control.",
            link: "/docs/exercises/long-stretch-series/long-stretch.html",
          },
          {
            id: "down-stretch",
            title: "Down Stretch",
            summary:
              "Thoracic extension and anterior hip opening with shoulder depression and rib control.",
            link: "/docs/exercises/long-stretch-series/down-stretch.html",
          },
          {
            id: "up-stretch",
            title: "Up Stretch",
            summary:
              "Pike-to-plank transition focusing on abdominal lift and spinal articulation.",
            link: "/docs/exercises/long-stretch-series/up-stretch.html",
          },
        ],
      },
      {
        id: "kneeling-series",
        title: "Kneeling Series",
        summary:
          "Kneeling carriage work challenging balance, shoulder endurance, and deep abdominal lift.",
        link: "/docs/exercises/kneeling-series/index.html",
        children: [
          {
            id: "knee-stretches-round",
            title: "Knee Stretches - Round Back",
            summary:
              "Abdominal scooping and spinal flexion isolation against moving carriage spring resistance.",
            link: "/docs/exercises/kneeling-series/knee-stretches-round.html",
          },
          {
            id: "knee-stretches-flat",
            title: "Knee Stretches - Flat Back",
            summary:
              "Lumbopelvic stabilization in a neutral spine position during controlled hip flexion and extension.",
            link: "/docs/exercises/kneeling-series/knee-stretches-flat.html",
          },
          {
            id: "knee-stretches-knees-off",
            title: "Knee Stretches - Knees Off",
            summary:
              "Advanced hover-plank progression; build only when lumbopelvic control is consistent.",
            link: "/docs/exercises/kneeling-series/knee-stretches-knees-off.html",
          },
          {
            id: "kneeling-side-arms",
            title: "Kneeling Side Arms",
            summary:
              "Unilateral core and shoulder stability in upright kneeling alignment.",
            link: "/docs/exercises/kneeling-series/kneeling-side-arms.html",
          },
          {
            id: "kneeling-chest-expansion",
            title: "Kneeling Chest Expansion",
            summary:
              "Kneeling arm work for thoracic extension, scapular control, and breath while maintaining carriage stability.",
            link: "/docs/exercises/kneeling-series/kneeling-chest-expansion.html",
          },
        ],
      },
      {
        id: "quadruped-series",
        title: "Quadruped Core Series",
        summary:
          "Four-point kneeling variations, bird-dog patterns, and dynamic core stabilization.",
        link: "/docs/exercises/quadruped-series/index.html",
        children: [
          {
            id: "quadruped-knee-tucks",
            title: "Quadruped Knee Tucks",
            summary:
              "Abdominal isolation in a four-point kneeling stance driving carriage movement.",
            link: "/docs/exercises/quadruped-series/quadruped-knee-tucks.html",
          },
          {
            id: "quadruped-single-leg-stretch",
            title: "Quadruped Single Leg Stretch",
            summary:
              "Asymmetrical core stability and glute activation targeting unilateral balance.",
            link: "/docs/exercises/quadruped-series/quadruped-single-leg-stretch.html",
          },
          {
            id: "quadruped-bird-dog",
            title: "Quadruped Bird Dog",
            summary:
              "Opposite arm and leg reach for cross-body coordination, scapular stability, and anti-rotation control.",
            link: "/docs/exercises/quadruped-series/bird-dog.html",
          },
        ],
      },
      {
        id: "side-lying-glute-series",
        title: "Glute, Side-Lying & Sprinter Series",
        summary:
          "Targeted hip and glute work, from side-lying alignment control to dynamic lunge power.",
        link: "/docs/exercises/side-lying-glute-series/index.html",
        children: [
          {
            id: "side-lying-leg-press",
            title: "Side-Lying Leg Press",
            summary:
              "Unilateral side-lying press strengthening gluteus medius while maintaining pelvic alignment.",
            link: "/docs/exercises/side-lying-glute-series/side-lying-leg-press.html",
          },
          {
            id: "sprinter-lunge",
            title: "Sprinter Lunge",
            summary:
              "Dynamic single-leg lunge pattern challenging hip power, glute activation, and trunk control.",
            link: "/docs/exercises/side-lying-glute-series/sprinter-lunge.html",
          },
        ],
      },
      {
        id: "standing-series",
        title: "Standing, Balance & Rowing Series",
        summary:
          "Standing repertoire for balance, adductor control, rowing mechanics, and functional lower-body strength.",
        link: "/docs/exercises/standing-series/index.html",
        children: [
          {
            id: "side-splits",
            title: "Side Splits",
            summary:
              "Eccentric and concentric inner thigh control challenging frontal-plane balance.",
            link: "/docs/exercises/standing-series/side-splits.html",
          },
          {
            id: "front-splits",
            title: "Front Splits",
            summary:
              "Standing sagittal-plane lunge challenging balance, hamstrings, and hip flexors.",
            link: "/docs/exercises/standing-series/front-splits.html",
          },
          {
            id: "standing-backstroke",
            title: "Standing Backstroke",
            summary:
              "Standing rowing pattern that connects breath to arm pull, scapular control, and posterior chain.",
            link: "/docs/exercises/standing-series/backstroke.html",
          },
          {
            id: "standing-breaststroke",
            title: "Standing Breaststroke",
            summary:
              "Bilateral standing rowing pattern for upper-back strength, shoulder stability, and trunk control.",
            link: "/docs/exercises/standing-series/breaststroke.html",
          },
        ],
      },
      {
        id: "short-box-series",
        title: "Short Box Series",
        summary:
          "Seated abdominal articulation, hinge work, rotation, side flexion, and controlled spinal mobility.",
        link: "/docs/exercises/short-box-series/index.html",
        children: [
          {
            id: "round-back",
            title: "Round Back",
            summary:
              "Spinal C-curve flexion articulation challenging deep abdominal scoop.",
            link: "/docs/exercises/short-box-series/round-back.html",
          },
          {
            id: "flat-back",
            title: "Flat Back",
            summary:
              "Neutral-spine hip hinge pattern targeting deep anterior core stability.",
            link: "/docs/exercises/short-box-series/flat-back.html",
          },
          {
            id: "side-to-side-twist",
            title: "Side-to-Side & Twist",
            summary:
              "Oblique strength and coronal/transverse plane trunk stability.",
            link: "/docs/exercises/short-box-series/side-to-side-twist.html",
          },
          {
            id: "climb-a-tree",
            title: "Tree / Climb a Tree",
            summary:
              "Dynamic hamstring flexibility and core articulation sequence.",
            link: "/docs/exercises/short-box-series/climb-a-tree.html",
          },
          {
            id: "mermaid",
            title: "Mermaid",
            summary:
              "Lateral spinal flexion and intercostal stretch.",
            link: "/docs/exercises/short-box-series/mermaid.html",
          },
          {
            id: "semi-circle",
            title: "Semi-Circle",
            summary:
              "Bridge with controlled hip extension and spinal articulation; challenges hamstrings and pelvic stability.",
            link: "/docs/exercises/short-box-series/semi-circle.html",
          },
        ],
      },
      {
        id: "long-box-series",
        title: "Long Box Series",
        summary:
          "Prone posterior chain activation, thoracic extension, and scapular control.",
        link: "/docs/exercises/long-box-series/index.html",
        children: [
          {
            id: "pulling-straps-1",
            title: "Pulling Straps I",
            summary:
              "Prone scapular depression, retraction, and extension with shoulder and lat focus.",
            link: "/docs/exercises/long-box-series/pulling-straps-1.html",
          },
          {
            id: "pulling-straps-2",
            title: "Pulling Straps II (T-Press)",
            summary:
              "Posterior deltoid and rhomboid integration in high horizontal abduction.",
            link: "/docs/exercises/long-box-series/pulling-straps-2.html",
          },
          {
            id: "swan",
            title: "Swan",
            summary:
              "Full posterior chain engagement and spinal extension on the long box.",
            link: "/docs/exercises/long-box-series/swan.html",
          },
        ],
      },
      {
        id: "inversions-series",
        title: "Inversions & Advanced Articulation",
        summary:
          "Classical intermediate to advanced repertoire requiring shoulder stability, spinal articulation, and safe progression.",
        link: "/docs/exercises/inversions-series/index.html",
        children: [
          {
            id: "short-spine-massage",
            title: "Short Spine Massage",
            summary:
              "Advanced inverted lumbar articulation and hamstring control; screen for neck and shoulder sensitivity.",
            link: "/docs/exercises/inversions-series/short-spine-massage.html",
          },
          {
            id: "long-spine-massage",
            title: "Long Spine Massage",
            summary:
              "Full inversion and sequential rolling down through the spine with strap resistance.",
            link: "/docs/exercises/inversions-series/long-spine-massage.html",
          },
          {
            id: "roll-over",
            title: "Roll Over",
            summary:
              "Overhead articulation with controlled roll-down; requires strong core control and safe neck positioning.",
            link: "/docs/exercises/inversions-series/roll-over.html",
          },
          {
            id: "corkscrew",
            title: "Corkscrew",
            summary:
              "Rotational overhead articulation for obliques, hip control, and spinal coordination.",
            link: "/docs/exercises/inversions-series/corkscrew.html",
          },
          {
            id: "teaser",
            title: "Teaser on the Carriage",
            summary:
              "Advanced dynamic V-sit balance challenging abdominal strength and hip flexors; progress from supported variations.",
            link: "/docs/exercises/inversions-series/teaser.html",
          },
        ],
      },
      {
        id: "stretches-series",
        title: "Stretches & Cool Down",
        summary:
          "Restorative flexibility work, hip opening, spinal release, and dynamic recovery using carriage tension.",
        link: "/docs/exercises/stretches-series/index.html",
        children: [
          {
            id: "eves-lunge",
            title: "Eve's Lunge",
            summary:
              "Deep hip flexor and iliopsoas stretch utilizing moving carriage spring support.",
            link: "/docs/exercises/stretches-series/eves-lunge.html",
          },
          {
            id: "carriage-hamstring-stretch",
            title: "Carriage Hamstring Stretch",
            summary:
              "Active dynamic stretch targeting posterior leg length and hip articulation.",
            link: "/docs/exercises/stretches-series/carriage-hamstring-stretch.html",
          },
          {
            id: "lat-stretch",
            title: "Lat & Side Stretch",
            summary:
              "Lengthens latissimus dorsi and side body while keeping ribs supported.",
            link: "/docs/exercises/stretches-series/lat-side-stretch.html",
          },
          {
            id: "spinal-release",
            title: "Spinal Release / Child's Position",
            summary:
              "Supported release to decompress the spine and settle breath at the end of a session.",
            link: "/docs/exercises/stretches-series/spinal-release.html",
          },
        ],
      },
    ],
  },
  {
    key: "lessons",
    label: "Lesson Plans",
    description:
      "Structured teaching resources for private and group lessons, including pacing, progression, and class flow.",
    items: [
      {
        id: "private-lessons",
        title: "Private Lessons",
        summary:
          "One-on-one lesson plans with pacing, individualized progression, and clear session goals.",
        link: "/docs/lessons/private/index.html",
        children: [
          {
            id: "foundations-private",
            title: "Foundations Private",
            summary:
              "A beginner-friendly private lesson focused on breath, alignment, footwork, and basic carriage control.",
            link: "/docs/lessons/private/foundations.html",
          },
          {
            id: "intermediate-private",
            title: "Intermediate Private",
            summary:
              "A more dynamic private lesson for balance, strength, coordination, and smoother transitions.",
            link: "/docs/lessons/private/intermediate.html",
          },
          {
            id: "advanced-private",
            title: "Advanced Private",
            summary:
              "A challenging private lesson for athletic strength, advanced repertoire, and refined control.",
            link: "/docs/lessons/private/advanced.html",
          },
        ],
      },
      {
        id: "group-lessons",
        title: "Group Lessons",
        summary:
          "Classroom-ready lesson plans for shared sessions, coordination, and group flow.",
        link: "/docs/lessons/group/index.html",
        children: [
          {
            id: "beginner-group",
            title: "Beginner Group",
            summary:
              "A foundational group lesson with clear pacing, simple transitions, and safe setup.",
            link: "/docs/lessons/group/beginner.html",
          },
          {
            id: "full-body-group",
            title: "Full-Body Group",
            summary:
              "A balanced group lesson covering footwork, straps, long stretch, box work, and stretch.",
            link: "/docs/lessons/group/full-body.html",
          },
          {
            id: "athletic-group",
            title: "Athletic Group",
            summary:
              "A high-energy group lesson designed for strength, control, and flow while maintaining precision.",
            link: "/docs/lessons/group/athletic.html",
          },
        ],
      },
      {
        id: "lesson-templates",
        title: "Lesson Templates",
        summary:
          "Reusable lesson-planning templates for warm-up, footwork, straps, standing, core, and cool down segments.",
        link: "/docs/lessons/templates.html",
      },
    ],
  },
  {
    key: "foundations",
    label: "Anatomy & Biomechanics",
    description:
      "Practical anatomy, biomechanics, breathing, and common movement faults that keep teaching safe, effective, and purposeful.",
    items: [
      {
        id: "neutral-spine",
        title: "Neutral Spine",
        summary:
          "A balanced spinal alignment that supports the core while remaining mobile.",
        link: "/docs/foundations/anatomy-biomechanics.html#neutral-spine",
      },
      {
        id: "core-canister",
        title: "Core Canister",
        summary:
          "The diaphragm, abdominals, back extensors, and pelvic floor working together for breath and support.",
        link: "/docs/foundations/anatomy-biomechanics.html#core-canister",
      },
      {
        id: "breathing-mechanics",
        title: "Breathing Mechanics",
        summary:
          "How breath patterns influence ribcage mobility, trunk pressure, and movement quality.",
        link: "/docs/foundations/anatomy-biomechanics.html#breathing",
      },
      {
        id: "shoulders-back-and-down",
        title: "Shoulders Back and Down",
        summary:
          "Upper-body positioning that supports breathing, posture, and clean movement.",
        link: "/docs/foundations/anatomy-biomechanics.html#shoulders",
      },
      {
        id: "hips-balanced",
        title: "Hips Balanced",
        summary:
          "Pelvic alignment that creates a stable base and efficient force transfer.",
        link: "/docs/foundations/anatomy-biomechanics.html#hips",
      },
      {
        id: "joints-and-muscles",
        title: "Joints and Muscles",
        summary:
          "How the body is designed to move with control, mobility, and coordination.",
        link: "/docs/foundations/anatomy-biomechanics.html#joints-and-muscles",
      },
      {
        id: "doming",
        title: "Doming",
        summary:
          "How breath and core organization influence ribcage and abdominal support.",
        link: "/docs/foundations/anatomy-biomechanics.html#doming",
      },
      {
        id: "winging",
        title: "Winging",
        summary:
          "How scapular winging affects shoulder blade control and upper-body movement.",
        link: "/docs/foundations/anatomy-biomechanics.html#winging",
      },
      {
        id: "movement-faults",
        title: "Common Movement Faults",
        summary:
          "Common patterns such as rib flare, pelvic shifting, and breath holding, with practical corrections.",
        link: "/docs/foundations/anatomy-biomechanics.html#movement-faults",
      },
      {
        id: "why-this-matters",
        title: "Why This Matters",
        summary:
          "The importance of honoring anatomy and biomechanics in real Pilates work.",
        link: "/docs/foundations/anatomy-biomechanics.html#why-this-matters",
      },
      {
        id: "teaching-takeaway",
        title: "Teaching Takeaway",
        summary:
          "A practical framework for teaching alignment and movement with intention.",
        link: "/docs/foundations/anatomy-biomechanics.html#teaching-takeaway",
      },
    ],
  },
];