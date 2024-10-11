'use client';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const PostEditor = () => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['scrollSync']
  ];
  return (
    <Editor
      initialValue="hello react editor world!" // 초기값
      height="400px" // 높이
      initialEditType="wysiwyg" // 초기 편집 유형
      useCommandShortcut={true} // 키보드 단축기 사용 여부
      toolbarItems={toolbarItems} // 도구 모음
    />
  );
};

export default PostEditor;
