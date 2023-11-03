import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
type DictionaryEntry = {
  title: string;
  concise_dict: ConciseDict;
};

type ConciseDict = {
  radical: string;
  stroke_count: number;
  heteronyms: Heteronym[];
};

type Heteronym = {
  definitions: Definition[];
  bopomofo: string;
};

type Definition = {
  def: string;
};
const Carousel = ({ definitions }: { definitions?: DictionaryEntry[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <>
      <div className="max-w-lg self-center overflow-hidden" ref={emblaRef}>
        <div className="flex gap-10">
          {definitions?.map((definition, index) => (
            <div
              key={index}
              className="flex w-full min-w-0 flex-shrink-0 flex-grow-0 flex-col gap-4 rounded-lg border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] p-4 text-[#F6E0C1]"
            >
              <h3 className="text-2xl font-bold">{definition?.title}</h3>
              <p>注音：{definition?.concise_dict?.heteronyms[0]?.bopomofo}</p>
              <p>部首：{definition?.concise_dict?.radical}</p>
              <p>
                解釋：
                {definition?.concise_dict?.heteronyms[0]?.definitions[0]?.def}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-items-stretch">
        <div className="flex w-full justify-center">
          <ChevronLeft
            onClick={scrollPrev}
            className="h-10 w-10 cursor-pointer text-[#F6E0C1] hover:scale-105"
          />
        </div>
        <div className="flex w-full justify-center">
          <ChevronRight
            onClick={scrollNext}
            className="h-10 w-10 cursor-pointer text-[#F6E0C1] hover:scale-105"
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
