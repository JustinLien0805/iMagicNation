import Image from "next/image";
import DictPopover from "./DictPopover";
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
  return (
    <div className="flex min-h-[24rem] w-full flex-shrink-0 snap-start flex-col gap-4 lg:flex-row">
      <img
        className="max-h-96 w-96 flex-shrink-0 self-center rounded-lg bg-[#F6E0C1] object-cover lg:self-start"
        src={message.imageSrc}
        alt="image"
      />
      <div className="flex w-full flex-col">
        <div className="flex h-40 flex-shrink-0 flex-row-reverse gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/UserJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-right text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
            {message.input}
          </p>
        </div>
        <div className="flex min-h-[14rem] flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/SystemJewel.png"} fill alt="" />
          </div>
          <DictPopover text={message.reply} wordsToHighlight={[...words]} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
