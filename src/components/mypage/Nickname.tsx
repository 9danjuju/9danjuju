'use client';

import browserClient from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const Nickname = () => {
  const [nickname, setNickname] = useState('');
  const [input, setInput] = useState('');

  // 현재 유저정보
  const getUserInfo = async () => {
    try {
      const res = await browserClient.auth.getUser();
      const data = res.data.user;
      // console.log('user : ', res);

      setNickname(data?.user_metadata.nickname);

      return;
    } catch (error) {
      console.error(error);
    }
  };

  // auth 닉네임 변경
  const handleSubmit = async (inputName: string) => {
    try {
      const { data } = await browserClient.auth.updateUser({
        data: { nickname: inputName }
      });

      alert('닉네임이 수정되었습니다.');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <form
        onSubmit={() => {
          handleSubmit(input);
        }}
      >
        <label>닉네임</label> <br />
        <input
          placeholder={nickname || ''}
          className="p-2 border-2"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button>변경</button>
      </form>
    </div>
  );
};

export default Nickname;
