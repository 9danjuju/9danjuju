'use client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';
import browserClient from '@/utils/supabase/client';
import Post from './Post';
import PostsTable from './PostsTable';

// interface Post {
//   id: string;
//   title: string;
//   date: string;
//   content: string;
//   userNickname: string;
//   user_id: string;
// }

type PostArray = Tables<'Post'>;

const MyPostsList = () => {
  const [posts, setPosts] = useState<PostArray[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    const user = await browserClient.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await browserClient
      .from('Post')
      .select('*')
      .eq('user_id', userId || '')
      .range(page * 5, (page + 1) * 5 - 1);
    if (error) {
      console.error(error);
      return;
    }
    // console.log('data =>', data);

    setPosts([...posts, ...data]);
    // console.log('posts =>', posts);
    setLoading(false);
  };

  useEffect(() => {
    // getUserInfo();
    getPosts();
  }, [page]);

  const handleLoad = () => {
    setPage((pre) => pre + 1);
  };

  return (
    <div>
      <PostsTable />
      {posts.length !== 0 ? (
        <div className="text-center">
          <ul>
            {posts.map((post) => {
              const dateString = post.date;
              const date = new Date(dateString);
              const formatDate = date.toLocaleString('ko-KR');
              return <Post key={post.id} formatDate={formatDate} post={post} />;
            })}
          </ul>
          {loading ? (
            <p>로딩중</p>
          ) : (
            <button
              onClick={() => {
                handleLoad();
              }}
              className="m-auto"
            >
              더보기
            </button>
          )}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPostsList;
