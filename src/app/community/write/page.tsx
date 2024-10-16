import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('@/components/community/PostEditor'), { ssr: false });

const CommunityWritepage = () => {
  return (
    <div className="max-w-[1280px] m-auto mt-8">
      <PostEditor postData={null} isEdit={false} />
    </div>
  );
};

export default CommunityWritepage;
