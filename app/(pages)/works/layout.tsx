import { IWorkLayout } from '@/features/works/types/work';

export default function WorkLayout({ children, modal }: IWorkLayout) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
