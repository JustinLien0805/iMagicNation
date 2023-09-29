import CategoryRow from "@/components/CategoryRow";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
interface Story {
  id: string;
  initDialog: string;
  initImage: string;
  title: string;
  type: string;
  authorId: string | null;
}
const Library = () => {
  const router = useRouter();
  const fetchList = async (): Promise<Story[]> => {
    const { data }: { data: Story[] } = await axios.post("/api/story");
    return data;
  };
  const { data, isSuccess, isLoading } = useQuery(["storyList"], fetchList);

  // Extract the first four words of a string
  const getFirstFourWords = (str: string) => {
    return str.substring(0, 4);
  };

  // Get unique types based on the first four words
  const uniqueTypes = [
    ...new Set(data?.map((item) => getFirstFourWords(item.type))),
  ];

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#411A08] via-[#572813] to-[#411A08]">
        <div className="flex items-center p-4 px-10">
          <Image
            src={"/iMagicNationIcon.png"}
            className="mr-auto cursor-pointer"
            width={420}
            height={80}
            alt=""
            onClick={() => {
              router.push("/");
            }}
          />
          <UserNav />
        </div>
        <div
          className="flex w-screen grow flex-col gap-8 p-10"
          style={{
            backgroundImage: 'url("/LibraryBackground.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <Button
            className="relative inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={"/StoryBookIcon.png"}
              alt="book"
              height={95}
              width={102}
              className="absolute -left-10 -top-12"
            />
            小說
          </Button>
          <Button
            className="relative inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={"/StoryBookIcon.png"}
              alt="book"
              height={95}
              width={102}
              className="absolute -left-10 -top-12"
            />
            康軒
          </Button>
          <Button
            className="relative inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={"/StoryBookIcon.png"}
              alt="book"
              height={95}
              width={102}
              className="absolute -left-10 -top-12"
            />
            翰林
          </Button>
          <Button
            className="relative inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={"/StoryBookIcon.png"}
              alt="book"
              height={95}
              width={102}
              className="absolute -left-10 -top-12"
            />
            南一
          </Button> */}

          {isLoading && (
            <>
              <Skeleton className="h-48 w-full bg-amber-950" />
              <Skeleton className="h-48 w-full bg-amber-950" />
              <Skeleton className="h-48 w-full bg-amber-950" />
              <Skeleton className="h-48 w-full bg-amber-950" />
            </>
          )}
          {isSuccess &&
            uniqueTypes.map((type, index) => {
              const Storys = data.filter(
                (item) => getFirstFourWords(item.type) === type
              );
              return <CategoryRow key={index} type={type} storys={Storys} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Library;
