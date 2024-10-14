'use client';
import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('./PostEditor'), { ssr: false });

const ToastEditor = () => {
  return <PostEditor />;
};

export default ToastEditor;
