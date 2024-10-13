'use client';
import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';

// interface Post {
//   id: string;
//   title: string;
//   date: string;
//   content: string;
//   userNickname: string;
//   user_id: string;
// }

type PostArray = Tables<'Post'>;

const Posts = () => {
  const [posts, setPosts] = useState<PostArray[]>([]);

  const getPosts = async () => {
    const { data, error } = await browserClient.from('Post').select('*'); //from('Post') 로 수정해야함
    if (error) {
      console.error(error);
      return;
    }
    console.log('data =>', data);

    setPosts(data);
    console.log('posts =>', posts);
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <div>
      {posts.map((post) => {
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
      })}
    </div>
  );
};

export default Posts;
