const experience = [
  { role: "Product Manager, ImagineArt", when: "Apr 2026 – present" },
  { role: "Product Engineer Intern, LootMart", when: "Feb – Apr 2026" },
  { role: "Full-stack Developer Intern, WeZero Studios", when: "Oct – Dec 2025" },
];

export function About() {
  return (
    <section className="wrap section" id="about" aria-labelledby="about-title">
      <h2 id="about-title" data-reveal="">
        About
      </h2>
      <div className="about-grid">
        <div>
          <p className="first" data-highlightable="" data-reveal="">I’ve been a product manager since April 2026, mostly on AI features, from the first spec through to launch.</p>
          <p data-highlightable="" data-reveal="">
            Before that I worked on product engineering at LootMart, on caching, pagination and the admin dashboard, and built websites for
            clients at WeZero Studios.
          </p>
          <p data-highlightable="" data-reveal="">
            I like projects where I can write the spec and then help build it. Most of what I make outside work is tooling for coding agents.
          </p>
        </div>
        <ul className="cv">
          {experience.map((e) => (
            <li key={e.role} data-reveal="">
              <strong>{e.role}</strong>
              <span>{e.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
