'use client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';
import browserClient from '@/utils/supabase/client';

// interface Post {
//   id: string;
//   title: string;
//   date: string;
//   content: string;
//   userNickname: string;
//   user_id: string;
// }

type PostArray = Tables<'Post'>;

const MyPosts = () => {
  const [posts, setPosts] = useState<PostArray[]>([]);

  const getMyPosts = async () => {
    const user = await browserClient.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await browserClient
      .from('Post')
      .select('*')
      .eq('user_id', userId || '');
    if (error) {
      console.error(error);
      return;
    }
    // console.log('data =>', data);

    setPosts(data);
    // console.log('posts =>', posts);
  };

  useEffect(() => {
    // getUserInfo();
    getMyPosts();
  }, []);

  return (
    <div>
      {posts.length !== 0 ? (
        posts.map((post) => {
          const dateString = post.date;
          const date = new Date(dateString);
          const formatDate = date.toLocaleString('ko-KR');
          return (
            <div key={post.id} className="flex gap-5">
              {/* title 클릭시 글 상세 이동 */}
              <div>{post.title}</div>
              <div>{post.userNickname}</div>
              <div>{formatDate}</div>
            </div>
          );
        })
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPosts;
