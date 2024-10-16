import { FcUser, FormattedRate } from '@/utils/mypage/type';
import React from 'react';

const MyInfo = ({
  fcUser,
  nickname,
  rate
}: {
  fcUser: FcUser | null | undefined;
  nickname: string;
  rate: FormattedRate[] | undefined;
}) => {
  return (
    <div className=" bg-gradient-to-r from-green-900 to-green-400 w-44 h-28 px-2 items-start flex flex-col rounded-md shadow-lg mb-3">
      {fcUser ? (
        <>
          <div className="flex text-sm gap-3 my-2">
            {rate?.map((type) => {
              return (
                <div key={type.matchType} className="relative group ">
                  <div className="rounded-md text-sm p-[2px] bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
                    {type.matchType}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden p-2 bg-orange-200 border-[1px] group-hover:block w-36 rounded-md font-semibold bg-indigo-200">
                    <div>{`등급: ${type.division}`}</div>
                    <div>{`달성일: ${type.achievementDate}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-white text-2xl font-extrabold">{fcUser?.nickname}</p>
            <p className="text-white text-bold">Lv.{fcUser?.level}</p>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col justify-center">
          <p className="text-white text-2xl font-extrabold">{nickname}</p>
          <p className="text-sm text-slate-300">구단이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyInfo;
