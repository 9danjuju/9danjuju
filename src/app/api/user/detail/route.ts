import { PlayerMatchDetailType } from '@/types/matchType';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const FIFA_API_KEY = process.env.NEXT_PUBLIC_FIFA_API_KEY as string;

  if (!FIFA_API_KEY) {
    throw new Error('API키가 없습니다.');
  }

  // const { searchParams } = new URL(request.url);
  // const nickname = searchParams.get('nickname');

  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');

  if (!nickname) {
    return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
  }

  try {
    // 닉네임으로 ouid 조회
    const nicknameUrl = `https://open.api.nexon.com/fconline/v1/id?nickname=${nickname}`;
    const ouidRes = await fetch(nicknameUrl, {
      headers: {
        'x-nxopen-api-key': FIFA_API_KEY
      }
    });

    if (!ouidRes.ok) {
      return NextResponse.json({ error: 'API를 불러오지 못했습니다.' }, { status: ouidRes.status });
    }

    const { ouid } = await ouidRes.json();

    // ouid로 유저 정보 조회(닉네임/레벨/)
    const ouidUrl = `https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`;
    const userDataRes = await fetch(ouidUrl, {
      headers: {
        'x-nxopen-api-key': FIFA_API_KEY
      }
    });

    if (userDataRes.ok) {
      const userData: PlayerMatchDetailType = await userDataRes.json();
      return NextResponse.json(userData);
    } else {
      return NextResponse.json({ error: 'API를 불러오지 못했습니다.' }, { status: userDataRes.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
