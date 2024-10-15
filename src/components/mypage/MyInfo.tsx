import { FcUser } from '@/utils/mypage/type';
import React from 'react';

const MyInfo = ({ fcUser, nickname }: { fcUser: FcUser | null | undefined; nickname: string }) => {
  return (
    <div className="border-2 border-orange-300 w-44 h-28 p-2 items-center">
      {fcUser ? (
        <>
          <p>{fcUser?.nickname}</p>
          <p>Lv.{fcUser?.level}</p>
        </>
      ) : (
        <>
          <p>{nickname}</p>
          <p>구단 없음</p>
        </>
      )}
    </div>
  );
};

export default MyInfo;
