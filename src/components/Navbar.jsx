import { useEffect, useState } from "react";
import { BookOpenText, Menu, X, PenLine } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#guestbook", label: "Guestbook" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  const scrollToForm = () => {
    closeMenu();
    document.querySelector("#leave-a-message")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="#home" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-icon" aria-hidden="true">
            <BookOpenText size={20} strokeWidth={1.8} />
          </span>
          <span className="navbar__brand-name">Gather &amp; Remember</span>
        </a>

        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={scrollToForm}>
            <PenLine size={15} aria-hidden="true" />
            Leave a Message
          </button>
          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="navbar__mobile">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--primary" onClick={scrollToForm}>
            <PenLine size={16} aria-hidden="true" />
            Leave a Message
          </button>
        </div>
      )}
    </header>
  );
}
