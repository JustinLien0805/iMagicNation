import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { UserNav } from "@/components/UserNav";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const StoryLoader = () => {
  const router = useRouter();
  return (
    <div
      className="flex h-screen flex-col justify-start overflow-hidden bg-[#411A08]"
      style={{
        backgroundImage: 'url("/LibraryBackground.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full items-center bg-gradient-to-r from-[#411A08] via-[#572813] to-[#411A08] px-10 py-4">
        <Image
          src={"/iMagicNationIcon.png"}
          className="mr-auto cursor-pointer"
          width={420}
          height={80}
          alt=""
          onClick={() => {
            router.push("/");
          }}
        />
        <UserNav />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <div className="flex w-full gap-8 rounded-lg bg-[#411A08] p-10">
          <div className="flex h-96 flex-1 snap-y snap-mandatory flex-col gap-8 overflow-y-scroll">
            <div className="flex min-h-[24rem] w-full flex-shrink-0 snap-start gap-4">
              <Skeleton className="max-h-96 w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1]" />
              <div className="flex w-full flex-col">
                <div className="flex h-40 w-full flex-shrink-0 flex-row-reverse gap-4 border-b-2 border-[#EAA916] p-4">
                  <div className="relative h-8 w-8">
                    <Image src={"/UserJewel.png"} fill alt="" />
                  </div>
                  <Skeleton className="w-full bg-[#F6E0C1] text-right text-2xl font-bold"></Skeleton>
                </div>
                <div className="flex min-h-[14rem] w-full flex-shrink-0 gap-4 border-b-2 border-[#EAA916] p-4">
                  <div className="relative h-8 w-8">
                    <Image src={"/SystemJewel.png"} fill alt="" />
                  </div>
                  <Skeleton className="w-full bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex h-32 w-full items-center space-x-4 rounded-lg bg-[#411A08] bg-gradient-to-t from-[#411A08] to-[#572813] p-2">
            <div
              placeholder="輸入故事內容..."
              className="h-full w-full border-0 bg-transparent text-3xl text-[#F6E0C1] placeholder:text-[#f6e0c18b] focus-visible:ring-0"
            />

            <Button asChild className="h-16 w-16 cursor-pointer bg-transparent">
              <button
                disabled={true}
                style={{
                  backgroundImage: 'url("/SendBtn.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryLoader;
