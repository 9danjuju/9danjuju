'use server';

import { DivisionJsonType, MaxDivisionType } from '@/types/maxDivisionType';
import { UserInfoType } from '@/types/userInfoType';

const API_URL = process.env.NEXT_PUBLIC_FIFA_URL;
const OPTIONS = {
  headers: {
    'x-nxopen-api-key': process.env.NEXT_PUBLIC_FIFA_API_KEY || ''
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

export const getFifaUserInfo = async (nickname: string) => {
  try {
    const ouid = await getUserOuid(nickname);
    const divisionMetaDataResponse = await fetch(`${API_URL}/static/fconline/meta/division.json`);
    const divisionMetaData: DivisionJsonType[] = await divisionMetaDataResponse.json();
    const maxDivisionImageDataResponse = await fetch(`${API_URL}/fconline/v1/user/maxdivision?ouid=${ouid}`, {
      method: 'GET',
      cache: 'no-store',
      ...OPTIONS
    });
    const maxDivisionData: MaxDivisionType[] = await maxDivisionImageDataResponse.json();
    const maxDivision = maxDivisionData.map((element) => {
      const convertMatchType = (type: number) => {
        if (type === 50) {
          return '공식 경기';
        }
        if (type === 52) {
          return '감독 모드';
        }
        return '그 외';
      };
      return {
        matchType: convertMatchType(element.matchType),
        division: divisionMetaData.find((data) => data.divisionId === element.division)?.divisionName,
        achievementDate: element.achievementDate
      };
    });

    const response = await fetch(`${API_URL}/fconline/v1/user/basic?ouid=${ouid}`, {
      method: 'GET',
      cache: 'no-store',
      ...OPTIONS
    });
    const data: UserInfoType = await response.json();
    return { ...data, maxDivision };
  } catch (error) {
    throw new Error(`에러가 발생했습니다. : ${error}`);
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
