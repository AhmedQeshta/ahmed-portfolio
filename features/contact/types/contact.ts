import { BaseInfoResponse } from "@/sanity/lib/types";

export interface IBaseInfo {
  baseInfo: BaseInfoResponse;
}
export interface IErrors {
  name?: string;
  email?: string;
  message?: string;
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
}

export interface ISuccessMessage {
  state: {
    message: string;
  };
}

export interface IDefaultInput extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInputChange: any;
  displayErrors?: string;
  customStyle?: string;
}

export interface IDefaultTextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleInputChange: any;
  displayErrors?: string;
  customStyle?: string;
}

export interface IDefaultLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  htmlFor: string;
  customStyle?: string;
}

export interface ISubmitButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  customStyle?: string;
}
