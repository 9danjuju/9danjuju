import { AllMatchType } from '@/types/matchType';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const FIFA_API_KEY = process.env.NEXT_PUBLIC_FIFA_API_KEY as string;

  if (!FIFA_API_KEY) {
    throw new Error('API키가 없습니다.');
  }

  // const ouid = 'f06bcbffe4be5bafb43938902db2b355';
  // const { ouid } = useUserMatchStore.getState();

  const { ouid, matchType, offset } = await request.json();

  const apiUrlString = `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&limit=2&offset=${offset}`;
  try {
    const res = await fetch(apiUrlString, {
      headers: {
        'x-nxopen-api-key': FIFA_API_KEY
      }
    });

    if (res.ok) {
      const userMatch_data: AllMatchType = await res.json();
      console.log('😀 userMatch_data', userMatch_data);
      return NextResponse.json(userMatch_data);
    } else {
      return NextResponse.json({ error: 'API를 불러오지 못했습니다.' }, { status: res.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
