import { useState, useEffect } from "react";

interface Author {
  id: number;
  image: string;
  name: string;
  profession: string;
  short_info: string;
  bio: string[];
  books: string;
}

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await fetch("/authors.json");
      const data = await res.json();
      setAuthors(data);
    };

    getAuthors();
  }, []);

  return (
    <>
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
    </>
  );
}
