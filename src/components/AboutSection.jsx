import { Leaf } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="about container" id="about">
      <div className="about__visual" aria-hidden="true">
        <div className="about__illustration">
          <Leaf size={56} strokeWidth={1.2} />
          <span className="about__illustration-ring" />
        </div>
      </div>
      <div className="about__content">
        <p className="about__eyebrow">Why a Guestbook?</p>
        <h2>Some moments deserve more than a passing glance.</h2>
        <p>
          This guestbook brings together the thoughts, memories, and kind words of everyone who
          visits. Every message becomes a small part of a shared story — one that grows a little
          warmer with each new entry.
        </p>
        <p className="about__note">
          Built as a college project exploring microservices and Docker containerization:
          a React frontend, a Python Flask API, and a PostgreSQL database, each living in its
          own container.
        </p>
      </div>
    </section>
  );
}
