import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full h-8 flex justify-between px-10">
      <p className="font-bold">구단주주총회</p>
      <div className="flex gap-5">
        <Link href="/signup">회원가입</Link>
        <Link href="login">로그인</Link>
      </div>
    </div>
  );
};

export default Header;
