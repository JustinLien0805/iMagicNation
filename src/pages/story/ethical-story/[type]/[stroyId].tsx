import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Chat from "@/components/Chat";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState, useEffect } from "react";
import { UserNav } from "@/components/UserNav";

type Story = {
  id: number;
  title: string;
  type: string;
  authorId?: string;
  initDialog?: string;
  initImage?: string;
  messages: Message[];
};

type Message = {
  storyId: string;
  id: string;
  authorId: string;
  input: string;
  reply: string;
  imageSrc: string;
  createdAt: Date;
};

const formSchema = z.object({
  input: z.string().min(1, "請輸入訊息").max(50, "訊息長度至多50個字"),
});

const EthicalStory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // const getStory = async () => {
  //   const { data }: { data: Story[] } = await axios.get("/api/story", {
  //     params: { storyId: router.query.storyId },
  //   });
  //   console.log(data);
  //   return data[0];
  // };

  // const { data, isLoading } = useQuery(
  //   ["story", router.query.storyId],
  //   getStory,
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setMessages(data.messages);
  //     },
  //   }
  // );

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     input: "",
  //   },
  // });

  // const scrollToBottom = () => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  //   }
  // };

  // const postMessage = async (formData: z.infer<typeof formSchema>) => {
  //   console.log(formData.input);
  //   const res = await axios.post("/api/message", {
  //     storyId: router.query.storyId,
  //     input: formData.input,
  //   });
  //   return res;
  // };

  // const { mutate, isLoading: postLoading } = useMutation(postMessage, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //     queryClient.invalidateQueries(["story", router.query.storyId]);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   mutate(values);
  // }

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // if (!data) {
  //   return <div>loading...</div>;
  // }
  // if (postLoading) {
  //   return <div>post loading...</div>;
  // }

  return (
    <div
      className="flex h-screen flex-col items-center overflow-hidden bg-[#411A08]"
      style={{
        backgroundImage: 'url("/LibraryBackground.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full items-center bg-gradient-to-r from-[#411A08] via-[#572813] to-[#411A08] px-10 py-4">
        <Image
          src={"/IMagicNationIcon.png"}
          className="mr-auto cursor-pointer"
          width={420}
          height={80}
          alt=""
          onClick={() => {
            router.push("/");
          }}
        />
        <UserNav />
      </div>
      <div className="flex h-full max-w-7xl flex-col items-center gap-4 p-10">
        <div className="flex h-full w-full gap-8 rounded-lg border-4 border-[#EAA916]  bg-[#411A08] p-10">
          <div
            className="flex max-h-96 flex-1 snap-y snap-mandatory flex-col gap-8 overflow-y-scroll"
            ref={chatContainerRef}
          >
            <div className="flex h-full w-full flex-shrink-0 snap-start gap-4">
              <div className="h-full w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1] object-cover" />
              <div className="flex w-full gap-4 p-4">
                <div className="relative h-8 w-8">
                  <Image src={"/SystemJewel.png"} fill alt="SystemJewel" />
                </div>
                <p className="w-full text-2xl font-bold text-[#F6E0C1]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  aliquid vero enim iure nostrum nobis, dolorum vitae iusto ut
                  veniam? Iure ad quam, quaerat quis beatae impedit fugit labore
                  dignissimos.
                </p>
              </div>
            </div>

            {/* {data.messages.map((message) => (
              <Chat message={message} key={message.id} />
            ))} */}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <motion.button
            className="inline-block cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            a
          </motion.button>
          <motion.button
            className="inline-block cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            a
          </motion.button>
          <motion.button
            className="inline-block cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            a
          </motion.button>
          <motion.button
            className="inline-block cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
            style={{
              background:
                "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            a
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EthicalStory;
