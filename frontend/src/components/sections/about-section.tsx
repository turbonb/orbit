const ABOUT_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  "Ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
] as const;

export function AboutSection() {
  return (
    <section id="about-section" className="page-section">
      <div className="container section-split-grid">
        <div>
          <h2 className="section-heading-large">About</h2>
        </div>
        <div className="section-description-columns">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
