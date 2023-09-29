import Image from "next/image";
import { Volume2 } from "lucide-react";
import DictTooltip from "./DictTooltip";
type Message = {
  storyId: string;
  id: string;
  authorId: string;
  input: string;
  reply: string;
  imageSrc: string;
  createdAt: Date;
};

const Chat = ({
  message,
  words,
  phrases,
}: {
  message: Message;
  words: string[];
  phrases: string[];
}) => {
  function highlightWords(text: string, words: string[]) {
    words.forEach((word) => {
      // No word boundaries needed for Chinese characters
      const regex = new RegExp(word, "g");
      text = text.replace(
        regex,
        (match) => `<span class="border-red-500 border-b-2">${match}</span>`
      );
    });
    return text;
  }
  return (
    <div className="flex min-h-[24rem] w-full flex-shrink-0 snap-start gap-4">
      <img
        className="max-h-96 w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1] object-cover"
        src={message.imageSrc}
        alt="image"
      />
      <div className="flex w-full flex-col">
        <div className="flex h-40 w-full flex-shrink-0 flex-row-reverse gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/UserJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-right text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
            {message.input}
          </p>
        </div>
        <div className="flex min-h-[14rem] w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/SystemJewel.png"} fill alt="" />
          </div>
          <DictTooltip
            text={message.reply}
            wordsToHighlight={[...words, ...phrases, ...["什麼"]]}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
