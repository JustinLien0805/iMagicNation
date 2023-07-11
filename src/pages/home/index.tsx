import iMagicNationIcon from "@/assets/iMagicNationIcon.png";
import LibraryIcon from "@/assets/LibraryIcon.png";
import ClassIcon from "@/assets/ClassIcon.png";
import MainBg from "@/assets/主頁面背景圖.png";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";

const EthicBtn = ({ name, position }: { name: string; position: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={clsx(
            "cursor-pointer px-2 py-3 font-semibold text-[#411A08] text-2xl",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const home = () => {
  const router = useRouter();
  return (
    <div
      className="relative flex h-screen w-screen"
      style={{
        backgroundImage: `url(${MainBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={iMagicNationIcon.src}
        alt="iMagicNationIcon"
        className="absolute left-4 top-4 h-20"
      />
      <div className="absolute right-4 top-4 flex flex-col">
        <div>
          <img src={ClassIcon.src} alt="ClassIcon" className="h-32" />
        </div>
        <div
          onClick={() => {
            router.push("/library");
          }}
        >
          <img src={LibraryIcon.src} alt="LibraryIcon" className="h-32" />
        </div>
      </div>
      <EthicBtn
        name="多元文化與國際理解"
        position="absolute left-[10%] top-2/3"
      />
      <EthicBtn
        name="科技資訊與媒體素養"
        position="absolute top-[20%] left-1/3"
      />
      <EthicBtn
        name="人際關係與團隊合作"
        position="absolute right-[10%] top-[40%]"
      />
      <EthicBtn
        name="道德實踐與公民意識"
        position="absolute bottom-[15%] left-1/2"
      />
      <EthicBtn name="我的故事" position="absolute left-[40%] top-1/2 " />
    </div>
  );
};

export default home;
