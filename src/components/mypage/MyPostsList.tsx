'use client';
import browserClient from '@/utils/supabase/client';
import Post from './Post';
import PostsTable from './PostsTable';
import { useInfiniteQuery } from '@tanstack/react-query';

const MyPostsList = () => {
  const getPosts = async ({ pageParam = 0 }) => {
    try {
      const user = await browserClient.auth.getUser();
      const userId = user.data.user?.id;

      const { data } = await browserClient
        .from('Post')
        .select('*')
        .eq('user_id', userId || '')
        .order('date', { ascending: false })
        .range(pageParam * 5, (pageParam + 1) * 5 - 1);

      return data || [];
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  };

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 5 ? pages.length : undefined;
    },
    initialPageParam: 0
  });

  // console.log(data);

  const myPosts = data?.pages.flat() || [];

  return (
    <div>
      <PostsTable />
      {data?.pages[0].length !== 0 ? (
        <div className="text-center">
          <ul>
            {myPosts.map((post) => {
              const date = new Date(post.date);
              const formatDate = date.toLocaleString('ko-KR');
              return <Post key={post.id} formatDate={formatDate} post={post} />;
            })}
          </ul>
          <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} className="m-auto">
            {isFetchingNextPage ? '로딩중...' : hasNextPage ? '더보기' : '더 이상 게시글이 없습니다'}
          </button>
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPostsList;
