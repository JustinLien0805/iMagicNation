import { useRouter } from "next/router";
import EthicDialog from "@/components/EthicDialog";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { UserNav } from "@/components/UserNav";

const Home = () => {
  const router = useRouter();
  return (
    <div
      className="relative flex h-screen w-screen"
      style={{
        backgroundImage: `url('/HomePage.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <div className="absolute right-10 top-4 flex flex-col items-center space-y-4">
        <UserNav />
        <motion.div
          className="relative h-24 w-20 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push("/story");
          }}
        >
          <Image src={"/LibraryIcon.png"} alt="LibraryIcon" fill />
        </motion.div>
      </div>
      <EthicDialog
        type="多元文化與國際理解"
        position="absolute left-[10%] top-2/3"
      />
      <EthicDialog
        type="科技資訊與媒體素養"
        position="absolute top-[20%] left-1/3"
      />
      <EthicDialog
        type="人際關係與團隊合作"
        position="absolute right-[10%] top-[40%]"
      />
      <EthicDialog
        type="道德實踐與公民意識"
        position="absolute bottom-[15%] left-1/2"
      />
      <EthicDialog type="課綱故事" position="absolute left-[40%] top-1/2 " />
      <Toaster />
    </div>
  );
};

export default Home;
