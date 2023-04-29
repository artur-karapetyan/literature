import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

export default function Books() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  const handleBookClick = (id: Number) => {
    router.push(`/book?id=${id}`);
  };

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("/books.json");
      const data = await res.json();
      setBooks(data);
    };

    getBooks();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center w-full min-h-screen gap-2.5 p-10 bg-[#f6f5f5] dark:bg-gray-500">
        {books.map((book) => (
          <div
            className="flex flex-col cursor-pointer justify-start items-center w-full h-[400px] max-w-xs p-4 my-4 bg-white rounded-md shadow-lg hover:scale-110 hover:bg-[#fef6eb] dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-300 duration-500"
            key={book.id}
            onClick={() => handleBookClick(book.id)}
          >
            <img src={book.image} alt={book.title} className="rounded-md" />
            <p className="text-lg font-bold">{book.title}</p>
            <p className="text-sm font-medium text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}
