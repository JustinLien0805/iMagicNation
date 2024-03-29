import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EthicDialogContent,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import LectureStoryForm from "./form/LectureStoryForm";

const STAGES = ["第一關", "第二關", "第三關", "第四關", "第五關", "第六關"];

const EthicDialog = ({
  type,
  position,
}: {
  type: string;
  position: string;
}) => {
  const router = useRouter();
  let imgSrc = "/大陸1.png";

  switch (type) {
    case "多元文化與國際理解":
      imgSrc = "/大陸4.png";
      break;
    case "資訊科技與媒體素養":
      imgSrc = "/大陸3.png";
      break;
    case "人際關係與團隊合作":
      imgSrc = "/大陸2.png";
      break;
    case "道德實踐與公民意識":
      imgSrc = "/大陸5.png";
      break;
    default:
      imgSrc = "/大陸1.png";
      break;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={clsx(
            "inline-block h-16 cursor-pointer rounded-lg border-4 border-[#411A08] px-2 py-3 text-xl font-semibold text-[#411A08]",
            position
          )}
          asChild
          style={{
            background:
              "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type}
          </motion.button>
        </Button>
      </DialogTrigger>
      <EthicDialogContent>
        <div className="absolute left-10 top-5 aspect-[5/1] h-16 cursor-pointer">
          <Image
            src={"/iMagicNationIcon.png"}
            alt=""
            fill
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex w-full">
          <div className="flex grow flex-col items-center justify-center space-y-8">
            <DialogHeader>
              <DialogTitle className="text-4xl text-[#411A08]">
                {type}
              </DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video w-full">
              <Image src={imgSrc} alt="" fill={true} />
            </div>
          </div>
          {type === "課綱故事" ? (
            <div className="flex h-full w-1/2 flex-col justify-center gap-8">
              {/* <LectureStoryForm /> */}
              <Card className=" bg-gradient-to-t from-[#411A08] to-[#572813]">
                <CardHeader>
                  <CardTitle className="self-center text-3xl font-bold text-[#F6E0C1]">
                    選擇出版社
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <button
                    className="inline-block w-full cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105 lg:w-48 lg:text-3xl"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      router.push(`/story/category/康軒`);
                    }}
                  >
                    康軒
                  </button>
                  <button
                    className="inline-block w-64 cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-2xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105 lg:w-48 lg:text-3xl"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      router.push(`/story/category/翰林`);
                    }}
                  >
                    翰林
                  </button>
                  <button
                    className="inline-block w-64 cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-2xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105 lg:w-48 lg:text-3xl"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      router.push(`/story/category/南一`);
                    }}
                  >
                    南一
                  </button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className=" grid h-full w-1/2 grid-cols-2 flex-col justify-center gap-4 p-10 pl-8">
              {STAGES.map((stage, key) => (
                <button
                  key={key}
                  className="inline-block w-32 cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-2xl font-bold text-[#411A08] transition duration-150 ease-out hover:scale-105 lg:w-48 lg:text-3xl"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  }}
                  onClick={() => {
                    router.push(`/story/ethical-story/${type}/1`);
                  }}
                >
                  {stage}
                </button>
              ))}
            </div>
          )}
        </div>
      </EthicDialogContent>
    </Dialog>
  );
};

export default EthicDialog;
