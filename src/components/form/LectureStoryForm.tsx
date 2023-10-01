import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GRADES, PUBLISHERS, LessonIdMapping } from "@/constant/Lectures";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import FormLoader from "@/components/loader/FormLoader";

const FormSchema = z.object({
  publisher: z.string({
    required_error: "Please select a publisher.",
  }),
  grade: z.string({
    required_error: "Please select a grade.",
  }),
  lesson: z.string({
    required_error: "Please select a lesson.",
  }),
});

interface LessonData {
  [publisher: string]: {
    [grade: string]: string[];
  };
}

export default function LetureStoryForm() {
  const router = useRouter();
  const { toast } = useToast();
  const getLessons = async () => {
    const { data }: { data: LessonData } = await axios.get("api/lecture");

    return data;
  };

  const { data, isLoading } = useQuery(["lessons"], getLessons);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      publisher: "康軒",
      grade: "一上",
      lesson: "第一課",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const lessonId = LessonIdMapping[data.lesson];
    const type = data.publisher + data.grade;
    router.push(`/story/${type}/${lessonId}`);
  }

  if (isLoading) return <FormLoader />;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Card className="w-[350px] border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] text-[#F6E0C1]">
        <CardHeader>
          <CardTitle>開啟故事</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>出版社</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        form.resetField("grade");
                        form.resetField("lesson");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="ring-[border-2 border-[#EAA916]] border-[#EAA916] bg-[#F6E0C1] text-[#411a08]">
                          <SelectValue
                            placeholder="選擇出版社"
                            className="text-[#411A08]"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PUBLISHERS.map((publisher) => (
                          <SelectItem
                            key={publisher}
                            value={publisher}
                            className="text-[#411A08]"
                          >
                            {publisher}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年級</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        form.resetField("lesson");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#F6E0C1] text-[#411a08]">
                          <SelectValue placeholder="選擇年級" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-[#411A08]">
                        {GRADES.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lesson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>課程</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#F6E0C1] text-[#411a08]">
                          <SelectValue placeholder="選擇年級" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-[#411A08]">
                        {data[form.getValues("publisher")][
                          form.getValues("grade")
                        ].map((lesson) => (
                          <SelectItem value={lesson} key={lesson}>
                            {lesson}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                asChild
                className="inline-block h-full w-full cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-2xl font-bold text-[#411A08]"
                style={{
                  background:
                    "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <motion.button>開啟故事</motion.button>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
