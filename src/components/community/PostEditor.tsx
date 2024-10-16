'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { FormEvent, useRef, useState } from 'react';

import { Tables, TablesInsert, TablesUpdate } from '../../../database.types';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/userStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface PostEditorProps {
  postData: Tables<'Post'> | null;
  isEdit: boolean;
}

const PostEditor = ({ postData, isEdit }: PostEditorProps) => {
  const router = useRouter();

  const { userInfo } = useUserStore();

  const [title, setTitle] = useState(postData?.title || '');
  const [content, setContent] = useState(postData?.content || '');

  const editorRef = useRef<Editor>(null);

  const handleEditorChange = () => {
    const contentData = editorRef.current?.getInstance().getHTML();

    setContent(contentData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit && postData?.id) {
      const updatePost: TablesUpdate<'Post'> = {
        title,
        content,
        date: new Date().toISOString()
      };
      const { data } = await browserClient.from('Post').update(updatePost).eq('id', postData?.id);
      if (data) router.push(`/community/${postData.id}`);
    }

    const newPost: TablesInsert<'Post'> = {
      title,
      content,
      date: new Date().toISOString(),
      user_id: userInfo.id,
      userNickname: userInfo.nickname
    };

    const { data, error } = await browserClient.from('Post').insert(newPost).select();
    if (error) {
      console.log('error', error.message);
      alert('게시물 작성에 실패 했습니다.');
    }

    if (data) router.push(`/community/${data[0].id}`);
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['scrollSync']
  ];
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Editor
        initialValue={postData?.content || ' '} // 초기값
        height="400px" // 높이
        initialEditType="wysiwyg" // 초기 편집 유형
        useCommandShortcut={true} // 키보드 단축기 사용 여부
        toolbarItems={toolbarItems} // 도구 모음
        hideModeSwitch // 모드 숨기기 (markdown, wyysiwyg)
        ref={editorRef}
        onChange={handleEditorChange}
      />
      <div className="text-right">
        <Button variant="outline">{!isEdit ? '작성 완료' : '수정 완료'}</Button>
      </div>
    </form>
  );
};

export default PostEditor;
