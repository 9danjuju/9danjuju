'use client';
import { useUserStore } from '@/userStore';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

export interface CommunityActionButtonProps {
  postId?: string;
  createUserId: string;
  mode?: 'write' | null;
}

const CommunityActionButton = ({ postId, createUserId, mode }: CommunityActionButtonProps) => {
  const router = useRouter();

  const { userInfo } = useUserStore();

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
      {mode === 'write' && (
        <Button variant="outline" onClick={handleWrite}>
          글 작성
        </Button>
      )}
      {userInfo.id === createUserId && (
        <div className="space-x-3">
          <Button variant="outline" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      )}
    </>
  );
};

export default CommunityActionButton;
