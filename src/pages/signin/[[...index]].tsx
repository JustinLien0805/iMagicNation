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
        className="absolute top-1 mt-8 md:mt-4 "
        width={420}
        height={80}
      />
      <div className="mt-14">
        <SignIn
          afterSignInUrl={"/"}
          appearance={{
            elements: {
              card: "bg-[#411A08] rounded-lg p-8 border-2 border-[#EAA916] sm:w-[25rem] w-[20rem]",
              headerTitle: "text-[#F6E0C1] text-3xl",
              headerSubtitle: "text-[#F6E0C1] text-xl",
              headerBackLink: "text-[#F6E0C1] hover:border-[#F6E0C1]",
              headerBackIcon: "text-[#F6E0C1]",
              socialButtonsBlockButton:
                "bg-[#F6E0C1] text-[#411A08] border-[#F6E0C1] hover:bg-[#F6E0C1] hover:text-[#F6E0C1] hover:scale-105",
              socialButtonsBlockButtonText__google:
                "hover:text-[#411A08] text-[#411A08]",
              socialButtonsBlockButtonArrow__google: "text-[#411A08]",
              dividerLine: "bg-[#F6E0C1]",
              dividerText: "text-[#F6E0C1]",
              formFieldLabel: "text-[#F6E0C1]",
              formButtonPrimary:
                "bg-[#F6E0C1] text-[#411A08] hover:bg-[#F6E0C1] hover:text-[#411A08] hover:scale-105",
              footerActionText: "text-[#f6e0c1c3]",
              footerActionLink: "text-[#F6E0C1] hover:text-[#F6E0C1]",
              identityPreview: "bg-[#411A08] border-[#F6E0C1]",
              identityPreviewText: "text-[#F6E0C1]",
              identityPreviewEditButtonIcon: "text-[#F6E0C1]",
              formHeaderTitle: "text-[#F6E0C1]",
              formHeaderSubtitle: "text-[#f6e0c1c3]",
              formResendCodeLink: "text-[#F6E0C1] hover:text-[#F6E0C1]",
            },
          }}
        />
      </div>
    </div>
  );
};
export default SignInPage;
