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
    <div className="w-[800px] border-b-[1px] border-slate-300 flex  p-2 text-center">
      <Link href={`/community/${post.id}`}>
        <div className=" w-[400px]">{post.title}</div>
      </Link>
      <div className=" w-36 ">{post.userNickname}</div>
      <div className="w-60 text-sm">{formatDate}</div>
    </div>
  );
};

export default Post;
