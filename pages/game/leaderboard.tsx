import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import { firestore } from "@/firebase";
import {
  collection,
  orderBy,
  query,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Footer from "@/components/footer";
import Header from "@/components/header";
import GetFirestore from "@/components/getFirestore";

interface Score {
  id: string;
  score: number;
  username: string;
}

const MAX_SCORES = 10;

export default function Leaderboard() {
  const [topScores, setTopScores] = useState<Score[]>([]);
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-full min-h-screen md:px-36 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#1f36ff] mt-14 md:mt-24">
            Լավագույն 10 Խաղացողներ
          </h2>
          <GetFirestore />
          <button
            className="items-center justify-center text-white text-xl bg-[#606ff8] mt-10 mb-10 rounded-lg w-48 h-16 hover:bg-[#aab2ff]"
            onClick={() => router.push("/game")}
          >
            Հետ Գնալ
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
