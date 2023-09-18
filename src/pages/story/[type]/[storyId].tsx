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
import SyncLoader from "react-spinners/SyncLoader";
import { Skeleton } from "@/components/ui/skeleton";
import StoryLoader from "@/components/loader/StoryLoader";

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

const Story = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getStory = async () => {
    const { data }: { data: Story[] } = await axios.get("/api/story", {
      params: { storyId: router.query.storyId },
    });
    console.log(data);
    return data[0];
  };

  const { data, isLoading } = useQuery(
    ["story", router.query.storyId],
    getStory,
    {
      onSuccess: (data) => {
        console.log(data);
        setMessages(data.messages);
      },
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const postMessage = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData.input);
    const res = await axios.post("/api/message", {
      storyId: router.query.storyId,
      input: formData.input,
    });
    return res;
  };

  const { mutate, isLoading: postLoading } = useMutation(postMessage, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["story", router.query.storyId]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
    form.setValue("input", "");
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!data || isLoading) {
    return <StoryLoader />;
  }

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
      <div className="flex max-w-7xl flex-col items-center justify-center gap-4 p-10">
        <div className="flex w-full gap-8 rounded-lg border-4 border-[#EAA916]  bg-[#411A08] p-10">
          <div
            className="flex h-96 flex-1 snap-y snap-mandatory flex-col gap-8 overflow-y-scroll"
            ref={chatContainerRef}
          >
            {data.initDialog && (
              <div className="flex h-5/6 w-full flex-shrink-0 snap-start gap-4">
                <img
                  className="h-full w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1] object-cover"
                  src={data.initImage}
                  alt="initImage"
                />
                <div className="flex w-full gap-4 border-b-2 border-[#EAA916] p-4">
                  <div className="relative h-8 w-8">
                    <Image src={"/SystemJewel.png"} fill alt="SystemJewel" />
                  </div>
                  <p className="w-full text-2xl font-bold text-[#F6E0C1]">
                    {data.initDialog}
                  </p>
                </div>
              </div>
            )}

            {data.messages.map((message) => (
              <Chat message={message} key={message.id} />
            ))}
            {postLoading && <LoadingChat input={form.getValues().input} />}
          </div>
        </div>
        <Form {...form}>
          <form
            className={`w-full ${
              data.messages.length === 10 ? "hidden" : "flex"
            }`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex h-32 w-full items-center space-x-4 rounded-lg border-4 border-[#EAA916] bg-[#411A08] bg-gradient-to-t from-[#411A08] to-[#572813] p-2">
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem className="h-16 w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="輸入故事內容..."
                        className="h-full w-full border-0 bg-transparent text-3xl text-[#F6E0C1] placeholder:text-[#f6e0c18b] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                asChild
                className="h-16 w-16 cursor-pointer bg-transparent"
              >
                <motion.button
                  disabled={
                    form.formState.isSubmitting || form.getValues().input === ""
                  }
                  style={{
                    backgroundImage: 'url("/SendBtn.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const LoadingChat = ({ input }: { input: string }) => {
  return (
    <div className="flex min-h-[24rem] w-full flex-shrink-0 snap-start gap-4">
      <Skeleton className="max-h-96 w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1]" />
      <div className="flex w-full flex-col">
        <div className="flex h-40 w-full flex-shrink-0 flex-row-reverse gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/UserJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-right text-2xl font-bold text-[#F6E0C1]">
            {input}
          </p>
        </div>
        <div className="flex min-h-[14rem] w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
          <div className="relative h-8 w-8">
            <Image src={"/SystemJewel.png"} fill alt="" />
          </div>
          <p className="w-full text-2xl font-bold text-[#F6E0C1]">
            <SyncLoader color="#F6E0C1" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
