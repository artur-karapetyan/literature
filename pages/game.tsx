import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Footer from "@/components/footer";
import Header from "@/components/header";
import GetFirestore from "@/components/getFirestore";

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: string;
}

const TIMER_DURATION = 30; // duration of timer in seconds

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION); // time left for current question
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // loading state
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const router = useRouter();

  const addScoreToFirestore = async (username: string, score: number) => {
    try {
      const docRef = await addDoc(collection(firestore, "scores"), {
        username,
        score,
      });
      logger.log("Score added with ID: ", docRef.id);
    } catch (e) {
      logger.error("Error adding score: ", e);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && startGame && gameRunning) {
      if (username !== "") {
        addScoreToFirestore(username, score);
      }
      setGameOver(true);
    }
  }, [timeLeft, startGame, gameRunning, username, score]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("/questions.json");
      const data = await res.json();
      setQuestions(data);
      setLoading(false); // set loading to false when data is received
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
      if (username !== "") {
        addScoreToFirestore(username, score);
        setUsername("");
      }
      setGameRunning(false);
      setCurrentQuestion(null);
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      setShuffledChoices(shuffle([...currentQuestion.choices]));
    }
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (answer === currentQuestion?.answer) {
      setScore((prevScore) => prevScore + 1);
      setAnsweredQuestions((prevQuestions) => [
        ...prevQuestions,
        currentQuestion,
      ]);
      setTimeLeft(TIMER_DURATION);
      getNextQuestion();
    } else {
      if (username !== "") {
        addScoreToFirestore(username, score);
      }
      setGameRunning(false);
      setGameOver(true);
    }
  };

  useEffect(() => {
    getNextQuestion();
  }, [answeredQuestions, questions]);

  if (loading) {
    return (
      <div className="justify-center items-center min-w-full min-h-screen bg-white dark:bg-gray-800">
        <p className="text-2xl font-bold items-center text-center">
          Loading...
        </p>
      </div>
    );
  }

  if (startGame)
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center w-full min-h-screen md:px-36 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
          {gameOver ? (
            <>
              <div className="items-center justify-center text-center">
                <h2 className="text-4xl font-bold mb-8 text-[#ff6868] mt-14 md:mt-24">
                  Դուք Պարտվեցիք!
                </h2>
                <p className="text-3xl text-[#56f]">{score} Միավոր</p>
                <GetFirestore />
                <button
                  className="items-center justify-center text-white text-xl bg-[#606ff8] mt-10 mb-10 rounded-lg w-48 h-16 hover:bg-[#aab2ff]"
                  onClick={() => router.reload()}
                >
                  Կրկին Փորձել
                </button>
              </div>
            </>
          ) : currentQuestion ? (
            <>
              <div className="flex justify-center items-center w-full pt-20 md:pb-14">
                <svg
                  width={54}
                  height={54}
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0 w-[54px] h-[54px] md:w-[90px] md:h-[90px]"
                  preserveAspectRatio="none"
                >
                  <circle
                    cx="27.5"
                    cy="26.5"
                    r="22.5"
                    fill="#803efc"
                    strokeWidth={2}
                  />
                  <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    fill="#fff"
                    fontSize="20px"
                    textAnchor="middle"
                  >
                    {timeLeft}
                  </text>
                </svg>
              </div>
              <div className="flex flex-col justify-center items-center text-center w-full gap-3 md:gap-40 pb-10 px-10">
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
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center text-center max-w-[90vw]">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#25b61a] mt-14 md:mt-24">
                  Շնորհավորում Ենք, Դուք Հաղթեցիք!
                </h2>
                <p className="text-3xl text-[#56f]">{score} Միավոր</p>
                <GetFirestore />
                <button
                  className="items-center justify-center text-white text-xl bg-[#606ff8] mt-10 mb-10 rounded-lg w-48 h-16 hover:bg-[#aab2ff]"
                  onClick={() => router.reload()}
                >
                  Խաղալ Նորից
                </button>
              </div>
            </>
          )}
        </div>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center gap-6 w-full min-h-screen md:px-36 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
          <form
            className="flex flex-col text-left items-center gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (username) {
                setTimeLeft(TIMER_DURATION);
                setGameRunning(true);
                setStartGame(true);
              } else {
                setError("Խնդրում ենք լրացնել այս դաշտը");
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Անուն"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <button
              className="text-white bg-[#314bf5] hover:bg-indigo-700 duration-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#3193f5] dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              type="submit"
            >
              Խաղալ
            </button>
          </form>
          <button
            className="text-white bg-[#314bf5] hover:bg-indigo-700 duration-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#3193f5] dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            onClick={() => router.push("/game/leaderboard")}
          >
            Լավագույն Տասնյակ
          </button>
        </div>
        <Footer />
      </>
    );
}
