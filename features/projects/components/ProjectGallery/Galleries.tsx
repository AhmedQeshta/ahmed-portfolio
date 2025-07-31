import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import GalleryItem from './GalleryItem';
import { IGalleriesProps } from '@/features/projects/types/project';

export default function Galleries({ gallery, title, openModal }: IGalleriesProps) {
  return (
    <ScrollAnimation direction="down" delay={0.3}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((image, index) => (
          <GalleryItem
            key={image.toString()}
            image={image}
            title={title}
            index={index}
            openModal={openModal}
          />
        ))}
      </div>
    </ScrollAnimation>
  );
}
