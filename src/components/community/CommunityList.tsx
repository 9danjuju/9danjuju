'use client';

// import { usePostQuery } from '@/query/usePostQuery';
import Link from 'next/link';
import { Tables } from '../../../database.types';

interface CommunityListPorps {
  posts: Tables<'Post'>[];
}

const CommunityList = ({ posts }: CommunityListPorps) => {
  // const { data: posts, isLoading } = usePostQuery();

  // if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      <ul>
        <div className="flex flex-row justify-between">
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
        </div>
        {posts?.map((post) => (
          <li key={post.id} className="flex flex-row justify-between">
            <Link href={`/community/${post.id}`}>
              <p>{post.title}</p>
            </Link>
            <p>{post.userNickname}</p>
            <p>{post.date}</p>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
};

export default CommunityList;
