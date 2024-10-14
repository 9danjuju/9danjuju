import Link from 'next/link';
import React from 'react';

const Post = ({
  post,
  formatDate
}: {
  post: {
    content: string;
    date: string;
    id: string;
    title: string;
    user_id: string;
    userNickname: string | null;
  };
  formatDate: string;
}) => {
  return (
    <div className="flex gap-5">
      <Link href={`/community/${post.id}`}>
        <div>{post.title}</div>
      </Link>
      <div>{post.userNickname}</div>
      <div>{formatDate}</div>
    </div>
  );
};

export default Post;
