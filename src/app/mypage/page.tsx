'use client';

import Nickname from '@/components/mypage/Nickname';
import Posts from '@/components/mypage/Posts';
import { useState } from 'react';

const page = () => {
  const [mode, setMode] = useState('myPosts');

  return (
    <div className="flex gap-5">
      <div>
        <div>
          <div className="border-2 border-orange-300">
            <p>구단주명</p>
            <p>레벨</p>
          </div>
          <div className="flex flex-col">
            <div
              className={`p-2 m-1 ${mode === 'myPosts' ? `font-bold bg-slate-300` : ''} hover:cursor-pointer`}
              onClick={() => {
                setMode('myPosts');
              }}
            >
              <p>내글 보기</p>
            </div>
            <div
              className={`p-2 m-1 ${mode === 'nickname' ? `font-bold bg-slate-300` : ''} hover:cursor-pointer`}
              onClick={() => {
                setMode('nickname');
              }}
            >
              <p>정보 수정</p>
            </div>
          </div>
        </div>
      </div>
      <div>{mode !== 'nickname' ? <Posts /> : <Nickname />}</div>
    </div>
  );
};

export default page;
