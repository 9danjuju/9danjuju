import { Dispatch, SetStateAction } from 'react';

const Selected = ({ mode, setMode }: { mode: string; setMode: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`p-2 m-1 ${mode === 'myPosts' ? `font-bold bg-slate-300` : ''} hover:cursor-pointer`}
        onClick={() => {
          setMode('myPosts');
        }}
      >
        <p>내글 보기</p>
      </div>
      <div
        className={`p-2 m-1 ${mode === 'nickname' ? `font-bold bg-slate-300` : ''} hover:cursor-pointer`}
        onClick={() => {
          setMode('nickname');
        }}
      >
        <p>정보 수정</p>
      </div>
    </div>
  );
};

export default Selected;
