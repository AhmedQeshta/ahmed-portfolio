import { useState } from 'react';

export default function useChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, openChat };
}
