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