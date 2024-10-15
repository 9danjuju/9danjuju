'use client';
import dynamic from 'next/dynamic';
import { Tables } from '../../../database.types';

const PostEditor = dynamic(() => import('./PostEditor'), { ssr: false });

export interface DynamicPostEditorProps {
  postData: Tables<'Post'> | null;
  isEdit: boolean;
}

const DynamicPostEditor = ({ postData, isEdit }: DynamicPostEditorProps) => {
  return <PostEditor postData={postData} isEdit={isEdit} />;
};

export default DynamicPostEditor;
