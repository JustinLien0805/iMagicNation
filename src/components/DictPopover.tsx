import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

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

function DictTooltip({
  text,
  wordsToHighlight,
  phrasesToHighlight = [],
}: {
  text: string;
  wordsToHighlight: string[];
  phrasesToHighlight?: string[];
}) {
  if (wordsToHighlight.length === 0)
    return (
      <section className="w-full text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
        {text}
      </section>
    );
  const wordsSet = wordsToHighlight[0].split(" ");
  const phrasesSet = phrasesToHighlight[0].split(" ");

  console.log(wordsSet);
  console.log(phrasesSet);

  // 處理詞組高亮
  phrasesToHighlight.forEach((phrase) => {
    text = text.replace(
      new RegExp(phrase, "g"),
      (match) => `<CustomPopover word="${match}" />`
    );
  });

  const tokens = [];
  let i = 0;

  while (i < text.length) {
    let matched = false;

    // 檢查是否是詞組的一部分
    for (const phrase of phrasesSet) {
      if (text.substring(i, i + phrase.length) === phrase) {
        console.log(phrase);
        tokens.push(<CustomPopover word={phrase} key={i + phrase} />);
        i += phrase.length;
        matched = true;
        break;
      }
    }

    // 如果不是詞組的一部分，則檢查單字
    if (!matched) {
      for (const word of wordsSet) {
        if (text[i] === word) {
          tokens.push(<CustomPopover word={word} key={i + word} />);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      tokens.push(text[i]);
    }
    i++;
  }

  return (
    <section className="w-full text-2xl font-bold leading-10 tracking-wide text-[#F6E0C1]">
      {tokens}
    </section>
  );
}

export default DictTooltip;

const CustomPopover = ({ word }: { word: string }) => {
  const [definition, setDefinition] = useState<DictionaryEntry>();
  const getDefinition = async (word: string) => {
    const { data } = await axios.get("/api/inquiry", {
      params: {
        word: word,
      },
    });
    return data;
  };

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    ["definition", word],
    getDefinition,
    {
      onSuccess: (data) => {
        setDefinition(data.data);
      },
    }
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="cursor-pointer border-b-2 border-cyan-500"
          onClick={() => {
            mutate(word);
          }}
        >
          {word}
        </span>
      </PopoverTrigger>
      <PopoverContent className="border-0 bg-transparent p-0">
        <Card className="border-2 border-[#EAA916] bg-gradient-to-t from-[#411A08] to-[#572813] text-[#F6E0C1]">
          {isLoading && <SyncLoader color="#F6E0C1" className="p-6" />}
          {isSuccess && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">{definition?.title}</CardTitle>
                <CardDescription className="text-[#f6e0c189]">
                  注音：{definition?.concise_dict?.heteronyms[0]?.bopomofo}
                  <br />
                  部首：{definition?.concise_dict?.radical}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xl">
                <p>
                  {definition?.concise_dict?.heteronyms[0]?.definitions[0]?.def}
                </p>
              </CardContent>
            </>
          )}
          {isError && <p className="p-6">查無此字</p>}
        </Card>
      </PopoverContent>
    </Popover>
  );
};
