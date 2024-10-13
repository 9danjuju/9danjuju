'use client';
import dynamic from 'next/dynamic';

const PostEditor = dynamic(() => import('./PostEditor'), { ssr: false });

const NoSsrEditor = () => {
  return <PostEditor />;
};

export default NoSsrEditor;
