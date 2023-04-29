import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  story: string[];
}

export default function Book() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const bookId = Number(router.query.id);
  const book = books.find((book) => book.id === bookId);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("/books.json");
      const data = await res.json();
      setBooks(data);
    };

    getBooks();
  }, []);

  if (!book) {
    return (
      <div className="justify-center items-center min-w-full min-h-screen bg-white dark:bg-gray-800">
        <p className="text-2xl font-bold items-center text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-full min-h-screen pb-10 md:px-40 md:pt-40 gap-2.5 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
        <div className="h-full w-auto justify-start items-start p-14 md:px-20 bg-white dark:bg-gray-800">
          <h1 className="text-md md:text-xl font-bold pb-8">
            {book.title} | {book.author}
          </h1>
          {book.story.map((story, index) => (
            <div className="text-xs md:text-lg" key={index}>
              {story}
              <br />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
