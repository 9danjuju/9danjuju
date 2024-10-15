import { type NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_FIFA_URL;
const OPTIONS = {
  headers: {
    'x-nxopen-api-key': process.env.NEXT_PUBLIC_FIFA_API_KEY || ''
  }
};
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const matchid = searchParams.get('matchid');
  try {
    const response = await fetch(`${API_URL}/fconline/v1/match-detail?matchid=${matchid}`, {
      method: 'GET',
      ...OPTIONS
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};
