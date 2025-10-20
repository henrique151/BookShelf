"use client";

import { useState, useCallback, useEffect } from "react";
import { useBooks } from "@/contexts/BookContext";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReadingList from "@/app/components/ReadingList";
import { Book } from "@/types/book";

export default function Home() {
  const { books, isLoading, error, refreshBooks } = useBooks();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdate(new Date());
  }, []);

  const handleRefresh = useCallback(async () => {
    await refreshBooks();
    setLastUpdate(new Date());
  }, [refreshBooks]);

  useEffect(() => {
    if (!isLoading && books.length > 0) {
      setLastUpdate(new Date());
    }
  }, [isLoading, books]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error Loading Books
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const readingBooks = books.filter(
    (book: Book) =>
      book.currentPage != null &&
      book.totalPages != null &&
      book.currentPage > 0 &&
      book.currentPage < book.totalPages
  );

  const totalPagesRead = books.reduce((acc, book) => {
    if ((book.status === 'READ' || book.status === 'FINISHED') && book.totalPages) {
      return acc + book.totalPages;
    } else if (book.currentPage) {
      return acc + book.currentPage;
    }
    return acc;
  }, 0);

  const stats = {
    total: books.length,
    reading: readingBooks.length,
    read: books.filter((book) => book.status === "READ").length,
    finished: books.filter((book) => book.status === "FINISHED").length,
    toRead: books.filter((book) => book.status === "TO_READ").length,
    totalPagesRead: totalPagesRead,
  };

  const statDetails = {
    total: { title: "Total de Livros", color: "text-gray-800 dark:text-gray-200" },
    reading: { title: "Lendo Atualmente", color: "text-blue-600 dark:text-blue-400" },
    read: { title: "Lidos", color: "text-emerald-600 dark:text-emerald-400" },
    finished: { title: "Finalizados", color: "text-green-600 dark:text-green-400" },
    toRead: { title: "Na Fila", color: "text-purple-600 dark:text-purple-400" },
    totalPagesRead: { title: "Páginas Lidas", color: "text-indigo-600 dark:text-indigo-400" },
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bem-vindo à sua biblioteca pessoal
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isLoading ? "animate-spin" : ""}`}>
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
            </svg>
            {isLoading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Última atualização: {lastUpdate ? lastUpdate.toLocaleTimeString() : "..."}
        </p>
      </div>

      {isLoading && !lastUpdate ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(stats).map(([key, value]) => {
              const detail = statDetails[key as keyof typeof statDetails];
              if (!detail) return null;
              return (
                <Card key={key} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {detail.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${detail.color}`}>
                      {isLoading ? (
                        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        value
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Continuar Lendo
            </h2>
            {readingBooks.length > 0 ? (
              <ReadingList books={readingBooks.slice(0, 2)} />
            ) : (
              <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 border-2 border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum livro sendo lido no momento.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <Link href="/books" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Ver Todos os Livros
            </Link>
            <Link href="/books/add" className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100 shadow-sm">
              Adicionar Novo Livro
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}