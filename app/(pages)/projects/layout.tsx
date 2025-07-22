import { IProjectLayout } from '@/features/projects/types/project';

export default function ProjectLayout({ children, modal }: IProjectLayout) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
