import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('@/components/community/PostEditor'), { ssr: false });

const CommunityWritepage = () => {
  return (
    <div className="w-[768px] m-auto">
      <PostEditor postData={null} isEdit={false} />
    </div>
  );
};

export default CommunityWritepage;
