import browserClient from '@/utils/supabase/client';
import Link from 'next/link';

const HomeCommunityList = async () => {
  const { data } = await browserClient.from('Post').select().order('date', { ascending: false }).range(0, 2);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl">커뮤니티</h2>
        <Link href="/community">더보기</Link>
      </div>
      <ul className="space-y-4">
        {data?.map((post) => (
          <li
            key={post.id}
            className="grid grid-cols-[2fr_1fr_1fr] gap-3 p-3 h-14 text-center leading-loose bg-[#D9D9D9]"
          >
            <Link href={`/community/${post.id}`}>
              <div className="text-left">{post.title}</div>
            </Link>
            <div>{post.userNickname}</div>
            <div>{new Date(post.date).toLocaleString('ko-KR')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeCommunityList;
