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
    <div>
      <section key={postData.id}>
        <div>
          <h1>{postData.title}</h1>
          <div>
            <div>
              <p>{postData.date}</p>| <p>{postData.userNickname}</p>
            </div>

            <CommunityActionButton postId={postData.id} />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
      </section>
    </div>
  );
};

export default CommunityDetailpage;
