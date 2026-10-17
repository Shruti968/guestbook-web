import { BookOpenText } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="navbar__brand-icon" aria-hidden="true">
            <BookOpenText size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="footer__name">Gather &amp; Remember</p>
            <p className="footer__tagline">Made for moments worth remembering.</p>
          </div>
        </div>
        <nav className="footer__links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#guestbook">Guestbook</a>
          <a href="#about">About</a>
        </nav>
        <p className="footer__copyright">
          &copy; {year} Gather &amp; Remember. A college microservices project.
        </p>
      </div>
    </footer>
  );
}
