import { IProjectLayout } from '@/utils/types/project';

export default function ProjectLayout({ children, modal }: IProjectLayout) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
