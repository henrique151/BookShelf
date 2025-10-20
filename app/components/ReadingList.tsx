
import { Book } from "@/app/types/book";
import ReadingListItem from "./ReadingListItem";

interface ReadingListProps {
  books: Book[];
}

export default function ReadingList({ books }: ReadingListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Livros em Leitura</h2>
      <div className="space-y-4">
        {books.length > 0 ? (
          books.map((book) => <ReadingListItem key={book.id} book={book} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Nenhum livro em leitura no momento.</p>
        )}
      </div>
    </div>
  );
}
