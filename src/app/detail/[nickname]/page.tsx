'use client';
import Loading from '@/app/loading';
import MatchAccordion from '@/components/detail/MatchAccordion';
import { Accordion } from '@/components/ui/accordion';
import { useGetMatchIdQuery } from '@/hooks/useGetMatchIdQuery';
import { Suspense } from 'react';

interface ParamsType {
  nickname: string;
}

const Detail = ({ params }: { params: ParamsType }) => {
  const { data, isLoading } = useGetMatchIdQuery(params.nickname, 50);
  if (isLoading) return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-center items-center">
        <div className="container w-full px-20 flex flex-col justify-center items-center">
          {data?.map((element) => {
            return (
              <Accordion key={element} type="single" collapsible className="w-full">
                <MatchAccordion id={element} />
              </Accordion>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default Detail;
