'use client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import MatchDetailContents from './MatchDetailContents';
import { useMatchDetailDataQuery } from '@/hooks/useMatchDetailDataQuery';
import Loading from '@/app/loading';

const MatchAccordion = ({ id }: { id: string }) => {
  const { data, isLoading } = useMatchDetailDataQuery(id);
  if (isLoading) return <Loading />;
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        <MatchDetailContents matchInfo={data.matchInfo} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default MatchAccordion;
