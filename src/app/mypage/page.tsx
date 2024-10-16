'use client';

import Nickname from '@/components/mypage/Nickname';
import { useEffect, useState } from 'react';
import { FcUser, FormattedRate } from '@/utils/mypage/type';
import { fetch9danju, fetchRate } from '@/utils/mypage/api';
import Selected from '@/components/mypage/Selected';
import MyInfo from '@/components/mypage/MyInfo';
import MyPostsList from '@/components/mypage/MyPostsList';
import { useUserStore } from '@/userStore';

const Page = () => {
  const [mode, setMode] = useState('myPosts');
  const [nickname, setNickname] = useState('');
  const [fcUser, setfcUser] = useState<FcUser | null>();
  const [rate, setRate] = useState<FormattedRate[] | undefined>([]);

  // store 유저정보
  const { userInfo } = useUserStore();

  const getStoreUser = async () => {
    const userNickname = userInfo.nickname as string;
    setNickname(userNickname);
  };

  // 피파 유저정보
  const getFcUser = async () => {
    const fcUserData = await fetch9danju(nickname);
    setfcUser(fcUserData);
  };

  // 피파 유저 등급정보
  const getRate = async () => {
    const rateInfo = await fetchRate(nickname);
    setRate(rateInfo);
  };

  useEffect(() => {
    getStoreUser();
  }, [userInfo]);

  useEffect(() => {
    getFcUser();
    getRate();
  }, [nickname]);

  return (
    <div className="flex gap-10 justify-center mt-16">
      <div>
        <div>
          <MyInfo fcUser={fcUser} rate={rate} nickname={nickname} />
          <Selected mode={mode} setMode={setMode} />
        </div>
      </div>
      <div className="flex justify-center ">
        {mode !== 'nickname' ? (
          <MyPostsList />
        ) : (
          <Nickname nickname={nickname} setNickname={setNickname} userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};

export default Page;
