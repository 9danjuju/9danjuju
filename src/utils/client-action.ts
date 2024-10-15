import { MatchDetailType, SpidPlayerType, SppositionType } from '@/types/matchType';

export const getMatchId = async (nickname: string, matchtype: number, offset: number) => {
  try {
    const response = await fetch(`/api/matchId?nickname=${nickname}&matchtype=${matchtype}&offset=${offset}`, {
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

export const getPlayerPosition = async () => {
  try {
    const res = await fetch(`/api/playerposition/detail`);
    if (!res.ok) {
      throw new Error(`서버 응답 없음: ${res.status}`);
    }
    const playerPositionData: SppositionType[] = await res.json();
    return playerPositionData;
  } catch (error) {
    console.error('선수 포지션 데이터 오류', error);
  }
};

export const getPlayerNames = async () => {
  try {
    const res = await fetch(`/api/playerdata/detail`);
    if (!res.ok) {
      throw new Error(`서버 응답 없음: ${res.status}`);
    }
    const playerNameRes: SpidPlayerType[] = await res.json();
    return playerNameRes;
  } catch (error) {
    console.error('선수 이름 데이터 오류', error);
  }
};
