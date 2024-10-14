import DynamicPostEditor from '@/components/community/DynamicPostEditor';
import browserClient from '@/utils/supabase/client';

interface CommunityModifyPageProps {
  params: {
    id: string;
  };
}

const CommunityModifypage = async ({ params }: CommunityModifyPageProps) => {
  const { data } = await browserClient.from('Post').select().eq('id', params.id).single();

  return (
    <div className="w-[768px] m-auto">
      <DynamicPostEditor postData={data} isEdit={true} />
    </div>
  );
};

export default CommunityModifypage;
