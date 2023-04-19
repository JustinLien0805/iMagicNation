import { useState } from "react";
import MainBg from "@/assets/主頁面背景圖.png";
const home = () => {
  const [overlay, setOverlay] = useState(true);
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
      <button className="btn absolute left-1/2 top-1/2">創造</button>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
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
