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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  storyTitle: z
    .string()
    .min(2, "故事名稱長度至少2個字")
    .max(20, "故事名稱長度至多20個字"),
});

const StoryForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyTitle: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const createStroy = async (formData: z.infer<typeof formSchema>) => {
    const { data } = await axios.post("api/story", {
      userId: user?.id,
      title: formData.storyTitle,
    });

    return data;
  };

  const { mutate, isLoading } = useMutation(createStroy, {
    onSuccess: (data) => {
      router.push(`/story/我的故事/${data.storyId}`);
      toast({
        title: "成功",
        description: data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "請先登入",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              router.push("/signin");
            }}
          >
            登入
          </ToastAction>
        ),
      });
    },
  });

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex h-72 w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#412C2B] p-8">
          <h2 className="text-center text-2xl font-semibold text-white">
            在這個廣大的世界裡，有無數的未知等著我們去發掘。
            讓我們一起踏上冒險之旅，探索自己的能力和潛力！
          </h2>
          <FormField
            control={form.control}
            name="storyTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="輸入故事名稱"
                    className="h-16 border-2 border-[#1E0B12] bg-[#F6E0C1] text-[#1E0B12]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-4">
          <Button
            type="submit"
            asChild
            className="h-16 grow border-4 border-[#A38984] bg-[#261920] text-white"
            disabled={isLoading}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              確認
            </motion.button>
          </Button>
        </div>
      </motion.form>
    </Form>
  );
};

export default StoryForm;
