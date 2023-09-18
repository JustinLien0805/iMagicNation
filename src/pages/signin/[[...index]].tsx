import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
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
            headerTitle: "text-[#F6E0C1] text-3xl",
            headerSubtitle: "text-[#F6E0C1] text-xl",
            headerBackLink: "text-[#F6E0C1] hover:border-[#F6E0C1]",
            headerBackIcon: "text-[#F6E0C1]",
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
            footerActionText: "text-[#f6e0c1c3]",
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
    </div>
  );
};
export default SignInPage;
