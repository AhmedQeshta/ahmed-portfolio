'use client';
import { MessageCircle } from 'lucide-react';

export default function ChatButton() {
  const openChat = () => {
    // You can replace this with your actual chat implementation
    // For now, it could open a contact form or redirect to contact page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to contact page or open a contact modal
      window.location.href = '/contact';
    }
  };

  return (
    <button
      onClick={openChat}
      className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg backdrop-blur-sm border border-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25"
      aria-label="Open chat">
      <MessageCircle
        size={20}
        className="group-hover:scale-110 transition-transform duration-200"
      />
    </button>
  );
}
