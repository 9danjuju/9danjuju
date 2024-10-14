import { createClient } from './server';
import browserClient from './client';
import { TablesInsert } from '../../../database.types';

export const getPosts = async () => {
  const serverClient = createClient();
  const { data, error } = await serverClient.from('Post').select();

  if (error) throw new Error('게시판 데이터를 가져오는데 실패했습니다.');

  return data;
};

export const addPost = async (post: TablesInsert<'Post'>) => {
  const { data, error } = await browserClient.from('Post').insert({ ...post });

  if (error) throw new Error('게시글 작성에 실패했습니다.');

  return data;
};
