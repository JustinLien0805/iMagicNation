import StorybookIcon from "@/assets/StorybookIcon.png";
import { useRouter } from "next/router";
interface Book {
  storyId: string;
  title: string;
  resource: {
    type: string;
    letters: string[];
    words: string[];
    phrases: string[];
    meaning: string;
  };
  initDialog?: string;
  initialDialog?: string;
  initImage?: {
    default: string;
  };
  image?: {
    default: string;
  };
  remainCount: number;
}

type CategoryRowProps = {
  type: string;
  books: Book[];
};

const CategoryRow = ({ type, books }: CategoryRowProps) => {
  const router = useRouter();
  return (
    <div className="w-full rounded-lg border-2 border-[#EAA916] bg-[#411A08] p-4 text-white">
      <h2>{type}</h2>
      <div className="flex items-center gap-4 overflow-x-scroll">
        {books.map((book) => (
          <div className="flex cursor-pointer flex-col items-center">
            <img src={StorybookIcon.src} alt="" className="h-28" />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
