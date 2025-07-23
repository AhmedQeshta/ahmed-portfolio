import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import ProfileImage from '@/features/contact/components/information/ProfileImage';
import Availability from '@/features/contact/components/information/Availability';
import HeadLine from '@/features/contact/components/information/Headline';
import ContactMethods from '@/features/contact/components/information/ContactMethods';
import TimeInfo from '@/features/contact/components/information/TimeInfo';
import { IBaseInfo } from '@/features/contact/types/contact';

export default function ContactInfo({ baseInfo }: IBaseInfo) {
  return (
    <div className="h-full flex flex-col">
      {/* Profile Section */}
      <ScrollAnimation direction="down" delay={0.1}>
        <div className="text-center mb-8">
          {/* Profile Image */}
          <ProfileImage baseInfo={baseInfo} />

          {/* Availability Status */}

          <Availability baseInfo={baseInfo} />
        </div>
      </ScrollAnimation>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Headline */}
        <HeadLine />

        {/* Contact Methods Grid */}
        <ContactMethods baseInfo={baseInfo} />

        {/* Response Time Info */}
        <TimeInfo />
      </div>
    </div>
  );
}
