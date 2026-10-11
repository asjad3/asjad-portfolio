import { groups } from "@/content/work";

export function MoreProjects() {
  return (
    <section className="wrap section" id="more" aria-labelledby="more-title">
      <h2 id="more-title">More projects</h2>
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="list-head">{g.title}</h3>
          <ul className="list">
            {g.items.map((item) => (
              <li key={item.name}>
                <h4 className="name">{item.name}</h4>
                <p data-highlightable="">{item.description}</p>
                <span className="role">{item.role}</span>
                {item.link ? (
                  <a className="go link" href={item.link.href}>
                    {item.link.label} ↗
                  </a>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
