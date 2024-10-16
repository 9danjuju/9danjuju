import React from 'react';

const PostsTable = () => {
  return (
    <div className=" w-[800px] border-y-2 border-black flex  p-2 text-center bg-black/85">
      <p className=" w-[400px] ">제목</p>
      <p className=" w-36 "> 작성자</p>
      <p className="w-60 "> 작성일</p>
    </div>
  );
};

export default PostsTable;
