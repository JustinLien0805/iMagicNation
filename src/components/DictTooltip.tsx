import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect } from "react";

function DictTooltip({
  text,
  wordsToHighlight,
}: {
  text: string;
  wordsToHighlight: string[];
}) {
  let result = wordsToHighlight.flatMap((string) => string.split(" "));
  console.log(result);
  const highlightedTokens = [];

  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const word of result) {
      if (text.substring(i, word.length) === word) {
        highlightedTokens.push(
          <TooltipProvider key={`${word}-${i}`}>
            <Tooltip>
              <TooltipTrigger>
                <span className="border-b-2 border-red-500">{word}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Word</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        i += word.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      highlightedTokens.push(text[i]);
      i++;
    }
  }

  return (
    <p className="w-full text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
      {highlightedTokens}
    </p>
  );
}

export default DictTooltip;
