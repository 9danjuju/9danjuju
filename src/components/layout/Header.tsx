'use client';

import Link from 'next/link';
import SearchBar from '../SearchBar';
import browserClient from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/userStore';

const Header = () => {
  const { userInfo, logout } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    const { error } = await browserClient.auth.signOut();
    router.replace('/login');
    logout();
    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-24 flex justify-between items-center px-10">
      <div className="flex justify-center items-center w-2/4">
        <p className="font-bold w-1/2 text-3xl">
          <Link href="/">구단주주총회</Link>
        </p>
        {pathname === '/' ? null : (
          <SearchBar
            className="container rounded-full flex justify-center items-center border-2 w-full pl-5 h-1/2"
            type="header"
          />
        )}
      </div>

      <div className="flex gap-5 items-center">
        {userInfo.nickname ? <p className="text-sm">안녕하세요 {userInfo.nickname}님!</p> : null}
        <Link href="/community">커뮤니티</Link>
        {userInfo.nickname ? (
          <>
            <Link href="/mypage">마이페이지</Link>
            <button onClick={() => handleLogout()}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href="/signup">회원가입</Link>
            <Link href="/login">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
