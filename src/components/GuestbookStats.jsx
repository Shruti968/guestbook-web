import { MessageSquare, CalendarDays, Users } from "lucide-react";

export default function GuestbookStats({ stats }) {
  const items = [
    { icon: MessageSquare, label: "Total Messages", value: stats.totalMessages },
    { icon: CalendarDays, label: "Messages This Month", value: stats.messagesThisMonth },
    { icon: Users, label: "Community Members", value: stats.members },
  ];

  return (
    <section className="stats container" aria-label="Guestbook statistics">
      <p className="stats__note">
        <em>Demonstration data — live counts will appear once the backend is connected.</em>
      </p>
      <div className="stats__grid">
        {items.map(({ icon: Icon, label, value }) => (
          <div className="stats__item" key={label}>
            <span className="stats__icon" aria-hidden="true">
              <Icon size={20} strokeWidth={1.7} />
            </span>
            <span className="stats__value">{value}</span>
            <span className="stats__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
