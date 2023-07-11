import Continent1 from "@/assets/大陸1.png";
import Continent2 from "@/assets/大陸2.png";
import Continent3 from "@/assets/大陸3.png";
import Continent4 from "@/assets/大陸4.png";
import Continent5 from "@/assets/大陸5.png";
import IMagicNationIcon from "@/assets/iMagicNationIcon.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EthicDialogContent,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const EthicDialog = ({
  name,
  position,
}: {
  name: string;
  position: string;
}) => {
  const stages = ["第一關", "第二關", "第三關", "第四關", "第五關", "第六關"];
  let imgSrc = Continent1.src;
  switch (name) {
    case "多元文化與國際理解":
      imgSrc = Continent4.src;
      break;
    case "科技資訊與媒體素養":
      imgSrc = Continent3.src;
      break;
    case "人際關係與團隊合作":
      imgSrc = Continent2.src;
      break;
    case "道德實踐與公民意識":
      imgSrc = Continent5.src;
      break;
    default:
      imgSrc = Continent1.src;
      break;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={clsx(
            "cursor-pointer px-2 py-3 text-2xl font-semibold text-[#411A08]",
            position
          )}
          asChild
          style={{
            borderRadius: "0.75rem",
            border: "5px solid #411A08",
            background:
              "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {name}
          </motion.button>
        </Button>
      </DialogTrigger>
      <EthicDialogContent>
        <img
          src={IMagicNationIcon.src}
          alt=""
          className="absolute left-4 top-4 h-20"
        />
        <div className="flex w-full">
          <div className="flex grow flex-col items-center justify-center space-y-8">
            <DialogHeader>
              <DialogTitle className="text-4xl text-[#411A08]">
                {name}
              </DialogTitle>
            </DialogHeader>
            <img src={imgSrc} alt="" className="h-96" />
          </div>
          <section className="grid h-full grow grid-cols-2 gap-4 p-20">
            {stages.map((stage) => (
              <Button
                className="self-center border-4 border-[#EAA916] px-4 py-6 text-2xl font-semibold text-[#EAA916]"
                style={{
                  borderRadius: "0.75rem",
                  border: "5px solid #EAA916",
                  background:
                    "linear-gradient(180deg, #411A08 0%, #6B3C22 38.02%, #411A08 100%)",
                }}
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {stage}
                </motion.button>
              </Button>
            ))}
          </section>
        </div>
      </EthicDialogContent>
    </Dialog>
  );
};

export default EthicDialog;
