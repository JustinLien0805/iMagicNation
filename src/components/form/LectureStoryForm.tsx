import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { publishers, GRADES } from "@/constant/Lectures";
import { motion } from "framer-motion";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const FormSchema = z.object({
  publisher: z.string({
    required_error: "Please select a publisher.",
  }),
  grade: z.string({
    required_error: "Please select a grade.",
  }),
  lecture: z.string({
    required_error: "Please select a lecture.",
  }),
});

export default function LetureStoryForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createStroy = async (formData: z.infer<typeof FormSchema>) => {
    const type = formData.publisher + formData.grade + formData.lecture;
    const { data } = await axios.post("api/story", {
      type,
      title: "新故事2",
    });

    return data;
  };

  const { mutate, isLoading } = useMutation(createStroy, {
    onSuccess: (data) => {
      router.push(`/story/我的故事/${data.storyId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "請先登入",
        action: <ToastAction altText="Try again">登入</ToastAction>,
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
    const type = data.publisher + data.grade + data.lecture;
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{type}</code>
        </pre>
      ),
    });
  }

  function findLectures(publisherLabel: string, gradeLabel: string) {
    if (!publisherLabel || !gradeLabel) return [];

    const publisher = publishers.find(
      (publisher) => publisher.label === publisherLabel
    );

    const grade = publisher?.grades.find((grade) => grade.label === gradeLabel);
    return grade?.lectures;
  }

  return (
    <Card className="w-[350px] bg-[#412C2B] text-[#F6E0C1]">
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
                <FormItem className="flex w-full flex-col">
                  <FormLabel>出版社</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between text-[#412C2B]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "選擇出版社"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="尋找出版社..." />
                        <CommandEmpty>找不到出版社</CommandEmpty>
                        <CommandGroup className="w-48">
                          {publishers.map((publisher) => (
                            <CommandItem
                              value={publisher.label}
                              key={publisher.label}
                              onSelect={(value) => {
                                form.setValue("publisher", value);
                                form.resetField("lecture");
                                form.trigger("publisher");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  publisher.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {publisher.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>年級</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between text-[#412C2B]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "選擇年級"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="搜尋年級..." />
                        <CommandEmpty>找不到出版社</CommandEmpty>
                        <ScrollArea className="h-48 w-full">
                          <CommandGroup className="w-full">
                            {GRADES.map((grade) => (
                              <CommandItem
                                value={grade}
                                key={grade}
                                onSelect={(value) => {
                                  form.setValue("grade", value);
                                  form.resetField("lecture");
                                  form.trigger("grade");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    grade === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {grade}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lecture"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>課程</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between text-[#412C2B]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "選擇課程"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="搜尋課程..." />
                        <CommandEmpty>找不到課程</CommandEmpty>
                        <CommandGroup>
                          {findLectures(
                            form.getValues("publisher"),
                            form.getValues("grade")
                          )?.map((lecture) => (
                            <CommandItem
                              value={lecture.title}
                              key={lecture.title}
                              onSelect={(value) => {
                                form.setValue("lecture", value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  lecture.title === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {lecture.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              asChild
              className="w-full bg-[#F6E0C1] text-[#412C2B] hover:scale-105"
            >
              <motion.button>開啟故事</motion.button>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
