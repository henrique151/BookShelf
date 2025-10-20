
import { Book } from "@/app/types/book";

interface StatsDashboardProps {
  books: Book[];
}

export default function StatsDashboard({ books }: StatsDashboardProps) {
  const totalPagesRead = books.reduce((acc, book) => {
    if (book.status === 'READ' || book.status === 'FINISHED') {
      return acc + (book.totalPages || 0);
    } else if (book.status === 'READING') {
      return acc + (book.currentPage || 0);
    }
    return acc;
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Estatísticas</h2>
      <div className="flex items-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">Total de páginas lidas:</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 ml-2">{totalPagesRead.toLocaleString()}</p>
      </div>
    </div>
  );
}
