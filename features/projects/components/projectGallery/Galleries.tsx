import GalleryItem from './GalleryItem';
import { IGalleriesProps } from '@/features/projects/types/project';

export default function Galleries({ gallery, title, openModal }: IGalleriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {gallery.map((file, index) => {
        const key = typeof file === 'string' ? file : `${file.type}-${file.url}`;
        return (
          <GalleryItem key={key} file={file} title={title} index={index} openModal={openModal} />
        );
      })}
    </div>
  );
}
