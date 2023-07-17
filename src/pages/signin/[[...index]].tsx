import SignInForm from "@/components/form/SignInForm";
import NicknameForm from "@/components/form/NicknameForm";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { SignIn, SignOutButton } from "@clerk/nextjs";

const SignInPage = () => {
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
          // <SignInForm
          //   setIsRegister={setIsRegister}
          //   setUserInfo={setUserInfo}
          //   isRegister={isRegister}
          // />
          <SignIn
            redirectUrl={"/home"}
            appearance={{
              elements: {
                card: "bg-[#412C2B] rounded-lg p-8",
                headerTitle: "text-[#F6E0C1]",
                headerSubtitle: "text-[#F6E0C1]",
                socialButtonsBlockButton:
                  "bg-[#F6E0C1] text-[#412C2B] border-[#F6E0C1] hover:bg-[#F6E0C1] hover:text-[#F6E0C1]",
                socialButtonsBlockButtonText__google:
                  "hover:text-[#412C2B] text-[#412C2B]",
                socialButtonsBlockButtonArrow__google: "text-[#412C2B]",
                dividerLine: "bg-[#F6E0C1]",
                dividerText: "text-[#F6E0C1]",
                formFieldLabel: "text-[#F6E0C1]",
                formButtonPrimary: "bg-[#F6E0C1] text-[#412C2B]",
                footerActionText: "text-[#988778]",
                footerActionLink: "text-[#F6E0C1]",
              },
            }}
          />
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};
export default SignInPage;
