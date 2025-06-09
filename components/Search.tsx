import Form from 'next/form';

interface SearchInterface {
  action: string;
}

const Search = async ({ action }: SearchInterface) => {
  // const { query } = await searchParams; // get that
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Form action={`${action}`} className="flex gap-2">
        <input
          placeholder="Search products"
          type="search"
          name="query"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Search;
