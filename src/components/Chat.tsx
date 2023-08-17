import Image from "next/image";
type Message = {
  storyId: string;
  id: string;
  authorId: string;
  input: string;
  reply: string;
  imageSrc: string;
  createdAt: Date;
};

const Chat = ({ message }: { message: Message }) => {
  return (
    <div className="flex w-full flex-shrink-0 snap-start gap-4">
      <img
        className="max-h-96 w-96 flex-shrink-0 rounded-lg bg-amber-200 object-cover"
        src={message.imageSrc}
      />
      <div className="flex w-full flex-col">
        <div className="flex h-40 w-full flex-shrink-0 flex-row-reverse gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/UserJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-right text-2xl font-bold text-[#F6E0C1]">
            {message.input}
          </p>
        </div>
        <div className="flex h-56 w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/SystemJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-2xl font-bold text-[#F6E0C1]">
            {message.reply}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
