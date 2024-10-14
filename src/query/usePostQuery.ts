import { getPosts } from '@/utils/supabase/posts';
import { useQuery } from '@tanstack/react-query';

export const usePostQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  });
};
