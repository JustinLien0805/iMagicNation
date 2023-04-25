import React from "react";
import iMagicNationIcon from "@/assets/iMagicNationIcon.png";
import activeTab from "@/assets/activeTab.png";
import { useRouter } from "next/router";
const Create = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="p-4"
        style={{
          background:
            "radial-gradient(138.78% 138.78% at 48.62% -8.75%, #411A08 0%, rgba(107, 60, 34, 0.983906) 41.61%, rgba(65, 26, 8, 0.97) 100%)",
        }}
      >
        <img
          src={iMagicNationIcon.src}
          className="h-16"
          alt=""
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
      <div
        className="flex flex-1 items-center justify-center"
        style={{
          backgroundImage: `url(${activeTab.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="flex h-64 w-1/3 flex-col items-center justify-center gap-4 rounded-lg border-2 border-[#EAA916] p-4"
          style={{
            background:
              "radial-gradient(138.78% 138.78% at 48.62% -8.75%, #411A08 0%, rgba(107, 60, 34, 0.983906) 41.61%, rgba(65, 26, 8, 0.97) 100%)",
          }}
        >
          <input type="text" className="input input-lg w-full max-w-xs bg-[#F6E0C1]" />
          <button
            className="btn btn-lg text-[#411A08]" 
            style={{
              backgroundImage: `url(${activeTab.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            進入故事
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
