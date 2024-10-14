'use client';

import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';

// useState 타입
type CommentType = Tables<'Comments'>;

const Comment = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>('');

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

  // 댓글 추가
  const onSumbitHandler = async () => {
    const { data, error } = await browserClient.from('Comments').insert({ comment: comment }).select('*');

    if (data) {
      setComments((prev) => [...prev, ...data]);
    } else {
      console.log(error);
    }

    getComments();
    setComment('');
  };

  // 댓글 삭제
  // TODO: 댓글 작성자 id와 로그인한 유저의 id 같을 시 삭제
  const onDeleteHandelr = async (id: string) => {
    const { data, error } = await browserClient.from('Comments').delete().eq('id', id).select('*');

    if (data) {
      console.log('삭제 완료!');
    } else {
      console.log('삭제 실패 => ', error);
    }

    const filteredComments = comments.filter((comment) => comment.id !== id);
    setComments(filteredComments);
  };

  // 댓글 수정
  // TODO: 댓글 작성자 id와 로그인한 유저의 id 같을 시 수정
  const onEditHandelr = async (id: string) => {
    console.log('댓글 id => ', id);
    const { data, error } = await browserClient
      .from('Comments')
      .update({
        comment: prompt('수정하기')
      })
      .eq('id', id)
      .select();

    console.log('comments => ', comments);
    console.log('data =>', data);

    if (!data || data.length === 0) {
      console.log('수정된 데이터가 없습니다');
      return;
    }

    const [update] = data;
    const updatedList = comments.map((comment) => (comment.id === update.id ? update : comment));
    setComments(updatedList);
  };

  return (
    <div className="px-10">
      <div>
        <h1>댓글</h1>
        {/*TODO: 로그인 여부에 따라 input 노출 설정 */}
        <input
          className="border border-spacing-1"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button className="border border-spacing-1 px-4" onClick={onSumbitHandler}>
          댓글 입력
        </button>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="flex gap-5 ">
                <div className="w-[500px]">
                  <p className="text-md font-bold">{comment.userNickname}</p>
                  <p>{comment.comment}</p>
                </div>
                <p>{comment.date}</p>
                <button className="border border-spacing-1 px-4" onClick={() => onEditHandelr(comment.id)}>
                  수정
                </button>
                <button className="border border-spacing-1 px-4" onClick={() => onDeleteHandelr(comment.id)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comment;
