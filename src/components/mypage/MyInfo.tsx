import { FcUser, Rate } from '@/utils/mypage/type';
import React from 'react';

const MyInfo = ({ fcUser, nickname, rate }: { fcUser: FcUser | null | undefined; nickname: string; rate: Rate[] }) => {
  return (
    <div className="border-2 border-orange-300 w-44 h-28 p-2 items-center">
      {fcUser ? (
        <>
          <div className="flex text-sm gap-3">
            {rate?.map((type) => {
              return (
                <div key={type.matchType} className="relative group">
                  <div className="bg-slate-200 rounded-md p-[2px]">{type.matchType}</div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden p-2 bg-orange-200 border-[1px] group-hover:block w-36">
                    <div>등급:{type.division}</div>
                    <div>달성일:{type.achievementDate}</div>
                  </div>
                </div>
              );
            })}
          </div>
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
