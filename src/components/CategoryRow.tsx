import StorybookIcon from "@/assets/StorybookIcon.png";
import { useRouter } from "next/router";
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
