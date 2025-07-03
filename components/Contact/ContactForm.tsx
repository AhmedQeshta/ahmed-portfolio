'use client';

import ScrollAnimation from '../ui/ScrollAnimation';
import { useContact } from '@/hooks/useContact';
import SuccessMessage from '@/components/Contact/Features/SuccessMessage';
import DefaultInput from '@/components/ui/DefaultInput';
import Label from '@/components/ui/Label';
import DefaultTextarea from '@/components/ui/DefaultTextarea';
import SubmitButton from '@/components/ui/SubmitButton';

export default function ContactForm() {
  const { formData, state, formAction, isPending, handleInputChange, handleSubmit, displayErrors } =
    useContact();
  // Show success message
  if (state?.success) return <SuccessMessage state={state} />;

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <Label htmlFor="name" title="Name" />

          <DefaultInput
            name="name"
            value={formData.name}
            handleInputChange={handleInputChange}
            placeholder="Enter Your Name"
            displayErrors={displayErrors.name}
          />
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <Label htmlFor="email" title="Email" />

          <DefaultInput
            name="email"
            type="email"
            value={formData.email}
            handleInputChange={handleInputChange}
            placeholder="Enter Your Email"
            displayErrors={displayErrors.email}
          />
        </div>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div>
          <Label htmlFor="message" title="Message" />
          <DefaultTextarea
            name="message"
            rows={4}
            value={formData.message}
            handleInputChange={handleInputChange}
            placeholder="Your message …"
            displayErrors={displayErrors.message}
          />
        </div>
      </ScrollAnimation>

      {displayErrors.general && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
          <p className="text-red-400 text-sm">{displayErrors.general}</p>
        </div>
      )}

      <SubmitButton isPending={isPending} />
    </form>
  );
}
