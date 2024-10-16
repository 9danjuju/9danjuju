'use client';

import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/userStore';

// useState 타입
type CommentType = Tables<'Comments'>;

const Comment = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  // 댓글 수정할 때의 상태 관리
  const [editComment, setEditComment] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // store에서 user 정보 불러오기
  const { userInfo } = useUserStore();

  // post ID 불러오기
  const params = useParams();
  const postId = params.id as string;

  // 현재 유저 정보
  const getUserInfo = async () => {
    const getUserNickname = userInfo.nickname as string;
    const getUserId = userInfo.id;

    setUserNickname(getUserNickname);
    setUserId(getUserId);

    getComments();
  };

  // 댓글 조회
  const getComments = async () => {
    const { data, error } = await browserClient.from('Comments').select('*').order('date', { ascending: true });

    if (data) {
      const res = data.filter((comment) => comment.post_id === postId);
      setComments(res);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  useEffect(() => {
    getComments();
  }, []);

  // 댓글 추가
  const onSumbitHandler = async () => {
    const { data, error } = await browserClient
      .from('Comments')
      .insert({ comment: comment, userNickname, post_id: postId })
      .select('*');

    if (data) {
      setComments((prev) => [...prev, ...data]);
    } else {
      console.log(error);
    }

    getComments();
    setComment('');
  };

  // 댓글 삭제
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

  // 댓글 수정 시작
  const startEditing = (id: string, currentComment: string) => {
    setEditingId(id); // 수정할 댓글의 ID 설정
    setEditComment(currentComment); // 현재 댓글을 상태에 저장
  };

  // 댓글 수정
  const onEditHandelr = async (id: string) => {
    const { data } = await browserClient
      .from('Comments')
      .update({
        comment: editComment // 수정된 댓글 내용
      })
      .eq('id', id)
      .select()
      .order('date', { ascending: true });

    if (!data || data.length === 0) {
      console.log('수정된 데이터가 없습니다');
      return;
    }

    const [update] = data;
    const updatedList = comments.map((comment) => (comment.id === update.id ? update : comment));
    setComments(updatedList);
    setEditingId(null);
    setEditComment('');
  };

  return (
    <div className=" w-full px-10 bg-neutral-100 p-2 grid place-items-center">
      <div>
        <h1 className="text-start">댓글 {comments.length}</h1>
        <div className="flex items-center mb-5 mt-2">
          {userId ? (
            <>
              <textarea
                className="w-[900px] h-[100px] border border-spacing-1 resize-none"
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button className="w-[100px] h-[100px] border border-spacing-1 px-4" onClick={onSumbitHandler}>
                댓글 입력
              </button>
            </>
          ) : (
            <>
              <textarea
                className="w-[900px] h-[100px] border border-spacing-1 resize-none"
                placeholder="로그인 후 작성 가능합니다."
              />
              <button className="w-[100px] h-[100px] border border-spacing-1 px-4">로그인</button>
            </>
          )}
        </div>
        <div>
          {comments.map((comment) => {
            const dateStr = comment.date as string;
            const date = new Date(dateStr);
            const formDate = date.toLocaleString('ko-KR');
            return (
              <div key={comment.id} className="bg-white w-[1000px] rounded-md mb-3 py-3 px-5">
                <p className="text-md font-bold my-1">⚽ {comment.userNickname}</p>
                {editingId === comment.id ? (
                  <div className="my-3">
                    <textarea
                      className="w-[960px] h-auto border border-spacing-1 resize-none pr-5"
                      placeholder="수정할 내용을 입력해주세요."
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <p className="text-[12px] text-gray-400">{formDate}</p>
                    <button
                      className="mr-4 mt-3"
                      onClick={() => {
                        onEditHandelr(comment.id);
                      }}
                    >
                      수정 완료
                    </button>
                  </div>
                ) : (
                  <div className="w-[1000px] my-3">
                    <p className="w-[980px] mb-1 pr-5">{comment.comment}</p>
                    <p className="text-[12px] text-gray-400">{formDate}</p>
                    {userId === comment.user_id ? (
                      <div className="mt-3">
                        <button className="mr-4" onClick={() => startEditing(comment.id, comment.comment)}>
                          수정하기
                        </button>
                        <button className="" onClick={() => onDeleteHandelr(comment.id)}>
                          삭제하기
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
