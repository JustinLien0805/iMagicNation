import SignInForm from "@/components/SignInForm";
import titleImage from "@/assets/iMagicNationIcon.png";
import background from "@/assets/登入註冊頁面背景圖.png";
import NicknameForm from "@/components/NicknameForm";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
const SignIn = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={titleImage.src} alt="" className="absolute top-4 scale-75" />
      <AnimatePresence initial={false}>
        {isRegister ? (
          <NicknameForm />
        ) : (
          <SignInForm setIsRegister={setIsRegister} />
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};
export default SignIn;
