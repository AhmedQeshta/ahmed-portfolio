'use client';

import { useContact } from '@/features/contact/hooks/useContact';
import SuccessMessage from '@/features/contact/components/form/SuccessMessage';
import SubmitButton from '@/features/contact/components/ui/SubmitButton';
import Label from '@/features/shard/components/form/Label';
import DefaultTextarea from '@/features/shard/components/form/DefaultTextarea';
import DefaultInput from '@/features/shard/components/form/DefaultInput';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ContactForm() {
  const {
    formData,
    resetForm,
    state,
    formAction,
    isPending,
    handleInputChange,
    handleSubmit,
    displayErrors,
  } = useContact();

  const { isDark } = useTheme();

  // Show success message
  if (state?.success) return <SuccessMessage state={state} resetForm={resetForm} />;

  return (
    <div className="w-full">
      <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <div className="space-y-1">
            <Label
              htmlFor="name"
              title="Full Name"
              customStyle={`${isDark ? 'text-white' : 'text-purple-600'} font-medium`}
            />
            <DefaultInput
              name="name"
              value={formData.name}
              handleInputChange={handleInputChange}
              placeholder="Enter your full name"
              displayErrors={displayErrors.name}
              customStyle={`${isDark ? 'bg-white/5 border-white/20' : 'text-purple-500 bg-purple-500/5 border-purple-500/20'}  hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg h-12 transition-all duration-300`}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="space-y-1">
            <Label
              htmlFor="email"
              title="Email Address"
              customStyle={`${isDark ? 'text-white' : 'text-purple-600'} font-medium`}
            />
            <DefaultInput
              name="email"
              type="email"
              value={formData.email}
              handleInputChange={handleInputChange}
              placeholder="Enter your email address"
              displayErrors={displayErrors.email}
              customStyle={`${isDark ? 'bg-white/5 border-white/20' : 'text-purple-500 bg-purple-500/5 border-purple-500/20'} hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg h-12 transition-all duration-300`}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="space-y-1">
            <Label
              htmlFor="message"
              title="Message"
              customStyle={`${isDark ? 'text-white' : 'text-purple-600'} font-medium`}
            />
            <DefaultTextarea
              name="message"
              rows={6}
              value={formData.message}
              handleInputChange={handleInputChange}
              placeholder="Tell me about your project, ideas, or how I can help you..."
              displayErrors={displayErrors.message}
              customStyle={`${isDark ? 'bg-white/5 border-white/20' : 'text-purple-500 bg-purple-500/5 border-purple-500/20'} hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg resize-none transition-all duration-300`}
            />
          </div>
        </div>

        <div className="relative">
          <div
            className={`flex items-start gap-4 p-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-200/15 border-purple-200/30'} border  rounded-lg hover:border-purple-400/30 transition-all duration-300 group`}>
            <div className="relative flex-shrink-0">
              <input
                id="newsletter"
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={(e) => {
                  handleInputChange('newsletter', e.target.checked);
                }}
                className={`w-5 h-5 border-2 ${isDark ? 'border-white/30' : 'border-purple-400/30'}  rounded-md bg-transparent focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent checked:bg-purple-500 checked:border-purple-500 checked:hover:bg-purple-600 transition-all duration-200 cursor-pointer appearance-none relative`}
              />
              {formData.newsletter && (
                <svg
                  className={`absolute inset-0 w-5 h-5 text-white pointer-events-none flex items-center justify-center`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <Label
                htmlFor="newsletter"
                title="Subscribe to my newsletter"
                customStyle={`${isDark ? 'text-white group-hover:text-purple-300' : 'text-purple-500 group-hover:text-purple-500/80'} font-semibold text-base cursor-pointer  transition-colors duration-200`}
              />
              <p
                className={`text-sm ${isDark ? 'text-white/70 ' : 'text-purple-500/80'} mt-1 leading-relaxed`}>
                Get updates about new projects, tech insights, and exclusive content delivered to
                your inbox.
              </p>
            </div>
          </div>
        </div>

        {displayErrors.general && (
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
        )}

        <div className="pt-4">
          <SubmitButton
            isPending={isPending}
            customStyle="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:hover:scale-100 disabled:hover:shadow-none"
          />
        </div>
      </form>
    </div>
  );
}
