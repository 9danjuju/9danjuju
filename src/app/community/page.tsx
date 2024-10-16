import CommunityList from '@/components/community/CommunityList';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Communitypage = () => {
  return (
    <div className="w-full">
      <section className="flex flex-col justify-center mx-auto max-w-[1400px] mt-10">
        <div className="flex flex-row justify-between border-b-4 border-l-neutral-700 h-14">
          <h1 className="text-2xl font-bold">커뮤니티</h1>
          <Button variant="outline">
            <Link href="/community/write">글 작성</Link>
          </Button>
        </div>
        <CommunityList />
      </section>
    </div>
  );
};

export default Communitypage;
