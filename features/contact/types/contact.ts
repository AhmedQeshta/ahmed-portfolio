import { BaseInfoResponse } from '@/sanity/lib/types';

export interface IBaseInfo {
  baseInfo: BaseInfoResponse;
}
export interface IErrors {
  name?: string;
  email?: string;
  message?: string;
  newsletter?: boolean | string;
  general?: string;
}

export interface IFormState {
  errors: IErrors;
  success?: boolean;
  message?: string;
}

export interface IContactInputs {
  name: string;
  email: string;
  message: string;
  newsletter?: boolean;
}

export interface ISuccessMessage {
  state: {
    message: string;
  };
}

export interface IDefaultInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'customStyle'> {
  handleInputChange?: any;
  displayErrors?: string;
  customStyle?: string;
}

export interface IDefaultTextarea
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'customStyle'> {
  handleInputChange: any;
  displayErrors?: string;
  customStyle?: string;
}

export interface IDefaultLabel
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'customStyle'> {
  title: string;
  htmlFor: string;
  customStyle?: string;
}

export interface ISubmitButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'customStyle'> {
  isPending: boolean;
  customStyle?: string;
}
