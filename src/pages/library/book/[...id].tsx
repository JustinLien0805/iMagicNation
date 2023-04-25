import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import UserJewel from "@/assets/UserJewel.png";
import SystemJewel from "@/assets/SystemJewel.png";
import titleImage from "@/assets/iMagicNationIcon.png";
import activeTab from "@/assets/activeTab.png";
import { useRouter } from "next/router";

interface Message {
  message: string;
  remainCount: string;
  title: string;
  userId: string;
  chatGPTResponse: {
    role: string;
    content: string;
  };
  image: string;
  timestamp: string;
}

interface ChatMessage {
  userId: string;
  storyId: string;
  remainCount: string;
  message: Message[];
}

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

const ChatComponent = ({ message }: { message: Message }) => {
  return (
    <>
      <div className="flex h-40 w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
        <img src={UserJewel.src} className="h-8 w-8" alt="" />
        <p className="text-xl font-bold">{message.message}</p>
      </div>
      <div className="min-h-40 flex w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
        <img src={SystemJewel.src} className="h-8 w-8" alt="" />
        <p className="text-xl font-bold">{message.chatGPTResponse.content}</p>
      </div>
    </>
  );
};

const Book = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchChatMessage = async (): Promise<ChatMessage> => {
    const data = await axios.get(
      "https://imagicnation-production.up.railway.app/story/progress"
    );
    return data.data;
  };
  const fetchInitialData = async (): Promise<Story> => {
    const initialData = await axios.get(
      "https://imagicnation-production.up.railway.app/story/one"
    );
    return initialData.data;
  };
  const { data } = useQuery(["ChatMessage", id], fetchChatMessage);
  const { data: initialData } = useQuery(["story", id], fetchInitialData);

  return (
    <div
      className="flex h-screen flex-col justify-start gap-4 bg-[#411A08]"
      style={{
        backgroundImage: `url(${activeTab.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full items-center bg-[#411A08] px-10 py-4">
        <img
          src={titleImage.src}
          className="mr-auto h-12"
          alt=""
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <div className="flex gap-8 rounded-lg border-4 border-[#EAA916]  bg-[#411A08] p-10">
          <div className="mx-auto flex h-96 w-96 snap-x snap-mandatory overflow-scroll rounded-lg">
            <img
              className="flex h-96 w-96 flex-shrink-0 snap-start bg-amber-200 object-cover"
              src={initialData?.image?.default}
            />
            {data?.message.map((item, id) => (
              <img
                key={id}
                className="flex h-96 w-96 flex-shrink-0 snap-start bg-amber-200 object-cover"
                src={item.image}
              />
            ))}
          </div>
          <div className="flex h-96 flex-1 flex-col gap-4 overflow-y-scroll">
            <div className="min-h-40 flex w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
              <img src={SystemJewel.src} className="h-8 w-8" alt="" />
              <p className="text-xl font-bold">{initialData?.initialDialog}</p>
            </div>
            {data?.message.map((item, id) => (
              <ChatComponent message={item} key={id} />
            ))}
          </div>
        </div>
        <div className="flex h-20 w-full items-center rounded-lg border-4 border-[#EAA916] bg-[#411A08] p-2">
          <input type="text" className="h-full flex-1 bg-transparent" />
          <button className="btn border-4 border-[#EAA916]">send</button>
        </div>
      </div>
    </div>
  );
};

export default Book;
