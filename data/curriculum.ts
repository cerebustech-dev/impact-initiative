export type ReadingType = "article" | "paper" | "essay" | "lecture" | "book";

export interface Reading {
  id: string;
  title: string;
  author: string;
  summary: string;
  url: string;
  type: ReadingType;
}

export interface SlideResource {
  title: string;
  url: string;
  type: "pdf" | "google-slides";
}

export interface Month {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  unlockDate: string; // ISO date string
  readings: Reading[];
  slides?: SlideResource[];
}

export interface ProgramConfig {
  title: string;
  tagline: string;
  partner: string;
  startDate: string;
}

export const PROGRAM_CONFIG: ProgramConfig = {
  title: "The Impact Initiative",
  tagline: "A 6-month leadership development journey for the leaders who shape what comes next.",
  partner: "Walsh College",
  startDate: "2026-02-01",
};

export const MONTHS: Month[] = [
  {
    id: "month-1",
    number: 1,
    title: "The Landscape",
    subtitle: "Understanding where we are",
    description:
      "We begin with two foundational perspectives: a legendary AI researcher's hard-won lesson about what actually works in AI, and a practical look at why management is about to become a superpower in an AI-powered world.",
    unlockDate: "2026-02-01",
    readings: [
      {
        id: "r1-1",
        title: "The Bitter Lesson",
        author: "Rich Sutton",
        summary:
          "A brief, paradigm-shifting essay from one of AI's founding researchers. Sutton argues that the biggest lesson from 70 years of AI research is that general methods leveraging computation win over human-designed approaches — every single time.",
        url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
        type: "essay",
      },
      {
        id: "r1-2",
        title: "Why Management Is Becoming an AI Superpower",
        author: "Ethan Mollick",
        summary:
          "Mollick makes the case that managers — not engineers — may be the biggest beneficiaries of AI. The skills that matter most (delegation, quality control, orchestration) are exactly what AI demands.",
        url: "https://www.oneusefulthing.org/p/management-as-ai-superpower",
        type: "article",
      },
    ],
  },
  {
    id: "month-2",
    number: 2,
    title: "The Vision",
    subtitle: "What the optimists see",
    description:
      "Two of the most ambitious thinkers in AI lay out their visions for what this technology could become — from curing diseases to solving climate change. These are the bull cases, presented with intellectual rigor.",
    unlockDate: "2026-03-01",
    readings: [
      {
        id: "r2-1",
        title: "Machines of Loving Grace",
        author: "Dario Amodei",
        summary:
          "The CEO of Anthropic paints a detailed picture of how AI could transform biology, neuroscience, economic development, and governance — if we get the deployment right. A rare optimistic essay from someone deeply concerned about risks.",
        url: "https://darioamodei.com/machines-of-loving-grace",
        type: "essay",
      },
      {
        id: "r2-2",
        title: "Nobel Prize Lecture: AI for Scientific Discovery",
        author: "Demis Hassabis",
        summary:
          "DeepMind's co-founder and CEO delivers his Nobel Prize lecture on AlphaFold and the future of AI-driven science. A masterclass in how AI is already revolutionizing our understanding of biology.",
        url: "https://www.youtube.com/watch?v=MCYPH4eB3JA",
        type: "lecture",
      },
    ],
  },
  {
    id: "month-3",
    number: 3,
    title: "The Risks",
    subtitle: "What could go wrong",
    description:
      "Every powerful technology creates new risks. We examine two very different critiques — one from an AI company CEO on the challenges of deploying transformative technology, and a landmark academic paper on the dangers of large language models.",
    unlockDate: "2026-04-01",
    readings: [
      {
        id: "r3-1",
        title: "The Adolescence of AI Technology",
        author: "Dario Amodei",
        summary:
          "Amodei argues we're in an 'adolescent' phase of AI — powerful enough to cause real harm, not yet mature enough to be reliably safe. A sober look at the messy middle period we're living through right now.",
        url: "https://darioamodei.com/the-adolescence-of-ai-technology",
        type: "essay",
      },
      {
        id: "r3-2",
        title: "On the Dangers of Stochastic Parrots",
        author: "Emily Bender, Timnit Gebru, et al.",
        summary:
          "The paper that shook Google and became a touchstone for AI ethics. Bender and Gebru argue that large language models carry environmental costs, encode biases, and create an illusion of understanding that can cause real harm.",
        url: "https://dl.acm.org/doi/10.1145/3442188.3445922",
        type: "paper",
      },
    ],
  },
  {
    id: "month-4",
    number: 4,
    title: "The Debate",
    subtitle: "Competing worldviews",
    description:
      "AI discourse is full of strong opinions. This month we read three radically different perspectives — a venture capitalist's techno-optimism, a security researcher's alarm about an intelligence explosion, and a leading AI scientist's contrarian take on where we actually are.",
    unlockDate: "2026-05-01",
    readings: [
      {
        id: "r4-1",
        title: "Why AI Will Save the World",
        author: "Marc Andreessen",
        summary:
          "Silicon Valley's most prominent venture capitalist makes his case for unbridled AI optimism. Provocative, polarizing, and worth understanding — this is the worldview driving billions in AI investment.",
        url: "https://a16z.com/ai-will-save-the-world/",
        type: "essay",
      },
      {
        id: "r4-2",
        title: "Situational Awareness",
        author: "Leopold Aschenbrenner",
        summary:
          "A former OpenAI researcher argues that superintelligence is coming by 2027 and the world isn't ready. Dense, detailed, and alarming — the most talked-about AI document of 2024.",
        url: "https://situational-awareness.ai/",
        type: "essay",
      },
      {
        id: "r4-3",
        title: "AI: The Road Ahead",
        author: "Yann LeCun",
        summary:
          "Meta's Chief AI Scientist pushes back on both the hype and the doom. In this NUS lecture, LeCun argues that current LLMs are fundamentally limited and that the path to human-level AI requires entirely new architectures.",
        url: "https://www.youtube.com/watch?v=YD6rO_sdOOE",
        type: "lecture",
      },
    ],
  },
  {
    id: "month-5",
    number: 5,
    title: "The Practice",
    subtitle: "Making it real",
    description:
      "Theory meets practice. We shift from understanding AI to using it — learning how to think alongside AI systems and how to build workflows that make you and your team genuinely more effective.",
    unlockDate: "2026-06-01",
    readings: [
      {
        id: "r5-1",
        title: "Thinking Like an AI",
        author: "Ethan Mollick",
        summary:
          "Mollick breaks down how to work with AI effectively — not by learning prompt engineering tricks, but by understanding how these systems actually process information and where they fail.",
        url: "https://www.oneusefulthing.org/p/thinking-like-an-ai",
        type: "article",
      },
      {
        id: "r5-2",
        title: "Co-Intelligence: Living and Working with AI",
        author: "Ethan Mollick",
        summary:
          "The definitive practical guide to AI for knowledge workers. Mollick draws on extensive research to show how AI changes creativity, education, and work — with concrete strategies you can use immediately.",
        url: "https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/",
        type: "book",
      },
    ],
  },
  {
    id: "month-6",
    number: 6,
    title: "The End & The Beginning",
    subtitle: "What we've learned, where we're going",
    description:
      "We close by looking forward. After five months of reading, debating, and building shared mental models, we turn everything we've learned into a lens for what comes next. What trends are accelerating? What surprises are still ahead? And what does it mean to lead well in a world that keeps changing faster than the org chart?",
    unlockDate: "2026-07-01",
    readings: [],
  },
];
