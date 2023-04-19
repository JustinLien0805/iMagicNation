import { useState } from "react";
import MainBg from "@/assets/主頁面背景圖.png";
const home = () => {
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
      <button className="btn absolute left-[15%] top-1/2">素養1</button>
      <button className="btn absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2">
        素養2
      </button>
      <button className="btn absolute right-[20%] top-1/2">素養3</button>
      <button className="btn absolute bottom-[15%] left-1/2">素養4</button>
      <button className="btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        創造
      </button>
    </div>
  );
};

export default home;
