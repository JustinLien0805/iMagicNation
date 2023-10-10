import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

import { motion } from "framer-motion";
import EthicLoader from "@/components/loader/EthicLoader";
import { useRef, useState } from "react";
import { UserNav } from "@/components/UserNav";

type Ethic = {
  storyId: number;
  type: string;
  partId: number;
  partDetail: string;
  ans1?: string;
  ans2?: string;
  ans3?: string;
  ans4?: string;
  nextPartId1?: number;
  nextPartId2?: number;
  nextPartId3?: number;
  nextPartId4?: number;
  imageSrc: string;
};

type Option = {
  ans?: string;
  nextPartId?: number;
};

const EthicalStory = () => {
  const router = useRouter();
  const [partId, setPardId] = useState<number | undefined>(1);
  const [options, setOptions] = useState<Option[]>();
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getStory = async ({
    queryKey,
  }: {
    queryKey: [string, string | string[] | undefined, number | undefined];
  }) => {
    const [_key, storyId, _partId] = queryKey;
    const { data }: { data: Ethic } = await axios.get("/api/ethic", {
      params: { storyId: storyId, nextPartId: _partId },
    });

    return data;
  };

  const { data, isLoading } = useQuery(
    ["story", router.query.storyId, partId],
    getStory,
    {
      onSuccess: (data) => {
        const mappedOptions = [
          { ans: data.ans1, nextPartId: data.nextPartId1 },
          { ans: data.ans2, nextPartId: data.nextPartId2 },
          { ans: data.ans3, nextPartId: data.nextPartId3 },
          { ans: data.ans4, nextPartId: data.nextPartId4 },
        ];

        // Filter out options where ans or nextPartId are null or undefined
        const validOptions = mappedOptions.filter(
          (option) =>
            option.ans !== null &&
            option.ans !== undefined &&
            option.nextPartId !== null &&
            option.nextPartId !== undefined
        );

        setOptions(validOptions);
      },
    }
  );

  if (isLoading) return <EthicLoader />;
  if (!data) return <div>no data</div>;
  return (
    <div
      className="flex h-full min-h-screen flex-col items-center bg-[#411A08]"
      style={{
        backgroundImage: 'url("/LibraryBackground.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="relative flex w-full items-center justify-end bg-gradient-to-r from-[#411A08] via-[#572813] to-[#411A08] px-10 py-4">
        <div className="absolute left-10 top-5 aspect-[5/1] h-16 cursor-pointer">
          <Image
            src={"/iMagicNationIcon.png"}
            alt=""
            fill
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <UserNav />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-10">
        <div className="flex h-full max-w-7xl gap-8 rounded-lg border-4 border-[#EAA916] bg-[#411A08] p-10">
          <div
            className="flex h-full flex-1 snap-y snap-mandatory flex-col gap-8 overflow-y-scroll"
            ref={chatContainerRef}
          >
            <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
              <img
                src={data.imageSrc}
                className="h-96 w-96 flex-shrink-0 self-center rounded-lg bg-[#F6E0C1] object-cover lg:self-start"
              />
              <div className="flex w-full gap-4 p-4">
                <div className="relative h-8 w-8 flex-shrink-0">
                  <Image src={"/SystemJewel.png"} fill alt="SystemJewel" />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="w-full text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
                    {data.partDetail}
                  </p>
                  <div className="flex w-full flex-col justify-start gap-4">
                    {options?.map((option, index) => {
                      return (
                        <motion.button
                          className="inline-block w-full cursor-pointer self-center rounded-lg border-4 border-[#411A08] px-2 py-3 text-lg font-bold text-[#411A08]"
                          style={{
                            background:
                              "linear-gradient(to bottom right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, #DFD474 0%, #EBBE7A 25%, #E2A10E 50%) top right / 50% 50% no-repeat",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={index}
                          onClick={() => {
                            setPardId(option.nextPartId!);
                          }}
                        >
                          {option.ans}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalStory;
