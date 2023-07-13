import SignInForm from "@/components/form/SignInForm";
import titleImage from "@/assets/iMagicNationIcon.png";
import background from "@/assets/登入註冊頁面背景圖.png";
import NicknameForm from "@/components/form/NicknameForm";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
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
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={titleImage.src} alt="" className="absolute top-4 scale-75" />
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
