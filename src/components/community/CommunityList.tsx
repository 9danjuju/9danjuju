'use client';

// import { usePostQuery } from '@/query/usePostQuery';
import Link from 'next/link';
import browserClient from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import { Tables } from '../../../database.types';

type POST = Tables<'Post'>;

const CommunityList = () => {
  const [posts, setPosts] = useState<POST[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null); // 스크롤 감지

  const fetchPosts = async (start: number, end: number) => {
    setLoading(true);
    const { data } = await browserClient.from('Post').select().range(start, end); // start와 end에 따른 범위로 데이터 가져오기
    if (data && data.length > 0) setLoading(false); // data가 있을 경우에만 로딩 종료
    console.log('data', data);

    return data || [];
  };

  const getPosts = async () => {
    const start = (page - 1) * 10;
    const end = page * 10 - 1;
    const loadPosts = await fetchPosts(start, end);

    setPosts((prev) => [...prev, ...loadPosts]); // 기존 목록에 추가
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // ref로 설정된 요소가 화면에 보여지고 loading이 종료된 경우
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // page 번호 증가시켜 data 호출
        }
      },
      { threshold: 0.5 } // div 50%이상이 화면에 보일 때 감지
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // ref로 설정된 요소에 observer 설정
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // 컴포넌트 unmount 될 때 observer 해제
      }
    };
  }, [loading]);

  return (
    <div>
      <ul>
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 p-3 h-8 text-center border-b-1 border-neutral-700">
          <div className="font-bold">제목</div>
          <div className="font-bold">작성자</div>
          <div className="font-bold">작성일</div>
        </div>
        {posts?.map((post) => (
          <li
            key={post.id}
            className="grid grid-cols-[2fr_1fr_1fr] gap-3 p-3 h-12 text-center border-b-1 border-neutral-700"
          >
            <Link href={`/community/${post.id}`}>
              <p className="truncate">{post.title}</p>
            </Link>
            <p>{post.userNickname}</p>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
      <div ref={observerRef} className="h-6 bg-black" />
    </div>
  );
};

export default CommunityList;
