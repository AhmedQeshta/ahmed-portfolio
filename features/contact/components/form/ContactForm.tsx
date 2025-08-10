'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useContact } from '@/features/contact/hooks/useContact';
import SuccessMessage from '@/features/contact/components/form/SuccessMessage';
import SubmitButton from '@/features/contact/components/ui/SubmitButton';
import Label from '@/features/shard/components/form/Label';
import DefaultTextarea from '@/features/shard/components/form/DefaultTextarea';
import DefaultInput from '@/features/shard/components/form/DefaultInput';

export default function ContactForm() {
  const { formData, state, formAction, isPending, handleInputChange, handleSubmit, displayErrors } =
    useContact();

  // Show success message
  if (state?.success) return <SuccessMessage state={state} />;

  return (
    <div className="w-full">
      <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="space-y-2">
            <Label htmlFor="name" title="Full Name" customStyle="text-white font-medium" />
            <DefaultInput
              name="name"
              value={formData.name}
              handleInputChange={handleInputChange}
              placeholder="Enter your full name"
              displayErrors={displayErrors.name}
              customStyle="bg-white/5 border-white/20 hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg h-12 transition-all duration-300"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <div className="space-y-2">
            <Label htmlFor="email" title="Email Address" customStyle="text-white font-medium" />
            <DefaultInput
              name="email"
              type="email"
              value={formData.email}
              handleInputChange={handleInputChange}
              placeholder="Enter your email address"
              displayErrors={displayErrors.email}
              customStyle="bg-white/5 border-white/20 hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg h-12 transition-all duration-300"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="space-y-2">
            <Label htmlFor="message" title="Message" customStyle="text-white font-medium" />
            <DefaultTextarea
              name="message"
              rows={6}
              value={formData.message}
              handleInputChange={handleInputChange}
              placeholder="Tell me about your project, ideas, or how I can help you..."
              displayErrors={displayErrors.message}
              customStyle="bg-white/5 border-white/20 hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg resize-none transition-all duration-300"
            />
          </div>
        </ScrollAnimation>

        {displayErrors.general && (
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-red-400 text-sm font-medium">{displayErrors.general}</p>
              </div>
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation direction="up" delay={0.5}>
          <div className="pt-4">
            <SubmitButton
              isPending={isPending}
              customStyle="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:hover:scale-100 disabled:hover:shadow-none"
            />
          </div>
        </ScrollAnimation>

        {/* Additional Help Text */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div className="pt-4 border-t border-white/10">
            <p className="text-center text-sm text-text-secondary">
              By sending this message, you agree to be contacted regarding your inquiry.
              <br className="hidden sm:inline" />I respect your privacy and will never share your
              information.
            </p>
          </div>
        </ScrollAnimation>
      </form>
    </div>
  );
}
