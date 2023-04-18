import Head from "next/head";
import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  rating: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

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
      <Head>
        <title>Ժամանակակից Գրականություն</title>
        <meta
          name="description"
          content="Generated by Ժամանակակից Գրականություն"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-wrap justify-center items-center w-full min-h-screen gap-2.5 p-10 bg-[#f6f5f5]">
        {books.map((book) => (
          <div
            className="book-card flex flex-col justify-start items-center w-full max-w-xs p-4 my-4 bg-white rounded-md shadow-lg hover:scale-110 hover:bg-[#fef6eb] dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-600 duration-500"
            key={book.id}
          >
            <img src={book.image} alt={book.title} />
            <p className="text-lg font-bold">{book.title}</p>
            <p className="text-sm font-medium text-gray-500">{book.author}</p>
          </div>
        ))}
      </div>
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">
            © 2023 Armenian Language and Literature Final Project. All rights
            reserved.
          </p>
        </div>
      </footer>
      <style jsx>{`
        .book-card {
          height: 400px; /* Set the height to 400px */
        }
      `}</style>
    </>
  );
}
