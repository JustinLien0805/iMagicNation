import LibraryIcon from "@/assets/LibraryIcon.png";
import IMagicNationIcon from "@/assets/iMagicNationIcon.png";

import ClassIcon from "@/assets/ClassIcon.png";
import MainBg from "@/assets/主頁面背景圖.png";
import { useRouter } from "next/router";
import EthicDialog from "@/components/EthicDialog";

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
        src={IMagicNationIcon.src}
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
      <EthicDialog
        name="多元文化與國際理解"
        position="absolute left-[10%] top-2/3"
      />
      <EthicDialog
        name="科技資訊與媒體素養"
        position="absolute top-[20%] left-1/3"
      />
      <EthicDialog
        name="人際關係與團隊合作"
        position="absolute right-[10%] top-[40%]"
      />
      <EthicDialog
        name="道德實踐與公民意識"
        position="absolute bottom-[15%] left-1/2"
      />
      <EthicDialog name="我的故事" position="absolute left-[40%] top-1/2 " />
    </div>
  );
};

export default home;
