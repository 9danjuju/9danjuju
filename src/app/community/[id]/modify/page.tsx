import browserClient from '@/utils/supabase/client';
import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('@/components/community/PostEditor'), { ssr: false });

interface CommunityModifyPageProps {
  params: {
    id: string;
  };
}

const CommunityModifypage = async ({ params }: CommunityModifyPageProps) => {
  const { data } = await browserClient.from('Post').select().eq('id', params.id).single();

  return (
    <div className="w-[768px] m-auto">
      <PostEditor postData={data} isEdit={true} />
    </div>
  );
};

export default CommunityModifypage;
