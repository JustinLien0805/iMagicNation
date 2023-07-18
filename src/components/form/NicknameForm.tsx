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
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, "暱稱長度至少2個字")
    .max(10, "暱稱長度至多10個字"),
});

const NicknameForm = ({
  setIsRegister,
  userInfo,
}: {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: {
    email: string;
    password: string;
  };
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUpMutate.mutate(values);
  }

  const signUp = async (formData: z.infer<typeof formSchema>) => {
    const { data } = await axios.post("api/user", {
      email: userInfo.email,
      password: userInfo.password,
      nickname: formData.nickname,
    });

    return data;
  };

  const signUpMutate = useMutation(signUp, {
    onSuccess: (data) => {
      setIsRegister(false);
      if (data.message !== "註冊成功") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data.message,
          action: <ToastAction altText="Try again">再試一次！</ToastAction>,
        });
      }
      if (data.message === "註冊成功") {
        toast({
          title: "Congratulations! You've signed up successfully",
          description: data.message,
          action: <ToastAction altText="Try again">重新登入！</ToastAction>,
          className: "bg-emerald-500 text-white",
        });
        router.push("/home");
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 pt-20 sm:w-3/4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-[#412C2B] p-8">
          <h1 className="w-3/4 pb-4 text-center text-2xl font-semibold text-white">
            歡迎進入 iMagicNation 的世界 現在為自己取一個暱稱吧！
          </h1>
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="輸入暱稱"
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

export default NicknameForm;
