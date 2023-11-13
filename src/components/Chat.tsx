import Image from "next/image";
import DictPopover from "./DictPopover";
import { Volume2, Pause } from "lucide-react";
import axios from "axios";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tts = async (text: string) => {
    // If audio is already playing, pause it
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    // If there's already an audio element, just play it
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Otherwise, fetch the new audio and play it
    try {
      const response = await axios.get("/api/audio", {
        params: { text },
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      // Create a new audio element and play it
      const audio = new Audio(url);
      audio.play();
      audioRef.current = audio;
      setIsPlaying(true);

      // Cleanup the object URL when the sound has finished playing
      audio.addEventListener("ended", () => {
        URL.revokeObjectURL(url);
        audioRef.current = null;
        setIsPlaying(false);
      });
    } catch (error) {
      console.error("Error fetching or playing audio:", error);
    }
  };

  const { mutate, isLoading } = useMutation(
    ["audio", message.reply],
    tts,
    {
      onSuccess: () => {
        console.log("Feedback sent");
      },
      onError: () => {
        console.error("Error sending feedback");
      },
    }
  );
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
          <div className="flex flex-col gap-4">
            <div className="relative h-8 w-8">
              <Image src={"/SystemJewel.png"} fill alt="" />
            </div>
            <button
              className="flex cursor-pointer flex-col items-center text-[#f6e0c189] hover:text-[#f6e0c1]"
              disabled={isLoading}
              onClick={() => {
                mutate(message.reply);
              }}
            >
              {!(isPlaying || isLoading) && (
                <>
                  <Volume2 className="h-8 w-8" />
                  <p>播放</p>
                </>
              )}
              {isLoading && (
                <>
                  <Volume2 className="h-8 w-8 text-[#f6e0c1]" />
                  <p>準備中</p>
                </>
              )}
              {isPlaying && (
                <>
                  <Pause className="h-8 w-8 text-[#f6e0c1]" />
                  <p>暫停</p>
                </>
              )}
            </button>
          </div>
          <div className="flex w-full flex-col gap-4 text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
            <DictPopover
              text={message.reply}
              wordsToHighlight={[...words]}
              phrasesToHighlight={[...phrases]}
            />
            {questions && (
              <div className="mb-10 flex flex-col gap-4 rounded-lg border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] p-4">
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
