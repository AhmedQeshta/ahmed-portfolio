export interface IChatContainer {
  isOpen: boolean;
}

export interface IMessage {
  id: number;
  text: string;
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
  message?: string;
}
