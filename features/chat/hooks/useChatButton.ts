import { useState } from 'react';

export default function useChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = () => setIsOpen((prev) => !prev);
  return { isOpen, openChat };
}
