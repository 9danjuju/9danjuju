'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoSearch } from 'react-icons/go';

type SearchBarType = {
  className: string;
  type: 'header' | 'contents';
};

const SearchBar = ({ className, type }: SearchBarType) => {
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSearchRoute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/detail/${name}`);
  };
  return (
    <form className={className} onSubmit={(e) => handleSearchRoute(e)}>
      <input
        type="text"
        placeholder="구단주명을 입력해주세요."
        className={`w-full h-full focus:outline-none bg-inherit rounded-full ${
          type === 'contents' ? 'text-3xl' : 'text-sm'
        }`}
        value={name}
        onChange={(e) => handleSearchName(e)}
      />
      <button type="submit" className="px-4 py-2 h-full rounded-full">
        <GoSearch className={type === 'contents' ? `w-[50px] h-[50px]` : ''} />
      </button>
    </form>
  );
};

export default SearchBar;
