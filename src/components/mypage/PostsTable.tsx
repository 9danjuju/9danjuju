import React from 'react';

const PostsTable = () => {
  return (
    <div className=" w-[900px]">
      <div className="border-y-2 border-black flex  p-2">
        <p className=" w-[700px] text-center">제목</p>
        <p className=" w-36 text-center"> 작성자</p>
        <p className="w-60 text-center"> 작성일</p>
      </div>
    </div>
  );
};

export default PostsTable;
