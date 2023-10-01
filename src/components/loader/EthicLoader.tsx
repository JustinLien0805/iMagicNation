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
      <div className="flex h-screen flex-col items-center justify-center gap-4 p-10">
        <div className="flex h-full w-full gap-8 rounded-lg bg-[#411A08] p-10">
          <div className="flex h-full flex-1 flex-col gap-8 overflow-y-scroll">
            <div className="flex h-full w-full gap-4">
              <Skeleton className="max-h-96 w-96 flex-shrink-0 rounded-lg bg-[#F6E0C1]" />
              <div className="flex h-full w-full flex-col gap-4">
                <div className="flex min-h-[14rem] w-full flex-shrink-0 gap-4 p-4">
                  <div className="relative h-8 w-8">
                    <Image src={"/SystemJewel.png"} fill alt="" />
                  </div>
                  <Skeleton className="w-full bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
                </div>
                <Skeleton className="h-12 w-full rounded-lg bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
                <Skeleton className="h-12 w-full rounded-lg bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
                <Skeleton className="h-12 w-full rounded-lg bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
                <Skeleton className="h-12 w-full rounded-lg bg-[#F6E0C1] text-2xl font-bold"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryLoader;
