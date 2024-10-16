'use client';

import { User, useUserStore } from '@/userStore';
import browserClient from '@/utils/supabase/client';
import { Dispatch, SetStateAction, useState } from 'react';

const Nickname = ({
  nickname,
  setNickname,
  userInfo
}: {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  userInfo: User;
}) => {
  const [input, setInput] = useState('');

  const { login } = useUserStore();

  // auth 닉네임 변경
  const handleSubmit = async (inputName: string) => {
    try {
      const { data } = await browserClient.auth.updateUser({
        data: { nickname: inputName }
      });
      login({ ...userInfo, nickname: input });
      setNickname(input);
      alert('닉네임이 수정되었습니다.');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[800px] flex flex-col items-center justify-center ">
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
