import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
        <Image
          src={"/iMagicNationIcon.png"}
          width={420}
          height={80}
          alt=""
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
    </div>
  );
};

export default Create;
