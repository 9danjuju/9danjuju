import { getMatchDetail } from '@/utils/client-action';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMatchDetailDataQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['matchDetailData', id],
    queryFn: () => getMatchDetail(id)
  });
};
