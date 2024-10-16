import Comment from '@/components/comments/Comment';
import CommunityActionButton from '@/components/community/CommunityActionButton';
import browserClient from '@/utils/supabase/client';

interface CommunityDetailPageProps {
  params: {
    id: string;
  };
}

const CommunityDetailpage = async ({ params }: CommunityDetailPageProps) => {
  const { data: postData } = await browserClient.from('Post').select().eq('id', params.id).single();
  if (!postData) return <div>해당 게시물이 없습니다.</div>;
  return (
    <div className="w-full">
      <section key={postData.id} className="flex flex-col gap-4 mx-auto mt-10 p-4 max-w-[1000px]">
        <h1 className="text-2xl">{postData.title}</h1>
        <div className="flex flex-row justify-between pb-4 border-b border-l-neutral-700">
          <div className="flex flex-row gap-2 text-sm">
            <p>{new Date(postData.date).toLocaleString('ko-KR')}</p> | <p>{postData.userNickname}</p>
          </div>

          <CommunityActionButton postId={postData.id} createUserId={postData.user_id} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.content }} className="py-6"></div>
      </section>
      <Comment />
    </div>
  );
};

export default CommunityDetailpage;
