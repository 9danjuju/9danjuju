import HomeCommunityList from '@/components/community/HomeCommunityList';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchBar from '@/components/SearchBar';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="container flex flex-col justify-center w-full max-w-screen-xl mx-auto px-20 h-screen">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">피파온라인4 전적검색</h1>
          <p className="text-xl font-">넥슨 피파온라인4 api를 사용한 전적 검색 사이트 입니다.</p>
        </div>
        <SearchBar
          className="flex justify-between items-center container px-5 h-[150px] rounded-full my-10 bg-[#ffffff] bg-opacity-40"
          type="contents"
        />
        <HomeCommunityList />
      </div>
    </Suspense>
  );
}
