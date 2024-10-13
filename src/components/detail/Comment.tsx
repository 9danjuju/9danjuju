'use client';

import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';

// useState 타입
type CommentType = Tables<'Comments'>;

const Comment = () => {
  const [comments, setComments] = useState<CommentType[]>([]);

  // 댓글 조회
  const getComments = async () => {
    const { data, error } = await browserClient.from('Comments').select('*');

    if (data) {
      setComments(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="px-10">
      <div>
        <h1>댓글</h1>
        {/*TODO: 로그인 여부에 따라 input 노출 설정 */}
        <input className="border border-spacing-1" placeholder="댓글을 입력해주세요." />
        <button className="border border-spacing-1 px-4">댓글 입력</button>
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <div className="flex gap-5">
                <p>{comment.comment}</p>
                <p>by {comment.userNickname}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comment;
