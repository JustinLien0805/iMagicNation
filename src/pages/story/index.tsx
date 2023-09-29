import CategoryRow from "@/components/CategoryRow";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { UserNav } from "@/components/UserNav";
import { get } from "http";

interface Story {
  id: string;
  initDialog: string;
  initImage: string;
  // letters: string;
  // meaning: string;
  // phrases: string;
  // remainCount: number;
  // storyId: string;
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
  console.log(uniqueTypes);

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
