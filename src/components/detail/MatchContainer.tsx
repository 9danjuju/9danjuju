'use client';

import { useGetMatchIdQueryInfiniteQuery } from '@/hooks/useGetMatchIdQuery';
import { Accordion } from '@radix-ui/react-accordion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import MatchAccordion from './MatchAccordion';
import { useQueryClient } from '@tanstack/react-query';

const MatchContainer = () => {
  const [matchType, setMatchType] = useState<number>(50);
  const params = useParams();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage } = useGetMatchIdQueryInfiniteQuery(params.nickname as string, matchType);
  const allMatches = data?.pages.flat() || [];

  const handleMatchType = (matchType: number) => {
    setMatchType(matchType);
    queryClient.invalidateQueries({ queryKey: ['matchid', params.nickname, matchType] });
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <nav className="bg-yellow-400 flex items-center m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
        <span onClick={() => handleMatchType(50)} className="cursor-pointer">
          공식경기
        </span>
        <span onClick={() => handleMatchType(30)} className="cursor-pointer">
          공식친선
        </span>
        <span onClick={() => handleMatchType(52)} className="cursor-pointer">
          감독모드
        </span>
      </nav>
      {allMatches.map((element) => {
        return (
          <Accordion key={element} type="single" collapsible className="w-full">
            <MatchAccordion id={element} />
          </Accordion>
        );
      })}
      {hasNextPage ? (
        <button onClick={handleLoadMore} className="bg-gray-300 text-white max-w-3xl w-full mx-auto p-3">
          더보기
        </button>
      ) : null}
    </div>
  );
};

export default MatchContainer;
