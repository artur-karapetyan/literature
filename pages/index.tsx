import Authors from "@/components/authors";
import Books from "@/components/books";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center w-full min-h-screen gap-2.5 md:max-w-full overflow-hidden bg-[#f6f5f5] dark:bg-gray-500">
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
        <Authors />
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
        <Books />
      </div>
      <Footer />
    </>
  );
}
