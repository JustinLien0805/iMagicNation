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
    case "科技資訊與媒體素養":
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
        <Image
          src={"/iMagicNationIcon.png"}
          alt=""
          className="absolute left-4 top-4 cursor-pointer"
          width={420}
          height={80}
        />
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
            <div className="flex h-full w-1/2 flex-col justify-center pl-8">
              <LectureStoryForm />
            </div>
          ) : (
            <div className=" grid h-full w-1/2 grid-cols-2 flex-col justify-center gap-4 p-10 pl-8">
              {STAGES.map((stage, key) => (
                <button
                  key={key}
                  className="inline-block w-48 cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-3xl font-bold text-[#411A08]"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  }}
                  onClick={() => {
                    router.push(`/story/ethical-story/${type}/${key + 1}`);
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
