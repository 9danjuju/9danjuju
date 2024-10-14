'use client';

import Nickname from '@/components/mypage/Nickname';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/utils/supabase/auth';
import { FcUser } from '@/utils/mypage/type';
import { fetch9danju } from '@/utils/mypage/api';
import Selected from '@/components/mypage/Selected';
import MyInfo from '@/components/mypage/MyInfo';
import MyPostsList from '@/components/mypage/MyPostsList';

const Page = () => {
  const [mode, setMode] = useState('myPosts');
  const [nickname, setNickname] = useState('');
  const [fcUser, setfcUser] = useState<FcUser | null>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo();
      setNickname(res?.user_metadata.nickname);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetch9danju(nickname);
      setfcUser(userInfo);
    };
    getUser();
  }, [nickname]);

  return (
    <div className="flex gap-5">
      <div>
        <div>
          <MyInfo fcUser={fcUser} nickname={nickname} />
          <Selected mode={mode} setMode={setMode} />
        </div>
      </div>
      <div>{mode !== 'nickname' ? <MyPostsList /> : <Nickname nickname={nickname} setNickname={setNickname} />}</div>
    </div>
  );
};

export default Page;
