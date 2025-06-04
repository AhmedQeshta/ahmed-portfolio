'use server';

export interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export interface FormState {
  errors: Errors;
}

export async function sendMessage(prevState: FormState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // use zod instanse of this error handel
  const errors: Errors = {};

  if (!name) {
    errors.name = 'name is required';
  }

  if (!email) {
    errors.email = 'email is required';
  }

  if (!message) {
    errors.message = 'message is required';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  console.log('====================================');
  console.log('send a message via email to my email');
  console.log('====================================');

  // show message

  // send message
  // window.location.href = `mailto:ahmed.qeshta.dev@gmail.com?subject=${email}&body=Hi my name is ${name}. ${message} (${email}))`;

  return { name, email, message };
}
