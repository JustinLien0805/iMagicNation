import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
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

type Story = {
  id: number;
  title: string;
  type: string;
  authorId?: string;
  initDialog?: string;
  initImageSrc?: string;
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

const Story = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit");
  }

  const getStory = async () => {
    const { data }: { data: Story[] } = await axios.get("/api/story", {
      params: { storyId: router.query.storyId },
    });
    console.log(data);
    return data[0];
  };

  const { data, isLoading } = useQuery(
    ["story", userId, router.query.storyId],
    getStory,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <div
      className="flex h-screen flex-col justify-start gap-4 bg-[#411A08]"
      style={{
        backgroundImage: 'url("/LibraryBackground.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full items-center bg-[#411A08] px-10 py-4">
        <Image
          src={"/IMagicNationIcon.png"}
          className="cursor-pointer"
          width={420}
          height={80}
          alt=""
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <div className="flex w-full gap-8 rounded-lg border-4 border-[#EAA916]  bg-[#411A08] p-10">
          <div className="flex h-96 flex-1 flex-col gap-8 overflow-y-scroll">
            {data?.initDialog && data?.initImageSrc && (
              <div className="flex h-5/6 w-full flex-shrink-0 gap-4">
                <img
                  className="h-full w-96 flex-shrink-0 rounded-lg bg-amber-200 object-cover"
                  src={data?.initImageSrc}
                />
                <div className="flex w-full gap-4 border-b-2 border-[#EAA916] p-4">
                  <div className="relative h-8 w-8">
                    <Image src={"/SystemJewel.png"} fill alt="" />
                  </div>
                  <p className="text-2xl font-bold text-[#F6E0C1]">
                    {data?.initDialog}
                  </p>
                </div>
              </div>
            )}

            {data?.messages.map((message) => (
              <Chat message={message} key={message.id} />
            ))}
          </div>
        </div>
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className="flex h-32 w-full items-center space-x-4 rounded-lg border-4 border-[#EAA916] bg-[#411A08] p-2"
              style={{
                background:
                  "linear-gradient(to bottom right, #411A08 0%, rgba(107, 60, 34, 0.98) 21%, rgba(65, 26, 8, 0.97) 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #411A08 0%, rgba(107, 60, 34, 0.98) 21%, rgba(65, 26, 8, 0.97) 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #411A08 0%, rgba(107, 60, 34, 0.98) 21%, rgba(65, 26, 8, 0.97) 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #411A08 0%, rgba(107, 60, 34, 0.98) 21%, rgba(65, 26, 8, 0.97) 50%) top right / 50% 50% no-repeat",
              }}
            >
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem className="h-16 w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="輸入故事內容..."
                        className="h-full w-full border-0 bg-transparent text-3xl text-[#F6E0C1] focus-visible:ring-0"
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
                  type="submit"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId,
    },
  };
};

export default Story;
