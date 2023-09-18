import StoryBookIcon from "@/assets/StoryBookIcon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

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
  // words: string;
}

type CategoryRowProps = {
  type: string;
  storys: Story[];
};

const CategoryRow = ({ type, storys }: CategoryRowProps) => {
  const router = useRouter();
  return (
    <div className="w-full rounded-lg border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] px-4 pt-4 text-white">
      <h2
        className="inline-block cursor-pointer rounded-lg border-4 border-[#411A08] px-2 py-3 text-xl font-semibold text-[#411A08] "
        style={{
          background:
            "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {type}
      </h2>
      <div className="mb-4 flex items-center gap-4 overflow-y-hidden overflow-x-scroll">
        {storys.map((story) => (
          <motion.div
            className="z-10 flex cursor-pointer flex-col items-center"
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push(`/story/${type}/${story.id}`);
            }}
          >
            <Image src={"/StoryBookIcon.png"} alt="book" height={112} width={118} />
            <p>{story.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
