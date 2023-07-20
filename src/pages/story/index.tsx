import CategoryRow from "@/components/CategoryRow";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { UserNav } from "@/components/UserNav";

interface Story {
  id: string;
  // initDialog: string;
  // initImage: string;
  // letters: string;
  // meaning: string;
  // phrases: string;
  // remainCount: number;
  // storyId: string;
  title: string;
  type: string;
  authorId: string | null;
  // words: string;
}
const Library = () => {
  const router = useRouter();
  const fetchList = async (): Promise<Story[]> => {
    const { data }: { data: Story[] } = await axios.post("api/story", {
      userId: "1",
    });
    return data;
  };
  const { data, isSuccess, isLoading } = useQuery(["storyList"], fetchList);

  const uniqueTypes = [...new Set(data?.map((item) => item.type))];
  uniqueTypes.sort((a, b) => {
    if (a === "我的故事") {
      return -1;
    } else if (b === "我的故事") {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#411A08]">
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
              <Skeleton className="h-48 w-full bg-[#7c3818]" />
              <Skeleton className="h-48 w-full bg-[#7c3818]" />
              <Skeleton className="h-48 w-full bg-[#7c3818]" />
              <Skeleton className="h-48 w-full bg-[#7c3818]" />
            </>
          )}
          {isSuccess &&
            uniqueTypes.map((type, index) => {
              const Storys = data?.filter((item) => item.type === type);
              return <CategoryRow key={index} type={type} storys={Storys} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Library;
