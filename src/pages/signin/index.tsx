import SignInForm from "@/components/form/SignInForm";
import NicknameForm from "@/components/form/NicknameForm";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
const SignIn = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url('/SignInBackground.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={"/iMagicNationIcon.png"}
        alt=""
        className="absolute top-4"
        width={420}
        height={80}
      />
      <AnimatePresence initial={false}>
        {isRegister ? (
          <NicknameForm setIsRegister={setIsRegister} userInfo={userInfo} />
        ) : (
          <SignInForm
            setIsRegister={setIsRegister}
            setUserInfo={setUserInfo}
            isRegister={isRegister}
          />
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};
export default SignIn;
