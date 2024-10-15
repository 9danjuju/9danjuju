'use client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import MatchDetailContents from './MatchDetailContents';
import { useMatchDetailDataQuery } from '@/hooks/useMatchDetailDataQuery';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';

const MatchAccordion = ({ id }: { id: string }) => {
  const { data, isLoading } = useMatchDetailDataQuery(id);
  const params = useParams();

  if (isLoading) return <Loading />;
  console.log(data);
  const myMatchResult = data.matchInfo.find((e) => e.nickname === decodeURI(params.nickname as string))?.matchDetail
    .matchResult;
  console.log(myMatchResult);

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger
        className={`flex flex-row justify-between items-center m-2 p-2  text-white max-w-3xl w-full mx-auto ${
          myMatchResult === '승' ? 'bg-blue-500' : myMatchResult === '패' ? 'bg-red-500' : 'bg-gray-500'
        }`}
      >
        <span className="font-bold text-4xl">{myMatchResult}</span>
        <div className="flex justify-center flex-grow text-xl">
          <span>{data.matchInfo[0].nickname}</span>
          <span className="mx-2">
            {data.matchInfo[0].shoot.goalTotal} : {data.matchInfo[1].shoot.goalTotal}
          </span>
          <span>{data.matchInfo[1].nickname}</span>
        </div>
        <span className="text-xs">{new Date(data.matchDate).toLocaleString('ko-KR')}</span>
      </AccordionTrigger>
      <AccordionContent>
        <MatchDetailContents matchInfo={data.matchInfo} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default MatchAccordion;
