'use client';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface CommunityActionButtonProps {
  postId?: string;
  mode?: 'write';
}

const CommunityActionButton = ({ postId, mode }: CommunityActionButtonProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/community/${postId}/modify`);
  };

  const handleWrite = () => {
    router.push('/community/write');
  };

  const handleDelete = async () => {
    if (!postId) return;

    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      await browserClient.from('Post').delete().eq('id', postId);
      router.push('/community');
    }
  };

  return (
    <>
      {mode === 'write' ? (
        <button onClick={handleWrite}>글 작성</button>
      ) : (
        <>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </>
  );
};

export default CommunityActionButton;
