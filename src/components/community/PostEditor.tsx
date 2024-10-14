'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { FormEvent, useRef, useState } from 'react';

import { TablesInsert, TablesUpdate } from '../../../database.types';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { DynamicPostEditorProps } from './DynamicPostEditor';

const PostEditor = ({ postData, isEdit = false }: DynamicPostEditorProps) => {
  const router = useRouter();

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
      user_id: 'cb611639-6049-4476-b98a-8fe818de52b5',
      userNickname: '하이'
    };

    const { data } = await browserClient.from('Post').insert(newPost).select();

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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Editor
        initialValue={postData?.content || ' '} // 초기값
        height="400px" // 높이
        initialEditType="wysiwyg" // 초기 편집 유형
        useCommandShortcut={true} // 키보드 단축기 사용 여부
        toolbarItems={toolbarItems} // 도구 모음
        ref={editorRef}
        onChange={handleEditorChange}
      />
      <button>{!isEdit ? '작성' : '수정'}</button>
    </form>
  );
};

export default PostEditor;
