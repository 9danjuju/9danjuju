'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { FormEvent, useRef, useState } from 'react';
import { Post } from '@/types/post-types';
import { addPost } from '@/utils/supabase/posts';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const editorRef = useRef<Editor>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editorInstance = editorRef.current;
    if (editorInstance) {
      const contentData = editorInstance.getInstance().getHTML();
      setContent(contentData);
    }

    const newPost: Post = {
      title,
      content,
      date: new Date().toISOString(),
      user_id: 'da1',
      userNickname: '하이'
    };

    await addPost(newPost);
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
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Editor
        initialValue="hello react editor world!" // 초기값
        height="400px" // 높이
        initialEditType="wysiwyg" // 초기 편집 유형
        useCommandShortcut={true} // 키보드 단축기 사용 여부
        toolbarItems={toolbarItems} // 도구 모음
        ref={editorRef}
      />
      <button>작성</button>
    </form>
  );
};

export default PostEditor;
