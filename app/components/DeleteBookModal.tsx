
'use client';

import { Button } from "@/components/ui/button";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
}

export default function DeleteBookModal({ isOpen, onClose, onConfirm, bookTitle }: DeleteBookModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Confirmar Exclusão</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Tem certeza que deseja excluir o livro "{bookTitle}"?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm}>Excluir</Button>
        </div>
      </div>
    </div>
  );
}
