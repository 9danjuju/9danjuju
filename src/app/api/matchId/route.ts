import { type NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_FIFA_URL;
const OPTIONS = {
  headers: {
    'x-nxopen-api-key': process.env.NEXT_PUBLIC_TEST_API_KEY!
  }
};
type GetOuidType = {
  ouid: string;
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');
  const matchType = searchParams.get('matchtype');
  try {
    const responseId = await fetch(`${API_URL}/fconline/v1/id?nickname=${nickname}`, {
      method: 'GET',
      ...OPTIONS
    });
    const dataId: GetOuidType = await responseId.json();
    const ouid = dataId.ouid;

    const response = await fetch(
      `${API_URL}/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&offset=0&limit=10`,
      {
        method: 'GET',
        cache: 'no-store',
        ...OPTIONS
      }
    );
    const data: string[] = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};
