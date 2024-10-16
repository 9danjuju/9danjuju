import { NextResponse } from 'next/server';

export async function GET() {
  const FIFA_API_KEY = process.env.NEXT_PUBLIC_FIFA_API_KEY as string;

  if (!FIFA_API_KEY) {
    throw new Error('API키가 없습니다.');
  }

  const apiUrlString = `https://open.api.nexon.com/static/fconline/meta/spid.json`;
  try {
    const res = await fetch(apiUrlString, { cache: 'no-store' });

    if (res.ok) {
      const playerNameData = await res.json();
      return NextResponse.json(playerNameData);
    } else {
      return NextResponse.json({ error: 'API를 불러오지 못했습니다.' }, { status: res.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
