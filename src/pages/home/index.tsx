import { useRouter } from "next/router";
import EthicDialog from "@/components/EthicDialog";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
const home = () => {
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
      <Image
        src={"/iMagicNationIcon.png"}
        alt="iMagicNationIcon"
        className="absolute left-4 top-4"
        width={420}
        height={80}
      />
      <div className="absolute right-4 top-4 flex flex-col">
        <div>
          <img src={"/ClassIcon.png"} alt="ClassIcon" className="h-32" />
        </div>
        <div
          onClick={() => {
            router.push("/library");
          }}
        >
          <img src={"/LibraryIcon.png"} alt="LibraryIcon" className="h-32" />
        </div>
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
      <EthicDialog type="我的故事" position="absolute left-[40%] top-1/2 " />
      <Toaster />
    </div>
  );
};

export default home;
