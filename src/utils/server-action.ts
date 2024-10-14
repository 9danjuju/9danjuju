'use server';
const API_URL = process.env.NEXT_PUBLIC_FIFA_URL;
const OPTIONS = {
  headers: {
    'x-nxopen-api-key': process.env.NEXT_PUBLIC_TEST_API_KEY || ''
  }
};

type GetOuidType = {
  ouid: string;
};

export const getUserOuid = async (nickname: string) => {
  try {
    const response = await fetch(`${API_URL}/fconline/v1/id?nickname=${nickname}`, {
      method: 'GET',
      ...OPTIONS
    });
    const data: GetOuidType = await response.json();
    return data.ouid;
  } catch (error) {
    throw new Error(`에러가 발생했습니다.: ${error}`);
  }
};

export const getUserMatchData = async (nickname: string, matchType: number) => {
  try {
    const ouid = await getUserOuid(nickname);
    const response = await fetch(
      `${API_URL}/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&offset=0&limit=10`,
      {
        method: 'GET',
        cache: 'no-store',
        ...OPTIONS
      }
    );
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(`에러가 발생했습니다.: ${error}`);
  }
};
