import { useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaShareAlt } from "react-icons/fa";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleShareClick() {
    setIsModalOpen(true);
  }

  return (
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
  );
}
