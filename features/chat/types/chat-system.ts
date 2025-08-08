export interface IChatContainer {
  isOpen: boolean;
}

export interface IMessage {
  id: number;
  text: string;
  user: string;
}

export interface IChatBoxProps {
  messages: IMessage[];
}

export interface IErrors {
  message?: string;
  general?: string;
}

export interface IChatInputs {
  message: string;
}

export interface IFormState {
  errors: IErrors;
  success?: boolean;
  userMessage?: string;
  aiResponse?: string;
}

export interface IMessageProps {
  text: string;
  user: string;
  index: number;
}

export interface IMessageIconProps {
  user: string;
}

export interface IChatInputProps {
  sendMessage: any;
}
