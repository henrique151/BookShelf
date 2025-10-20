
import Link from 'next/link';
import { Book } from "@/app/types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturedBookProps {
  book: Book;
}

export default function FeaturedBook({ book }: FeaturedBookProps) {
  const progress = book.totalPages
    ? Math.round(((book.currentPage || 0) / book.totalPages) * 100)
    : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">por {book.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-center mb-4">
          <img src={book.coverUrl} alt={book.title} className="h-48 rounded-md shadow-lg" />
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">{progress}% completo</p>
      </CardContent>
      <CardFooter>
        <Link href={`/books/${book.id}`} passHref className='w-full'>
          <Button className="w-full">Continuar leitura</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
