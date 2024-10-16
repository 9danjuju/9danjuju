'use client';

import { useGetMatchIdQueryInfiniteQuery } from '@/hooks/useGetMatchIdQuery';
import { Accordion } from '@radix-ui/react-accordion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import MatchAccordion from './MatchAccordion';
import LoadingSpinner from '../LoadingSpinner';

const MatchContainer = () => {
  const [matchType, setMatchType] = useState<number>(50);
  const params = useParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetMatchIdQueryInfiniteQuery(
    params.nickname as string,
    matchType
  );
  const allMatches = data?.pages.flat() || [];

  const handleMatchType = (matchType: number) => {
    setMatchType(matchType);
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className=" justify-center items-center w-full text-center">
      <nav className="flex  my-2 py-5 gap-5 text-xl max-w-3xl w-full">
        <span
          onClick={() => handleMatchType(50)}
          className={`${matchType === 50 ? 'font-bold border-b-2' : ''} cursor-pointer border-white pb-2`}
        >
          공식경기
        </span>
        <span
          onClick={() => handleMatchType(40)}
          className={`${matchType === 40 ? 'font-bold border-b-2' : ''} cursor-pointer border-white pb-2`}
        >
          친선경기
        </span>
        <span
          onClick={() => handleMatchType(52)}
          className={`${matchType === 52 ? 'font-bold border-b-2 ' : ''} cursor-pointer  border-white pb-2`}
        >
          감독모드
        </span>
      </nav>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {allMatches.map((element) => {
            return (
              <Accordion key={element} type="single" collapsible className="w-full">
                <MatchAccordion id={element} />
              </Accordion>
            );
          })}
        </>
      )}

      {hasNextPage ? (
        <button
          onClick={handleLoadMore}
          className="border-white border-[1px] text-white mt-5  w-1/5 mx-auto p-3 hover:border-2 hover:font-bold hover:bg-white/20"
        >
          더보기
        </button>
      ) : null}
    </div>
  );
};

export default MatchContainer;
