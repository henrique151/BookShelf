import Link from "next/link";
import Image from "next/image";
import { Book } from "@/app/types/book";
import { getBook } from "@/app/lib/books";

interface BookDetailsProps {
  params: {
    id: string;
  };
}

export default async function BookDetails({ params }: BookDetailsProps) {
  const book: Book | null = await getBook(params.id);

  if (!book) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-6 justify-items-center">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Coluna da Imagem */}
          <div className="flex justify-center items-start">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                width={300}
                height={450}
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="w-[300px] h-[450px] bg-gray-200 rounded-lg flex items-center justify-center">
                Sem capa
              </div>
            )}
          </div>

          {/* Coluna das Informações */}
          <div>
            <h1 className="text-3xl text-black font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-black mb-4">por {book.author}</p>

            <div className="space-y-3 text-black">
              {book.genre && (
                <p>
                  <span className="font-semibold text-black ">Gênero:</span>{" "}
                  {book.genre}
                </p>
              )}
              {book.year && (
                <p>
                  <span className="font-semibold text-black">Ano:</span>{" "}
                  {book.year}
                </p>
              )}
              {book.pages && (
                <p>
                  <span className="font-semibold text-black">Páginas:</span>{" "}
                  {book.pages}
                </p>
              )}
              {book.status && (
                <p>
                  <span className="font-semibold text-black">Status:</span>{" "}
                  {book.status}
                </p>
              )}
              {book.rating && (
                <p>
                  <span className="font-semibold text-black">Avaliação:</span>{" "}
                  {book.rating}/5
                </p>
              )}
            </div>

            {book.synopsis && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  Sinopse
                </h2>
                <p className="text-black font-semibold">{book.synopsis}</p>
              </div>
            )}

            {book.notes && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2 text-black">
                  Anotações
                </h2>
                <p className="text-black font-semibold">{book.notes}</p>
              </div>
            )}

            <div className="mt-8 space-x-4">
              <Link
                href={`/books/${params.id}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar
              </Link>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
