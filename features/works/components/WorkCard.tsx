import Card from './ui/Card';
import { IWorksResponse } from '@/features/works/types/work';

export default function WorkCard({ works }: IWorksResponse) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {works.map((work) => (
        <Card key={work._id} work={work} />
      ))}
    </div>
  );
}
