import CommunityList from '@/components/community/CommunityList';
import CommunityActionButton from '@/components/community/CommunityActionButton';

import { serverClient } from '@/utils/supabase/server';

const Communitypage = async () => {
  const { data: posts, error } = await serverClient.from('Post').select();
  if (error) throw new Error('게시물 목록을 불러오는데 실패했습니다.');

  if (!posts) return <div>게시물이 없습니다.</div>;

  return (
    <div className="w-full mx-auto">
      <section className="flex flex-col">
        <h1>자유 게시판</h1>
        <hr />
        <CommunityList posts={posts} />
      </section>
      <CommunityActionButton mode="write" />
    </div>
  );
};

export default Communitypage;
