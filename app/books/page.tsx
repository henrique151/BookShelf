"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useBooks } from "../../contexts/BookContext";
import BookList from "../components/BookList";
import BookSearch from "../components/BookSearch";

const statusLabels = {
  "to-read": "Para Ler",
  reading: "Lendo",
  finished: "Finalizado",
};

const statusColors = {
  "to-read": "bg-gray-100 text-gray-800",
  reading: "bg-blue-100 text-blue-800",
  finished: "bg-green-100 text-green-800",
};

export default function BooksPage() {
  const { searchBooks } = useBooks();
  const [query, setQuery] = useState("");
  const results = searchBooks(query);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold">Meus Livros</h1>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/books/add"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full text-center"
            >
              Adicionar Livro
            </Link>
          </div>
        </div>
      </div>
      <BookSearch onSubmit={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">
                  {book.title}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[book.status]
                  }`}
                >
                  {statusLabels[book.status]}
                </span>
              </div>
              <p className="text-sm text-gray-600">por {book.author}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {book.genre && (
                  <p className="text-sm text-gray-500">Gênero: {book.genre}</p>
                )}
                {book.pages && (
                  <p className="text-sm text-gray-500">Páginas: {book.pages}</p>
                )}
                {book.rating && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">Avaliação: </span>
                    <div className="flex ml-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < book.rating!
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <Link
                    href={`/books/${book.id}`}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Nenhum livro encontrado</p>
          <Link
            href="/books/add"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Adicionar seu primeiro livro
          </Link>
        </div>
      )}
    </div>

    // <div className="space-y-6">
    //   <div>
    //     <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center">
    //       <h1 className="text-3xl font-bold">Meus Livros</h1>
    //       <div className="flex flex-col sm:flex-row items-center gap-3">
    //         <BookList />
    //         <Link
    //           href="/books/add"
    //           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full text-center"
    //         >
    //           Adicionar Livro
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {books.map((book) => (
    //       <Card key={book.id} className="hover:shadow-lg transition-shadow">
    //         <CardHeader>
    //           <div className="flex justify-between items-start">
    //             <CardTitle className="text-lg line-clamp-2">
    //               {book.title}
    //             </CardTitle>
    //             <span
    //               className={`px-2 py-1 rounded-full text-xs font-medium ${
    //                 statusColors[book.status]
    //               }`}
    //             >
    //               {statusLabels[book.status]}
    //             </span>
    //           </div>
    //           <p className="text-sm text-gray-600">por {book.author}</p>
    //         </CardHeader>
    //         <CardContent>
    //           <div className="space-y-2">
    //             {book.genre && (
    //               <p className="text-sm text-gray-500">Gênero: {book.genre}</p>
    //             )}
    //             {book.pages && (
    //               <p className="text-sm text-gray-500">Páginas: {book.pages}</p>
    //             )}
    //             {book.rating && (
    //               <div className="flex items-center">
    //                 <span className="text-sm text-gray-500">Avaliação: </span>
    //                 <div className="flex ml-1">
    //                   {Array.from({ length: 5 }).map((_, i) => (
    //                     <span
    //                       key={i}
    //                       className={`text-sm ${
    //                         i < book.rating!
    //                           ? "text-yellow-400"
    //                           : "text-gray-300"
    //                       }`}
    //                     >
    //                       ★
    //                     </span>
    //                   ))}
    //                 </div>
    //               </div>
    //             )}
    //             <div className="pt-2">
    //               <Link
    //                 href={`/books/${book.id}`}
    //                 className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
    //               >
    //                 Ver Detalhes
    //               </Link>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>

    //   {books.length === 0 && (
    //     <div className="text-center py-8">
    //       <p className="text-gray-500 mb-4">Nenhum livro encontrado</p>
    //       <Link
    //         href="/books/add"
    //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    //       >
    //         Adicionar seu primeiro livro
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
}
