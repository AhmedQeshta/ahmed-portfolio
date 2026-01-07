import { sendMessage } from '@/features/contact/utils/actions/contact';
import { useState, useActionState, FormEvent } from 'react';
import { z } from 'zod';
import { IContactInputs, IErrors } from '@/features/contact/types/contact';
import { contactSchema } from '@/features/contact/utils/schema';
import { useRecaptcha } from '@/features/contact/hooks/useRecaptcha';

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
    newsletter: true,
  });
  const [clientErrors, setClientErrors] = useState<IErrors>({});

  // Initialize reCAPTCHA hook
  const { isReady, executeRecaptcha } = useRecaptcha();

  // Handle input changes and real-time validation
  const handleInputChange = (field: keyof IContactInputs, value: string | boolean) => {
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

  // Handle form submission with client-side validation and reCAPTCHA
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataObj = new FormData(event.currentTarget);
    const data = {
      name: formDataObj.get('name') as string,
      email: formDataObj.get('email') as string,
      message: formDataObj.get('message') as string,
      newsletter: !!formDataObj.get('newsletter') as boolean,
    };

    // Client-side validation
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
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

    // Execute reCAPTCHA v3 and attach token to form data
    // If reCAPTCHA is not ready or fails, still submit (graceful degradation)
    // Server will verify the token
    const recaptchaToken = isReady ? await executeRecaptcha('contact_submit') : null;

    if (recaptchaToken) {
      formDataObj.append('recaptcha_token', recaptchaToken);
    }

    // Submit form with reCAPTCHA token
    formAction(formDataObj);
  };

  const resetForm = () => {
    // Reset form data to initial state
    setFormData({
      name: '',
      email: '',
      message: '',
      newsletter: true,
    });

    // Clear all client-side errors
    setClientErrors({});

    // Reset server state by calling formAction with a special reset flag
    // This will trigger the action and reset the state back to initialStatus
    const resetFormData = new FormData();
    resetFormData.append('_reset', 'true');
    formAction(resetFormData);
  };

  // Combine server and client errors (client errors take precedence)
  const displayErrors = {
    name: clientErrors.name || (state?.errors as IErrors)?.name,
    email: clientErrors.email || (state?.errors as IErrors)?.email,
    message: clientErrors.message || (state?.errors as IErrors)?.message,
    general: (state?.errors as IErrors)?.general,
  };

  return {
    formData,
    state,
    formAction,
    isPending,
    handleInputChange,
    handleSubmit,
    displayErrors,
    resetForm,
  };
}
