import StorybookIcon from "@/assets/StorybookIcon.png";
import { useRouter } from "next/router";
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

type CategoryRowProps = {
  type: string;
  storys: Story[];
};

const CategoryRow = ({ type, storys }: CategoryRowProps) => {
  const router = useRouter();
  return (
    <div className="w-full rounded-lg border-2 border-[#EAA916] bg-[#411A08] p-4 text-white">
      <h2>{type}</h2>
      <div className="flex items-center gap-4 overflow-x-scroll">
        {storys.map((story) => (
          <div
            className="flex cursor-pointer flex-col items-center"
            onClick={() => {
              router.push(`/library/book/${story.storyId}`);
            }}
          >
            <img src={StorybookIcon.src} alt="" className="h-28" />
            <p>{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
