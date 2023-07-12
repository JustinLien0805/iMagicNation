import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
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
const formSchema = z.object({
  email: z.string().email("請輸入正確的電子郵件格式"),
  password: z.string().min(8, "密碼長度至少8個字"),
});

const SignInForm = ({
  setIsRegister,
}: {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const signIn = async (formData: z.infer<typeof formSchema>) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
      {
        params: {
          userId: formData.password,
        },
      }
    );
    return data;
  };

  const { mutate } = useMutation(signIn, {
    onSuccess: (data) => {
      if (data) {
        router.push("/home");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center space-y-4 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
 
      >
        <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-[#412C2B] p-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="h-16 border-2 border-[#1E0B12] bg-[#F6E0C1] text-[#1E0B12]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="密碼"
                    type="password"
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
            type="button"
            asChild
            className="h-16 grow border-4 border-[#A38984] bg-[#261920] text-white"
            onClick={() => {
              router.push("/home");
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              登入
            </motion.button>
          </Button>
          <Button
            type="submit"
            asChild
            className="h-16 grow border-4 border-[#A38984] bg-[#261920] text-white"
            onClick={() => {
              setIsRegister(true);
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              註冊
            </motion.button>
          </Button>
        </div>
        <Button type="button" variant="link" className="text-lg text-[#261920]">
          忘記密碼
        </Button>
      </motion.form>
    </Form>
  );
};

export default SignInForm;
