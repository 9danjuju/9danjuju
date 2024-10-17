'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { TablesInsert, TablesUpdate } from '../../../database.types';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/userStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface PostEditorProps {
  postData: string;
  isEdit: boolean;
}

const PostEditor = ({ postData, isEdit }: PostEditorProps) => {
  const router = useRouter();

  const { userInfo } = useUserStore();

  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const { data } = await browserClient.from('Post').select().eq('id', postData).single();

    setPost(data);
  };

  const [post, setPost] = useState<{
    content: string;
    date: string;
    id: string;
    title: string;
    user_id: string;
    userNickname: string | null;
  } | null>(null);
  console.log('post.title', post?.title);
  console.log('post.cnt', post?.content);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.getInstance().setHTML(content);
    }
  }, [content]);

  const handleEditorChange = () => {
    const contentData = editorRef.current?.getInstance().getHTML();

    setContent(contentData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit && post?.id) {
      const updatePost: TablesUpdate<'Post'> = {
        title,
        content,
        date: new Date().toISOString()
      };

      await browserClient.from('Post').update(updatePost).eq('id', post.id);

      router.push(`/community/${post.id}`);
      return;
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
      <Input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-black"
      />
      <Editor
        initialValue={content || ' '} // 초기값
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
