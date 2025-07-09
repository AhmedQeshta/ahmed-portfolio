import { sendMessage } from '@/utils/actions/contact';
import { useState, useActionState, FormEvent } from 'react';
import { z } from 'zod';
import { IContactInputs, IErrors } from '@/utils/types/contact';

// Client-side validation schema (matches server-side)
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').trim(),
  message: z.string().min(1, 'Message is required').trim(),
});

export function useContact() {
  const initialStatus = {
    errors: {},
    success: false,
    message: '',
  } as const;

  const [state, formAction, isPending] = useActionState(sendMessage, initialStatus);
  const [formData, setFormData] = useState<IContactInputs>({
    name: '',
    email: '',
    message: '',
  });
  const [clientErrors, setClientErrors] = useState<IErrors>({});

  // Handle input changes and real-time validation
  const handleInputChange = (field: keyof IContactInputs, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear previous client error for this field
    if (clientErrors[field]) {
      setClientErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Validate single field
    try {
      const fieldSchema = z.object({ [field]: contactSchema.shape[field] });
      fieldSchema.parse({ [field]: value });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message;
        if (fieldError) {
          setClientErrors((prev) => ({ ...prev, [field]: fieldError }));
        }
      }
    }
  };

  // Handle form submission with client-side validation
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formDataObj = new FormData(event.currentTarget);
    const data = {
      name: formDataObj.get('name') as string,
      email: formDataObj.get('email') as string,
      message: formDataObj.get('message') as string,
    };

    // Client-side validation
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      event.preventDefault();
      const errors: IErrors = {};

      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof IErrors;
        if (field && field !== 'general') {
          errors[field] = error.message;
        }
      });

      setClientErrors(errors);
      return;
    }

    // Clear client errors if validation passes
    setClientErrors({});
  };

  // Combine server and client errors (client errors take precedence)
  const displayErrors = {
    name: clientErrors.name || (state?.errors as IErrors)?.name,
    email: clientErrors.email || (state?.errors as IErrors)?.email,
    message: clientErrors.message || (state?.errors as IErrors)?.message,
    general: (state?.errors as IErrors)?.general,
  };

  return { formData, state, formAction, isPending, handleInputChange, handleSubmit, displayErrors };
}
