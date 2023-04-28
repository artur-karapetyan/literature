import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaShareAlt } from "react-icons/fa";
import Modal from "react-modal";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

interface Author {
  id: number;
  image: string;
  name: string;
  profession: string;
  short_info: string;
  bio: string[];
  books: string;
}

export default function Books() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const prevScrollY = useRef(0);
  const opacity = showHeader ? 0.8 : 0.5;
  const translateY = showHeader ? "0" : "-90px";
  const transition = showHeader
    ? "opacity 0.1s ease, transform 0.5s ease"
    : "opacity 0.1s ease 0.5s, transform 0.5s ease 0.5s";
  const [author, setAuthor] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShareClick() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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

  useEffect(() => {
    const getAuthors = async () => {
      const res = await fetch("/authors.json");
      const data = await res.json();
      setAuthors(data);
    };

    getAuthors();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && showHeader) {
        setShowHeader(false);
      } else if (prevScrollY.current > currentScrollY && !showHeader) {
        setShowHeader(true);
      } else if (currentScrollY === 0) {
        setShowHeader(true);
      }
      prevScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeader]);

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
      <div className="flex flex-col justify-center items-center w-full min-h-screen gap-2.5 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
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
        <div className="flex flex-col w-full justify-center items-center pt-14 lg:px-80 md:pt-24 md:pb-4 bg-[#d8d5d5] dark:bg-gray-700">
          <div className="flex flex-row">
            <img src="/quotes.png" className="w-[60px] h-[40px]" />
            <p className="items-center text-xl mt-8 font-mono italic">
              Սենյակն առանց գրքերի, դա նույնն է ինչ մարմինն առանց հոգու:
            </p>
          </div>
          <div className="w-full items-end text-end px-4">
            <p className="text-xl font-mono italic font-bold">Կիկերոն</p>
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-start items-start pt-12 ml-10 md:px-16">
          <p className="items-center text-4xl font-bold">Հեղինակներ</p>
        </div>
        <div className="flex flex-row w-full cursor-pointer overflow-hidden overflow-x-scroll hide-scrollbar gap-5 p-10">
          {authors.map((author) => (
            <div
              className="author-card flex flex-col justify-start items-center w-[250px] h-[400px] max-w-xs max-h-full gap-5 p-4 my-4 bg-opacity-60 bg-[#fff6e6] rounded-3xl shadow-lg shadow-[#91897e] hover:scale-110 hover:bg-[#ffe4bd] dark:hover:bg-gray-700 dark:bg-gray-800 dark:shadow-orange-200 duration-500 flex-shrink-0"
              key={author.id}
              onClick={() => {
                setAuthor(author);
              }}
            >
              <img
                src={author.image}
                alt={author.name}
                className="rounded-lg max-h-[250px]"
              />
              <p className="text-lg italic font-bold">{author.name}</p>
              <p className="text-sm font-medium text-gray-500">
                {author.profession}
              </p>
            </div>
          ))}
        </div>
        {author && (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-white/40 backdrop-blur-sm">
            <div className="flex flex-col justify-start items-start bg-white pb-8 px-8 gap-8 rounded-lg shadow-lg w-full max-w-xs h-[80vh] md:max-w-4xl md:h-[90vh] dark:bg-gray-700">
              <div className="flex w-full h-16 pt-6 items-end overflow-hidden">
                <button
                  className="text-gray-500 hover:text-gray-700 ml-auto"
                  onClick={() => setAuthor(null)}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="x w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 15.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L10 13.414l-3.879 3.879a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.414L6.586 10 2.707 6.121a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10 6.586l3.879-3.879a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L13.414 10l3.293 3.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col overflow-y-scroll gap-8 pr-4">
                <div className="flex flex-row flex-wrap md:flex-nowrap gap-12">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="rounded-lg max-h-60 md:max-w-sm md:max-h-sm"
                  />
                  <div className="flex flex-col gap-8">
                    <p className="text-2xl font-bold">{author.name}</p>
                    <p className="text-lg font-medium">{author.short_info}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">Կենսագրություն</h2>
                  {author.bio.map((bio, index) => (
                    <div className="my-4" key={index}>
                      {bio}
                      <br />
                    </div>
                  ))}
                  <h2 className="text-2xl font-semibold">Պատմվածքներ</h2>
                  <p className="my-4">{author.books}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap flex-col max-w-full justify-center items-center gap-6 p-12 border-2 border-[#c0c9ee] rounded-2xl bg-white md:px-16 dark:bg-gray-800 md:max-w-8xl">
          <p className="items-center text-center text-2xl font-bold md:text-4xl">
            Կարդացե՞լ Ես Բոլոր Պատմվածքները
          </p>
          <p className="items-center text-xl text-center text-[#415362] font-bold dark:text-[#d8dde2] md:text-2xl">
            Ստուգի՛ր Գիտելիքներդ Խաղի Միջոցով
          </p>
          <button
            className="flex-grow-0 flex-shrink-0 w-[200px] h-20 text-xl font-medium text-center rounded-md border-2 border-[#c0c9ee] bg-[#fef6eb] text-[#7ba5c7] hover:bg-[#ffe4bd] duration-200 dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-300"
            onClick={() => router.push("/game")}
          >
            Խաղալ Հիմա
          </button>
        </div>
        <div className="flex flex-wrap w-full justify-start items-start ml-10 pt-16 md:px-16">
          <p className="items-center text-4xl font-bold">Պատմվածքներ</p>
        </div>
        <div className="flex flex-wrap justify-center items-center w-full min-h-screen gap-2.5 p-10 bg-[#f6f5f5] dark:bg-gray-500">
          {books.map((book) => (
            <div
              className="book-card flex flex-col cursor-pointer justify-start items-center w-full max-w-xs p-4 my-4 bg-white rounded-md shadow-lg hover:scale-110 hover:bg-[#fef6eb] dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-300 duration-500"
              key={book.id}
              onClick={() => handleBookClick(book.id)}
            >
              <img src={book.image} alt={book.title} className="rounded-md" />
              <p className="text-lg font-bold">{book.title}</p>
              <p className="text-sm font-medium text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>
        <style jsx>{`
          .book-card {
            height: 400px; /* Set the height to 400px */
          }
        `}</style>
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
          <button onClick={handleShareClick} rel="noopener noreferrer">
            <FaShareAlt size={24} color="white" />
          </button>
        </div>
        {isModalOpen && (
          <div
            className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-white/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="flex flex-col justify-center items-center bg-white pb-6 px-6 rounded-lg shadow-lg w-full max-w-xs h-[80vw] md:max-w-[80vh] md:h-[80vh] dark:bg-gray-700">
              <div className="flex w-full h-16 pt-6 items-end">
                <button
                  className="text-gray-500 hover:text-gray-700 ml-auto"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="x w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 15.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L10 13.414l-3.879 3.879a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.414L6.586 10 2.707 6.121a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10 6.586l3.879-3.879a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L13.414 10l3.293 3.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col w-full h-full">
                <img src={"/frame.png"} alt={"QR"} className="w-full h-full" />
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}
