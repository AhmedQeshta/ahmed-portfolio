import { IWorkLayout } from '@/utils/types/work';

export default function WorkLayout({ children, modal }: IWorkLayout) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
