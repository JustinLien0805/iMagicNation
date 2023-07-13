import titleImage from "@/assets/iMagicNationIcon.png";
import CategoryRow from "@/components/CategoryRow";
import LibraryBackground from "@/assets/LibraryBackground.png";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
      userId: "2",
    });
    return data;
  };
  const { data, isSuccess, isLoading } = useQuery(["storyList"], fetchList);
  console.log(data);

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
  console.log(uniqueTypes);
  return (
    <>
      <div className="flex min-h-screen flex-col gap-8 bg-[#411A08] pt-10">
        <div className="flex items-center px-4">
          <img
            src={titleImage.src}
            className="mr-auto h-12"
            alt=""
            onClick={() => {
              router.push("/home");
            }}
          />
        </div>
        <div
          className="flex w-screen grow flex-col gap-8 p-8"
          style={{
            backgroundImage: `url(${LibraryBackground.src})`,
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
