import { BaseInfoResponse, Technology } from '@/sanity/lib/types';

export interface IBaseInfoResponse {
  baseInfo: BaseInfoResponse;
}

export interface ITypewriterProps {
  titles: string[];
}

export interface IBackgroundEffectProps {
  mounted: boolean;
}

export interface ITechnologiesOrbitProps {
  orbitTechnologies: Technology[];
}

export interface IProfilePictureProps {
  profilePicture: string;
  name: string;
}

export interface ITechnologiesOrbitItemProps {
  technology: Technology;
  top: number;
  left: number;
  delay: number;
}

export interface ICalculatePositionProps {
  index: number;
  orbitTechnologies: Technology[];
}
