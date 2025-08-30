import { IBaseInfoResponse } from '@/features/header/types/header';
import Typewriter from '@/features/header/components/ui/Typewriter';
import Name from '@/features/header/components/ui/Name';
import BioContent from '@/features/header/components/ui/BioContent';

export default function BaseInfo({ baseInfo }: IBaseInfoResponse) {
  const { name, bio, title, cvUrl } = baseInfo;

  return (
    <div className="space-y-10">
      {/* Main Heading */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Name name={name} />

          {/* Subtitle/Role */}
          <div className="space-y-3">
            <Typewriter titles={title} />
          </div>
        </div>

        {/* Bio Content */}
        <BioContent bio={bio} cvUrl={cvUrl} />
      </div>
    </div>
  );
}
