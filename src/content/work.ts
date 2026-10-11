export type Item = {
  name: string;
  description: string;
  role: string;
  link?: { label: string; href: string };
};

export const groups: { title: string; items: Item[] }[] = [
  {
    title: "At ImagineArt",
    items: [
      {
        name: "Imagine Echo",
        description: "Takes the Imagine Computer product line into voice. In progress.",
        role: "Product manager · 2026",
      },
      {
        name: "Campaign Director",
        description: "An open-source agent that turns a brief into a campaign video. I ran the launch, including ten influencer videos and paid social.",
        role: "Product manager · 2026",
        link: { label: "GitHub", href: "https://github.com/Vyro-ai/imagine-campaign-director" },
      },
      {
        name: "AI Trip Planner",
        description: "Trip planning in chat, with the itinerary laid out on an interactive 3D map.",
        role: "Product manager · 2026",
      },
    ],
  },
  {
    title: "On my own",
    items: [
      {
        name: "toolsmith",
        description: "A design for an agent that builds its own API connectors when it needs one, tests them, then uses them.",
        role: "Design doc · 2026",
        link: { label: "GitHub", href: "https://github.com/asjad3/toolsmith" },
      },
      {
        name: "Grabpic",
        description: "Upload the photos from an event, then find every one you’re in with a single selfie. Built at Vyrothon 2026.",
        role: "Hackathon · 2026",
        link: { label: "Website", href: "https://vyro-thon.vercel.app" },
      },
      {
        name: "LLM fusion study",
        description: "An experiment testing whether a panel of language models with a judge beats a single frontier model.",
        role: "Research · 2026",
        link: { label: "GitHub", href: "https://github.com/asjad3/ml-paper" },
      },
      {
        name: "MarkItDown",
        description: "A merged fix to Microsoft’s document converter so pipes and line breaks survive the trip from CSV to Markdown.",
        role: "Open source · 2026",
        link: { label: "Pull request", href: "https://github.com/microsoft/markitdown/pull/2266" },
      },
    ],
  },
];
