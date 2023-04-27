import titleImage from "@/assets/iMagicNationIcon.png";
import CategoryRow from "@/components/CategoryRow";
import activeTab from "@/assets/activeTab.png";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Story {
  id: number;
  initDialog: string;
  initImage: string;
  letters: string;
  meaning: string;
  phrases: string;
  remainCount: number;
  storyId: string;
  title: string;
  type: string;
  words: string;
}
const Library = () => {
  const router = useRouter();
  const fetchList = async (): Promise<Story[]> => {
    const data: { data: Story[] } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/list`
    );
    return data.data;
  };
  const { data } = useQuery(["storyList"], fetchList);
  if (!data) return <div>loading...</div>;
  console.log(data);
  const uniqueTypes = [...new Set(data.map((item) => item.type))];

  return (
    <>
      <div
        className="flex min-h-screen flex-col gap-8 pt-10"
        style={{
          background:
            "radial-gradient(138.78% 138.78% at 48.62% -8.75%, #411A08 0%, rgba(107, 60, 34, 0.983906) 41.61%, rgba(65, 26, 8, 0.97) 100%)",
        }}
      >
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
            backgroundImage: `url(${activeTab.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {uniqueTypes.map((type, index) => {
            const Storys = data.filter((item) => item.type === type);
            return <CategoryRow key={index} type={type} storys={Storys} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Library;
