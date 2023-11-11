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
  questions,
}: {
  message: Message;
  words: string[];
  phrases: string[];
  questions?: string;
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
          <div className="flex w-full flex-col gap-4 text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
            <DictPopover text={message.reply} wordsToHighlight={[...words]} />
            {questions && (
              <div className="flex flex-col gap-4 p-4 rounded-lg border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] mb-10">
                <h4>填充題</h4>
                <p>國字：{JSON.parse(questions).words}</p>
                <p>詞語：{JSON.parse(questions).phrases}</p>
                <p>問題1：{JSON.parse(questions).question1}</p>
                <p>問題2：{JSON.parse(questions).question2}</p>
                <p>問題3：{JSON.parse(questions).question3}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
