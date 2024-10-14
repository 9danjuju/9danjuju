'use client';

import Link from 'next/link';
import SearchBar from '../SearchBar';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await browserClient.auth.signOut();
    router.replace('/login');
    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full flex justify-between items-center px-10">
      <div className="flex justify-center items-center w-2/4">
        <p className="font-bold w-1/2">
          <Link href="/">구단주주총회</Link>
        </p>
        <SearchBar
          className="container rounded-full flex justify-center items-center border-2 w-full pl-5 h-1/2"
          type="header"
        />
      </div>

      <div className="flex gap-5 items-center">
        <Link href="/signup">회원가입</Link>
        <Link href="/login">로그인</Link>
        <button onClick={() => handleLogout()}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
