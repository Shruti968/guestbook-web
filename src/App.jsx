import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import GuestbookStats from "./components/GuestbookStats.jsx";
import MessageForm from "./components/MessageForm.jsx";
import MessageList from "./components/MessageList.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";
import { useMessages } from "./hooks/useMessages.js";

export default function App() {
  const {
    messages,
    stats,
    loading,
    submitting,
    loadMore,
    hasMore,
    addMessage,
    updateMessage,
    deleteMessage,
  } = useMessages();

  const [toasts, setToasts] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const pushToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const handleSubmit = async (payload) => {
    await addMessage(payload);
    pushToast("Thank you! Your message has been added to the guestbook.");
  };

  const handleUpdate = async (id, payload) => {
    await updateMessage(id, payload);
    pushToast("Your message has been updated.");
  };

  const handleRequestDelete = (message) => setDeleteTarget(message);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteMessage(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    pushToast("Your message has been removed.", "info");
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <GuestbookStats stats={stats} />
        <MessageForm onSubmit={handleSubmit} submitting={submitting} />
        <MessageList
          messages={messages}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onEdit={handleUpdate}
          onDelete={handleRequestDelete}
        />
        <AboutSection />
      </main>
      <Footer />
      <ConfirmDeleteModal
        message={deleteTarget}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
      <Toast toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
    </div>
  );
}
