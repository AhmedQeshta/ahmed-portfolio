export interface ErrorHandleType {
  id: string;
  title: string;
  description: string;
}

export default async function ErrorHandle({ id, title, description }: ErrorHandleType) {
  return (
    <section id={id} className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 gradient-text">{title}</h2>
        <div className="text-center text-red-400">
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
