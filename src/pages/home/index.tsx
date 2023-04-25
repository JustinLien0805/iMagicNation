import iMagicNationIcon from "@/assets/iMagicNationIcon.png";
import LibraryIcon from "@/assets/LibraryIcon.png";
import ClassIcon from "@/assets/ClassIcon.png";
import MainBg from "@/assets/主頁面背景圖.png";
import { useRouter } from "next/router";
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
        <img src={ClassIcon.src} alt="ClassIcon" className="h-32" />
        <img src={LibraryIcon.src} alt="LibraryIcon" className="h-32" />
      </div>
      <label htmlFor="my-modal-4" className="btn absolute left-[15%] top-1/2">
        素養1
      </label>
      <label htmlFor="my-modal-4" className="btn absolute left-1/2 top-[20%]">
        素養2
      </label>
      <label htmlFor="my-modal-4" className="btn absolute right-[20%] top-1/2">
        素養3
      </label>
      <label
        htmlFor="my-modal-4"
        className="btn absolute bottom-[15%] left-1/2"
      >
        素養4
      </label>
      <button
        className="btn absolute left-1/2 top-1/2"
        onClick={() => router.push("/library/create")}
      >
        create
      </button>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer bg-white/60">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </div>
  );
};

export default home;
