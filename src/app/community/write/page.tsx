'use client';
import DynamicPostEditor from '@/components/community/DynamicPostEditor';

const CommunityWritepage = () => {
  return (
    <div className="w-[768px] m-auto">
      <DynamicPostEditor postData={null} isEdit={false} />
    </div>
  );
};

export default CommunityWritepage;
