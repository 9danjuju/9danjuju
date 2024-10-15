import HomeCommunityList from '@/components/community/HomeCommunityList';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="container flex flex-col justify-center w-full max-w-screen-xl mx-auto px-20">
      <SearchBar
        className="flex justify-between items-center container px-5 h-[150px] rounded-full border-solid border-2 my-10"
        type="contents"
      />
      <HomeCommunityList />
    </div>
  );
}
