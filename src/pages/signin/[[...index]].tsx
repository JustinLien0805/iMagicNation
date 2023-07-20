import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

import { useRouter } from "next/router";

const SignInPage = () => {
  const router = useRouter();
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

      <SignIn
        afterSignInUrl={"/"}
        appearance={{
          elements: {
            card: "bg-[#412C2B] rounded-lg p-8",
            headerTitle: "text-[#F6E0C1]",
            headerSubtitle: "text-[#F6E0C1]",
            socialButtonsBlockButton:
              "bg-[#F6E0C1] text-[#412C2B] border-[#F6E0C1] hover:bg-[#F6E0C1] hover:text-[#F6E0C1] hover:scale-105",
            socialButtonsBlockButtonText__google:
              "hover:text-[#412C2B] text-[#412C2B]",
            socialButtonsBlockButtonArrow__google: "text-[#412C2B]",
            dividerLine: "bg-[#F6E0C1]",
            dividerText: "text-[#F6E0C1]",
            formFieldLabel: "text-[#F6E0C1]",
            formButtonPrimary:
              "bg-[#F6E0C1] text-[#412C2B] hover:bg-[#F6E0C1] hover:text-[#412C2B] hover:scale-105",
            footerActionText: "text-[#f6e0c1c3",
            footerActionLink: "text-[#F6E0C1] hover:text-[#F6E0C1]",
            identityPreview: "bg-[#412C2B] border-[#F6E0C1]",
            identityPreviewText: "text-[#F6E0C1]",
            identityPreviewEditButtonIcon: "text-[#F6E0C1]",
            formHeaderTitle: "text-[#F6E0C1]",
            formHeaderSubtitle: "text-[#f6e0c1c3]",
            formResendCodeLink: "text-[#F6E0C1] hover:text-[#F6E0C1]",
          },
        }}
      />
      {/* <SignedIn>
        <Alert className="max-w-md border-0 bg-[#412C2B] text-[#F6E0C1]">
          <AlertCircle className="mb-1 h-6 w-6" color="#F6E0C1" />
          <AlertTitle className="text-xl">Heads up!</AlertTitle>
          <AlertDescription>已登入成功！</AlertDescription>
          <footer className="flex justify-end gap-4">
            <Button
              className="cursor-pointer bg-[#F6E0C1] text-[#412C2B]"
              onClick={() => {
                router.push("/");
              }}
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                回到主頁
              </motion.button>
            </Button>
            <Button
              className="cursor-pointer bg-[#F6E0C1] text-[#412C2B]"
              asChild
            >
              <SignOutButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  登出
                </motion.button>
              </SignOutButton>
            </Button>
          </footer>
        </Alert>
      </SignedIn> */}
    </div>
  );
};
export default SignInPage;
