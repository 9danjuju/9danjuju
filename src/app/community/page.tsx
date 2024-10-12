import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

const Communitypage = async () => {
  const serverClient = createClient();
  const { data } = await serverClient.from('Post').select();
  console.log('data', data);
  return (
    <main>
      <section className="flex flex-col">
        <h1>자유 게시판</h1>
        <hr />
        <div>
          <ul>
            <div className="flex flex-row justify-between">
              <p>제목</p>
              <p>작성자</p>
              <p>작성일</p>
            </div>
            <li className="flex flex-row justify-between">
              <Link href="/community/1">
                <p>제목이요</p>
              </Link>
              <p>작성자요</p>
              <p>작성일이요</p>
            </li>
            <li></li>
          </ul>
        </div>
        <button>글 작성</button>
      </section>
    </main>
  );
};

export default Communitypage;
