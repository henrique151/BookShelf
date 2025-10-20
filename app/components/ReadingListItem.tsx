"use client";

import Link from "next/link";
import { useState } from "react";
import { Book } from "@/app/types/book";
import { Button } from "@/components/ui/button";
import DeleteBookModal from "./DeleteBookModal";
import { deleteBook } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

interface ReadingListItemProps {
  book: Book;
}

export default function ReadingListItem({ book }: ReadingListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const progress = book.totalPages
    ? Math.round(((book.currentPage || 0) / book.totalPages) * 100)
    : 0;

  const handleDelete = async () => {
    await deleteBook(String(book.id));
    setIsModalOpen(false);
    router.refresh();
  };

  return (
    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-16 h-24 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Página {book.currentPage} de {book.totalPages}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
          {progress}%
        </p>
      </div>
      <div className="flex flex-col sm:flex-row ml-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <Link href={`/books/${book.id}`} passHref>
          <Button variant="outline" size="sm">
            Ver detalhes
          </Button>
        </Link>
      </div>
      <DeleteBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        bookTitle={book.title}
      />
    </div>
  );
}
