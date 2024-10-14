import { MatchDetailType } from '@/types/matchType';

export const getMatchId = async (nickname: string, matchtype: number) => {
  try {
    const response = await fetch(`/api/matchId?nickname=${nickname}&matchtype=${matchtype}`, {
      method: 'GET'
    });
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getMatchDetail = async (matchid: string) => {
  try {
    const response = await fetch(`/api/matchDetail?matchid=${matchid}`, {
      method: 'GET'
    });
    const data: MatchDetailType = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
