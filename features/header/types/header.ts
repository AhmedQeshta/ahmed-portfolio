import { BaseInfoResponse, Technology } from '@/sanity/lib/types';

export interface IBaseInfoResponse {
  baseInfo: BaseInfoResponse;
}

export interface ITypewriterProps {
  titles: string[];
}

export interface IBackgroundEffectsProps {
  mounted: boolean;
}

export interface ITechnologyOrbitProps {
  orbitTechnologies: Technology[];
  mounted: boolean;
}

export interface IProfilePictureProps {
  profilePicture: string;
  name: string;
}

export interface IOrbitItemProps {
  index: number;
  orbitTechnologies: Technology[];
  windowWidth: number;
}
