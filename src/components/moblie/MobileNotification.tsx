import React from "react";
import Image from "next/image";
const MobileNotification = () => {
  return (
    <div className="block bg-[#131313] text-[#F6E0C1] sm:hidden">
      <div className="relative flex h-screen w-full flex-col items-center justify-center gap-4 tracking-wide">
        <div className="absolute top-5 aspect-[5/1] w-3/5">
          <Image src={"/iMagicNationIcon.png"} alt="" fill />
        </div>
        <div className="relative aspect-[3/4] w-2/5">
          <Image src="/Responsive.png" alt="" fill />
        </div>
        <h1 className="[text-wrap: balance] w-4/5 text-center text-2xl font-bold">
          IMagicNation 手機版即將推出
        </h1>
        <p className="text-balance [text-wrap: balance] text-md w-4/5 text-center text-[#f6e0c1b7]">
          在此期間，請透過平板電腦、筆記型電腦或更大螢幕尺寸的裝置使用
          Imagination。
        </p>
      </div>
    </div>
  );
};

export default MobileNotification;
