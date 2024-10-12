'use client';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const Header = () => {
  const handleLogout = async () => {
    const clientClient = createClient();
    const { error } = await clientClient.auth.signOut();
    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-8 flex justify-between px-10">
      <p className="font-bold">
        <Link href="/">구단주주총회</Link>
      </p>
      <div className="flex gap-5">
        <Link href="/signup">회원가입</Link>
        <Link href="/login">로그인</Link>
        <button onClick={() => handleLogout()}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
