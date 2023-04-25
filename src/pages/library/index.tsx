import titleImage from "@/assets/iMagicNationIcon.png";
import CategoryRow from "@/components/CategoryRow";
import activeTab from "@/assets/activeTab.png";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Story {
  storyId: string;
  title: string;
  resource: {
    type: string;
    letters: string[];
    words: string[];
    phrases: string[];
    meaning: string;
  };
  initialDialog: string;
  image: {
    default: string;
  };
  remainCount: number;
}
const MyList = () => {
  const router = useRouter();
  const fetchList = async () => {
    const data = await axios.get(
      "https://imagicnation-production.up.railway.app/story/list"
    );
    return data.data.list;
  };
  const { data } = useQuery<Story[]>(["storyList"], fetchList);
  if (!data) return <div>loading...</div>;
  console.log(data);
  const uniqueTypes = [...new Set(data.map((item) => item.resource.type))];

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
          {uniqueTypes.map((type, id) => {
            const Storys = data.filter((item) => item.resource.type === type);
            return <CategoryRow key={id} type={type} storys={Storys} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyList;
