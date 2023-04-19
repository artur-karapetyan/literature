import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

interface Book {
  id: number;
  title: string;
  author: string;
  story: string[];
}

export default function Book() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const prevScrollY = useRef(0);
  const opacity = showHeader ? 0.8 : 0.5;
  const translateY = showHeader ? "0" : "-90px";
  const transition = showHeader
    ? "opacity 0.1s ease, transform 0.5s ease"
    : "opacity 0.1s ease 0.5s, transform 0.5s ease 0.5s";
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

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && showHeader) {
        setShowHeader(false);
      } else if (prevScrollY.current > currentScrollY && !showHeader) {
        setShowHeader(true);
      }
      prevScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [book, showHeader]);

  if (!book) {
    return <div>Book not found</div>;
  }

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
      <div className="flex flex-col justify-center items-center w-full min-h-screen pb-10 md:px-40 md:pt-40 gap-2.5 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
        <div
          className="flex justify-center items-center w-full h-[50px] md:h-[90px] opacity-80 border-b border-[#e8e6f0] bg-white fixed top-0 left-0 z-50 md:max-w-full shadow-sm transition-all duration-300 ease-in-out dark:bg-gray-600"
          style={{
            transform: `translateY(${translateY})`,
            opacity,
            transition,
          }}
        >
          <p
            className="flex w-full cursor-pointer justify-center text-center items-center text-lg md:text-4xl font-bold font-serif"
            onClick={() => router.push("/")}
          >
            Ժամանակակից Գրականություն
          </p>
        </div>
        <div className="h-full w-auto justify-start items-start p-14 md:px-20 bg-white dark:bg-gray-800">
          <h1 className="text-md md:text-xl font-bold pb-8">
            {book.title} / {book.author}
          </h1>
          {book.story.map((story, index) => (
            <div className="text-xs md:text-lg" key={index}>
              {story}
              <br />
            </div>
          ))}
        </div>
      </div>
      <footer className="flex flex-col bg-gray-800 py-8 px-10 gap-4">
        <div className="flex flex-row flex-wrap md:flex-nowrap w-full">
          <div className="flex flex-row flex-shrink-0 text-gray-400 gap-2">
            <p className="text-left font-semibold text-gray-400">Created by:</p>
            <p className="text-left font-medium text-gray-400">
              Artur Karapetyan
            </p>
          </div>
          <div className="w-full">
            <p className="text-left md:text-right text-gray-400">
              © 2023 Armenian Language and Literature Final Project. All rights
              reserved.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-4">
          <a
            href="https://www.instagram.com/_arthur_karapetian_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} color="white" />
          </a>
          <a
            href="https://www.linkedin.com/in/arturkarapetian/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} color="white" />
          </a>
          <a
            href="https://github.com/artur-karapetyan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} color="white" />
          </a>
        </div>
      </footer>
    </>
  );
}