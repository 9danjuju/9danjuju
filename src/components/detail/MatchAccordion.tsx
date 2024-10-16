'use client';
import { utcTimeToKstConverter } from '@/utils/services/utcTimeToKstConverter';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import MatchDetailContents from './MatchDetailContents';
import { useMatchDetailDataQuery } from '@/hooks/useMatchDetailDataQuery';
import { useParams } from 'next/navigation';

const MatchAccordion = ({ id }: { id: string }) => {
  const { data } = useMatchDetailDataQuery(id);
  const params = useParams();

  const myMatchResult = data.matchInfo.find((e) => e.nickname === decodeURI(params.nickname as string))?.matchDetail
    .matchResult;

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger
        className={`flex flex-row justify-between items-center m-2 p-2  text-white w-full mx-auto ${
          myMatchResult === '승'
            ? 'bg-blue-500/50 border-l-8 border-blue-500'
            : myMatchResult === '패'
            ? 'bg-red-500/50 border-l-8 border-red-500'
            : 'bg-gray-500/50 border-l-8 border-gray-500'
        }`}
      >
        <span className="font-bold text-4xl">{myMatchResult}</span>
        <div className="flex justify-between items-center flex-grow text-xl">
          <span className="w-1/3 text-right">{data.matchInfo[0].nickname}</span>
          <span className="mx-2 w-1/3 text-center">
            {data.matchInfo[0].shoot.goalTotal} : {data.matchInfo[1].shoot.goalTotal}
          </span>
          <span className="w-1/3 text-left">{data.matchInfo[1].nickname}</span>
        </div>
        <span className="text-xs">{utcTimeToKstConverter(data.matchDate)}</span>
      </AccordionTrigger>
      <AccordionContent>
        <MatchDetailContents matchInfo={data.matchInfo} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default MatchAccordion;
