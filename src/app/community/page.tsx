import CommunityList from '@/components/community/CommunityList';
import CommunityActionButton from '@/components/community/CommunityActionButton';

const Communitypage = async () => {
  return (
    <div className="w-full">
      <section className="flex flex-col justify-center mx-auto max-w-[1400px] mt-10">
        <div className="flex flex-row justify-between border-b-4 border-l-neutral-700 h-14">
          <h1 className="text-2xl font-bold">자유 게시판</h1>
          <CommunityActionButton mode="write" createUserId="" />
        </div>
        <CommunityList />
      </section>
    </div>
  );
};

export default Communitypage;
