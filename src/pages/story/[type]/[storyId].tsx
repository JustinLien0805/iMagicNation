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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Chat from "@/components/Chat";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useEffect, useState } from "react";
import { UserNav } from "@/components/UserNav";
import SyncLoader from "react-spinners/SyncLoader";
import { Skeleton } from "@/components/ui/skeleton";
import StoryLoader from "@/components/loader/StoryLoader";
import DictPopover from "@/components/DictPopover";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Toaster } from "@/components/ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Story = {
  id: number;
  title: string;
  type: string;
  authorId?: string;
  initDialog?: string;
  initImage?: string;
  messages: Message[];
  words: string[];
  phrases: string[];
};

type Message = {
  storyId: string;
  id: string;
  authorId: string;
  input: string;
  reply: string;
  imageSrc: string;
  createdAt: Date;
  blobImage: Blob;
};

const formSchema = z.object({
  input: z.string().min(1, "請輸入訊息").max(50, "訊息長度至多50個字"),
});

const Story = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");

  const getStory = async () => {
    const { data }: { data: Story } = await axios.get("/api/story", {
      params: { storyId: router.query.storyId },
    });

    return data;
  };

  const { data, isLoading, refetch } = useQuery(
    ["story", router.query.storyId],
    getStory,
    {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: "載入故事失敗",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                router.reload();
              }}
            >
              重新載入
            </ToastAction>
          ),
        });
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
    const res = await axios.post("/api/message", {
      storyId: router.query.storyId,
      input: formData.input,
    });
    return res;
  };

  const { mutate, isLoading: postLoading } = useMutation(postMessage, {
    onSuccess: (data) => {
      refetch();

      form.reset();
      queryClient.invalidateQueries(["story", router.query.storyId]);
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "載入故事失敗",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              router.reload();
            }}
          >
            重新載入
          </ToastAction>
        ),
      });
    },
    onMutate: () => {
      scrollToBottom();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  const downloadStory = async () => {
    const {
      data,
    }: {
      data: {
        videoSrc: string;
      };
    } = await axios.get("/api/story/download", {
      params: { storyId: router.query.storyId },
    });

    return data;
  };

  const {
    mutate: downloadStoryMutate,
    isSuccess,
    isLoading: downloadStoryLoading,
    isError: downloadStoryError,
  } = useMutation(downloadStory, {
    onSuccess: (data) => {
      setUrl(data.videoSrc);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteStory = async () => {
    const { data }: { data: Story } = await axios.delete("/api/story", {
      params: { storyId: router.query.storyId },
    });

    return data;
  };

  const { mutate: deleteStoryMutate } = useMutation(deleteStory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["story", router.query.storyId]);
      toast({
        className: "bg-green-500 border-green-500 text-white",
        variant: "default",
        title: "Success!",
        description: "故事已刪除",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!data || isLoading) {
    return <StoryLoader />;
  }

  return (
    <>
      <div
        className="flex h-screen flex-col items-center overflow-x-hidden bg-[#411A08]"
        style={{
          backgroundImage: 'url("/LibraryBackground.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Toaster />
        <div className="flex w-full items-center bg-gradient-to-r from-[#411A08] via-[#572813] to-[#411A08] px-10 py-4">
          <Image
            src={"/iMagicNationIcon.png"}
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
        <div className="flex w-[80rem] flex-col items-center justify-center gap-4 p-10">
          <div className="flex w-full items-center justify-between">
            <button
              className="relative inline-block h-16 min-w-[20rem] cursor-default rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
              style={{
                background:
                  "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Image
                src={"/StoryBookIcon.png"}
                alt="book"
                height={95}
                width={102}
                className="absolute -left-10 -top-12"
              />
              {data.title}
            </button>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  {data.messages.length === 6 && (
                    <Button
                      className="inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => {
                        downloadStoryMutate();
                      }}
                    >
                      下載故事
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  className="rounded-lg border-2 border-[#EAA916] bg-[#411A08] text-[#F6E0C1] sm:max-w-[425px]"
                >
                  <DialogHeader>
                    <DialogTitle>下載故事</DialogTitle>
                    <DialogDescription className="text-[#f6e0c1a2]">
                      {downloadStoryLoading &&
                        "正在將故事產生成影片，大約需要 30 秒"}
                      {isSuccess &&
                        "影片已生成，點擊下載按鈕下載影片，或點擊右上角關閉視窗"}
                      {downloadStoryError && "影片生成失敗"}
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    {downloadStoryLoading && (
                      <p className="flex items-center gap-4">
                        <ScaleLoader color="#F6E0C1" /> 影片生成中...
                      </p>
                    )}
                    {isSuccess && (
                      <Button
                        asChild
                        className="w-full bg-[#F6E0C1] text-[#411A08]"
                      >
                        <a href={url} download>
                          下載影片
                        </a>
                      </Button>
                    )}
                    {downloadStoryError && <p>影片生成失敗</p>}
                  </div>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    刪除故事
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-[#DD524C] bg-[#DD524C] ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>確定要刪除故事嗎？</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#000000]">
                      刪除後將永遠無法復原
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deleteStoryMutate();
                      }}
                    >
                      刪除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                className="inline-block h-16 w-48 cursor-pointer self-start rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105"
                style={{
                  background:
                    "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
                onClick={() => {
                  router.push("/story");
                }}
              >
                回上頁
              </Button>
            </div>
          </div>
          <div className="flex w-full gap-8 rounded-lg border-4 border-[#EAA916] bg-[#411A08] p-10">
            <div
              className="flex h-96 flex-1 snap-y snap-mandatory flex-col gap-8 overflow-y-scroll"
              ref={chatContainerRef}
            >
              {data.initDialog && (
                <div className="flex h-5/6 flex-shrink-0 snap-start gap-4">
                  <img
                    className="h-full w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1] object-cover"
                    src={data.initImage}
                    alt="initImage"
                  />
                  <div className="flex w-full gap-4 border-b-2 border-[#EAA916] p-4">
                    <div className="relative h-8 w-8">
                      <Image src={"/SystemJewel.png"} fill alt="SystemJewel" />
                    </div>
                    <DictPopover
                      text={data.initDialog}
                      wordsToHighlight={[...data.words]}
                    />
                  </div>
                </div>
              )}

              {data.messages.map((message) => (
                <Chat
                  message={message}
                  key={message.id}
                  words={data.words}
                  phrases={data.phrases}
                />
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
                          placeholder={
                            data.messages.length === 6
                              ? "故事已完結"
                              : "輸入故事內容..."
                          }
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
                      postLoading ||
                      form.getValues().input === "" ||
                      data.messages.length === 6
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
    </>
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
