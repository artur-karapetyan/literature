import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import Head from "next/head";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: string;
}

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("/questions.json");
      const data = await res.json();
      setQuestions(data);
    };

    getQuestions();
  }, []);

  const getNextQuestion = (): void => {
    const unansweredQuestions = questions.filter(
      (question) => !answeredQuestions.includes(question)
    );
    if (unansweredQuestions.length > 0) {
      const randomQuestion =
        unansweredQuestions[
          Math.floor(Math.random() * unansweredQuestions.length)
        ];
      setCurrentQuestion(randomQuestion);
    } else {
      setCurrentQuestion(null);
    }
  };

  const shuffledChoices = currentQuestion
    ? shuffle([...currentQuestion.choices])
    : [];

  const handleAnswer = (answer: string) => {
    if (answer === currentQuestion?.answer) {
      setScore((prevScore) => prevScore + 1);
      setAnsweredQuestions((prevQuestions) => [
        ...prevQuestions,
        currentQuestion,
      ]);
      getNextQuestion();
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    getNextQuestion();
  }, [answeredQuestions, questions]);

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
      <div className="flex flex-col justify-center items-center w-full min-h-screen md:p-28 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
        <div className="flex justify-center items-center w-full h-[50px] md:h-[90px] opacity-80 border-b border-[#e8e6f0] bg-white fixed top-0 left-0 z-50 md:max-w-full shadow-sm dark:bg-gray-600">
          <p
            className="flex w-full cursor-pointer justify-center text-center items-center text-lg md:text-4xl font-bold font-serif"
            onClick={() => router.push("/")}
          >
            Ժամանակակից Գրականություն
          </p>
        </div>
        {gameOver ? (
          <>
            <div className="items-center justify-center text-center">
              <h2 className="text-4xl font-bold mb-10 text-[#ff6868]">
                Դուք Պարտվեցիք!
              </h2>
              <p className="text-3xl text-[#56f]">{score} Միավոր</p>
              <button
                className="items-center justify-center text-white text-xl bg-[#606ff8] mt-10 rounded-lg w-48 h-16 hover:bg-[#aab2ff]"
                onClick={() => router.reload()}
              >
                Կրկին Փորձել
              </button>
            </div>
          </>
        ) : currentQuestion ? (
          <div className="flex flex-col justify-center items-center w-full gap-3 md:gap-40 p-10">
            <div>
              <h2 className="text-3xl font-bold mb-4 pt-4">
                {currentQuestion.question}
              </h2>
            </div>
            <div className="w-full items-center justify-center">
              <ul className="flex flex-row flex-wrap items-center justify-center w-full gap-1">
                {shuffledChoices.map((choice, index) => (
                  <button
                    key={choice}
                    className={`items-start justify-center text-white md:text-start text-3xl rounded p-4 mb-2 shadow-inner cursor-pointer w-[55vh] h-[10vh] ${
                      index % 4 === 0
                        ? "bg-[#e33f3f] hover:bg-[#b20404]"
                        : index % 4 === 1
                        ? "bg-[#327dfe] hover:bg-[#164eae]"
                        : index % 4 === 2
                        ? "bg-[#d4ad00] hover:bg-[#a18300]"
                        : "bg-[#308c12] hover:bg-[#22690a]"
                    }`}
                    onClick={() => handleAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="items-center justify-center text-center">
              <h2 className="text-4xl font-bold mb-10 text-[#25b61a]">
                Շնորհավորում Ենք, Դուք Հաղթեցիք!
              </h2>
              <p className="text-3xl text-[#56f]">{score} Միավոր</p>
              <button
                className="items-center justify-center text-white text-xl bg-[#606ff8] mt-10 rounded-lg w-48 h-16 hover:bg-[#aab2ff]"
                onClick={() => router.reload()}
              >
                Խաղալ Նորից
              </button>
            </div>
          </>
        )}
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
