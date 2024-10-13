import { match } from 'assert';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const FIFA_API_KEY = process.env.NEXT_PUBLIC_FIFA_API_KEY as string;

  if (!FIFA_API_KEY) {
    throw new Error('API키가 없습니다.');
  }

  // const matchId = '6709239eae411d57aa9bd889';
  const { matchIds } = await request.json();

  if (!Array.isArray(matchIds) || matchIds.length === 0) {
    return NextResponse.json({ error: 'matchIds가 필요합니다.' }, { status: 400 });
  }
  // if (!matchIds) {
  //   return NextResponse.json({ error: 'matchId가 필요합니다.' }, { status: 400 });
  // }

  try {
    const matchDetailRes = await Promise.all(
      matchIds.map(async (matchId) => {
        const apiUrlString = `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchId}`;
        const res = await fetch(apiUrlString, {
          headers: {
            'x-nxopen-api-key': FIFA_API_KEY
          }
        });
        if (!res.ok) {
          throw new Error(`매치 아이디 ${matchId}에 대한 데이터가 없습니다.`);
        }

        // 각 matchId에 대한 응답을 JSON으로 변환
        return res.json();
      })
    );
    return NextResponse.json(matchDetailRes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
