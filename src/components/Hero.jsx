import { ArrowDown, PenLine } from "lucide-react";

export default function Hero() {
  const scrollToForm = () =>
    document.querySelector("#leave-a-message")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMessages = () =>
    document.querySelector("#guestbook")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero container" id="home">
      <div className="hero__content">
        <p className="hero__eyebrow">A Place for Your Words</p>
        <h1 className="hero__title">
          Every Visit Leaves a <em>Story</em>.
        </h1>
        <p className="hero__subtitle">
          A little space for kind words, shared memories, and moments worth remembering.
          Leave a note and become part of our story.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={scrollToForm}>
            <PenLine size={17} aria-hidden="true" />
            Sign Our Guestbook
          </button>
          <button type="button" className="btn btn--link" onClick={scrollToMessages}>
            Read the Stories <ArrowDown size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="hero__media">
        <figure className="hero__figure">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
            alt="A handwritten letter with a fountain pen resting on warm paper"
            loading="eager"
          />
          <figcaption>Handwritten words, kept forever.</figcaption>
        </figure>
        <div className="hero__card" aria-hidden="true">
          <span className="hero__card-quote">&ldquo;</span>
          <p>Small moments become wonderful memories.</p>
        </div>
      </div>
    </section>
  );
}
