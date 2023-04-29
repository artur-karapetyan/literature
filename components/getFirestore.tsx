import { useEffect, useState } from "react";
import { logger } from "@/utils/logger";
import { firestore } from "@/firebase";
import {
  collection,
  orderBy,
  query,
  limit,
  onSnapshot,
} from "firebase/firestore";

interface Score {
  id: string;
  score: number;
  username: string;
}

const MAX_SCORES = 10;

export default function GetFirestore() {
  const [topScores, setTopScores] = useState<Score[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const getTopScoresFromFirestore = async () => {
      try {
        const q = query(
          collection(firestore, "scores"),
          orderBy("score", "desc"),
          limit(MAX_SCORES)
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const scores = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
            score: doc.data().score,
          }));
          setTopScores(scores);
        });
      } catch (e) {
        logger.error("Error getting top scores: ", e);
      }
    };

    getTopScoresFromFirestore();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      {/* <table className="w-full mt-10 shadow-xl">
        <thead className="border-b h-10 bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="border-b h-10">Տեղ</th>
            <th className="border-b h-10">Անուն</th>
            <th className="border-b h-10">Միավոր</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((score, index) => (
            <tr key={score.id}>
              <td className="border-b h-10 font-bold">{index + 1}</td>
              <td className="border-b h-10">{score.username}</td>
              <td className="border-b h-10">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div className="flex justify-start items-center w-[90vw] md:max-w-md h-9 mt-4 mb-4 rounded-lg shadow-xl bg-[#0c4089]">
        <p className="text-base font-extrabold text-center pl-4 text-white">
          Տեղ
        </p>
        <p className="flex-grow text-base font-extrabold text-center pl-9 text-white">
          Անուն
        </p>
        <p className="text-base font-extrabold text-center pr-4 text-white">
          Միավոր
        </p>
      </div>
      {topScores.map((score, index) => (
        <div
          className="flex justify-start items-center w-[90vw] md:max-w-md h-9 mt-3 rounded-lg shadow-xl bg-white hover:bg-[#85b0ed] hover:scale-105 duration-500 dark:bg-slate-900 dark:hover:bg-gray-800 dark:shadow-slate-600"
          key={score.id}
        >
          <p className="text-base font-extrabold text-center pl-8">
            {index + 1}
          </p>
          <p className="flex-grow text-base font-normal text-center">
            {score.username}
          </p>
          <p className="text-base font-light text-center pr-8">{score.score}</p>
        </div>
      ))}
    </>
  );
}
