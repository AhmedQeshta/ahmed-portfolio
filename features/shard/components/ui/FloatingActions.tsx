import ChatButton from '@/features/chat/components/ChatButton';
import ScrollTopButton from '@/features/shard/components/ui/ScrollTopButton';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';

export default async function FloatingActions() {
  try {
    const featureChat = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['featureChat'],
    });

    // get featureChat that have name chat-system and status publish
    const chatSystem = featureChat.find(
      (feature) => feature.name === 'chat-system' && feature.status === 'publish',
    );

    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Chat Message Button */}
        {chatSystem && <ChatButton />}
        {/* Scroll to Top Button */}
        <ScrollTopButton />
      </div>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'floating-actions'}
        description={'Failed to load Floating Actions. Please try again later.'}
      />
    );
  }
}
