'use client';
import Loading from '@/app/loading';
import MatchAccordion from '@/components/detail/MatchAccordion';
import { Accordion } from '@/components/ui/accordion';
import { useGetMatchIdQuery } from '@/hooks/useGetMatchIdQuery';
import { Suspense } from 'react';

interface ParamsType {
  nickname: string;
}

const Detail = ({ params }: { params: ParamsType }) => {
  const { data, isLoading } = useGetMatchIdQuery(params.nickname, 50);
  if (isLoading) return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-center items-center">
        <div className="container w-full px-20 flex flex-col justify-center items-center">
          {data?.map((element) => {
            return (
              <Accordion key={element} type="single" collapsible className="w-full">
                <MatchAccordion id={element} />
              </Accordion>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default Detail;
('use client');
import { Field } from '@/components/detail/Field';
import { AllMatchType, MatchDetailType, SppositionType, UserInfoType } from '@/types/matchType';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ParamsType {
  nickname: string;
}

export default function Page({ params }: { params: ParamsType }) {
  const [isToggle, setIsToggle] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userMatchData, setUserMatchData] = useState<string[]>([]);
  const [matchDetailData, setMatchDetailData] = useState<MatchDetailType[]>([]);
  const [userData, setUserData] = useState<UserInfoType | null>(null);
  const [ouid, setOuid] = useState<string | null>(null);
  const [matchType, setMatchType] = useState(50); // 공식경기 : 50
  const [offset, setOffset] = useState(0);
  const [playerNames, setPlayerNames] = useState<{ id: number; name: string }[]>([]);
  const [playerPosition, setPlayerPosition] = useState<SppositionType[]>([]);

  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');

  // 유저정보
  const fetchUserData = async (nickname: string) => {
    try {
      const res = await fetch(`/api/user/detail?nickname=${params.nickname}`);
      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const userRes = await res.json();
      setUserData(userRes);
      setOuid(userRes.ouid);
      setIsLoading(false);
    } catch (error) {
      console.error('유저정보오류', error);
      // } finally {
      //   // setIsLoading(false);
      // }
    }
  };

  // 유저 매치 정보
  const fetchUserMatchData = async (ouid: string, matchType: number, offset: number) => {
    try {
      const res = await fetch('/api/usermatch/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ouid, matchType, offset })
      });

      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const userMatchData: AllMatchType = await res.json();
      setUserMatchData((prev) => [...prev, ...userMatchData.map((matchId: string) => matchId)]);
      console.log('유저매치데이터!!!!!!', userMatchData);
      setIsToggle((prev) => [...prev, ...new Array(userMatchData.length).fill(true)]);
    } catch (error) {
      console.error('유저 매치 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 매치 디테일 정보
  const fetchMatchDetailData = async (userMatchData: string[]) => {
    try {
      if (userMatchData.length === 0) return;
      const res = await fetch('/api/matchdetail/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matchIds: userMatchData })
      });

      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }

      const newMatchDetailData: MatchDetailType[] = await res.json();
      console.log('매치 디테일 데이터!!!!!', newMatchDetailData);
      setMatchDetailData((prev) => {
        const addedDetailData = newMatchDetailData.filter(
          (newDetail: { matchId: string }) => !prev.some((existedData) => existedData.matchId === newDetail.matchId)
        );
        return [...prev, ...addedDetailData];
      });
    } catch (error) {
      console.error('매치 디테일 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 선수 정보
  const fetchPlayerNames = async () => {
    try {
      const res = await fetch(`/api/playerdata/detail`);
      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const playerNameRes = await res.json();
      console.log('불러온 선수 데이터:', playerNameRes[0]);
      setPlayerNames(playerNameRes);
    } catch (error) {
      console.error('선수 이름 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 선수 포지션 정보
  const fetchPlayerPosition = async () => {
    try {
      const res = await fetch(`/api/playerposition/detail`);
      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const playerPositionData: SppositionType[] = await res.json();
      console.log('불러온 포지션 데이터:', playerPositionData);
      setPlayerPosition(playerPositionData);
    } catch (error) {
      console.error('선수 포지션 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 유저 데이터, 선수 이름
  useEffect(() => {
    if (params.nickname) {
      fetchUserData(params.nickname);
      fetchPlayerNames();
      fetchPlayerPosition();
      console.log('포지션 데이터:', playerPosition);
    }
    console.log(params);
  }, []);

  // 유처 매치 데이터
  useEffect(() => {
    if (ouid) {
      fetchUserMatchData(ouid, matchType, offset);
    }
  }, [ouid, offset]);

  // 매치 디테일
  useEffect(() => {
    if (userMatchData.length > 0) {
      fetchMatchDetailData(userMatchData);
    }
  }, [userMatchData]);

  // 로딩 화면
  if (isLoading) return <div className="flex justify-center items-center text-2xl">전적을 불러오고 있습니다....✨</div>;

  // 토글
  const toggleDetail = (index: number) => {
    setIsToggle((prev) => prev.map((toggle, i) => (i !== index ? toggle : !toggle)));
  };

  // 매치데이터 필터
  const matchDetailFilter = matchDetailData.filter((matchDetail) => {
    return userMatchData.includes(matchDetail.matchId);
  });

  // 매치 디테일 데이터의 spId로 선수 이름 가져오기
  const getPlayerName = (spId: number) => {
    const player = playerNames.find((pl) => Number(pl.id) === Number(spId));
    return player ? player.name : '선수 이름 없음';
  };

  // 매치 디테일 데이터의 spPosition으로 선수 포지션 가져오기
  const getPlayerPosition = (spPosition: number) => {
    const positionName = playerPosition.find((pp) => pp.spposition === spPosition);
    return positionName ? positionName.desc : '포지션 이름 없음';
  };

  // 매치 타입별 전적
  const handleMatchType = (matchType: number) => {
    setMatchType(matchType);
    setUserMatchData([]);
    setMatchDetailData([]);
    setOffset(0);
    setIsToggle([]);
    if (ouid) {
      fetchUserMatchData(ouid, matchType, 0);
    }
  };

  // 더보기
  const handleLoadMore = () => {
    setOffset((prevOff) => prevOff + 2);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mb-5">
      <Field />
      <div className="bg-gray-200 flex justify-center items-center m-2 p-5 max-w-3xl w-full mx-auto">
        <div className="mr-5">사진</div>
        <div className="flex flex-col items-center">
          {userData ? (
            <>
              <h1 className="text-2xl">{userData.nickname}</h1>
              <p>{userData.level}</p>
            </>
          ) : (
            <>
              <h1>닉네임정보없음</h1>
              <p>레벨정보없음</p>
            </>
          )}
        </div>
      </div>
      <nav className="bg-yellow-400 flex items-center m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
        <span onClick={() => handleMatchType(50)} className="cursor-pointer">
          공식경기
        </span>
        {/* <span onClick={() => handleMatchType(30)} className="cursor-pointer">
          공식친선
        </span> */}
        <span onClick={() => handleMatchType(52)} className="cursor-pointer">
          감독모드
        </span>
      </nav>

      {/* 매치 정보 */}

      {matchDetailFilter.map((matchDetail, index) => {
        const userMatchInfo = matchDetail.matchInfo.find((info) => info.nickname === userData?.nickname);
        const matchResult = userMatchInfo?.matchDetail.matchResult;

        return (
          <div key={matchDetail.matchId} className="flex flex-col items-center w-full">
            <div
              className={`flex flex-row justify-between items-center m-2 p-2  text-white max-w-3xl w-full mx-auto ${
                matchResult === '승' ? 'bg-blue-500' : matchResult === '패' ? 'bg-red-500' : 'bg-gray-500'
              }`}
            >
              <div className="flex flex-col items-center px-4 py-2 gap-2">
                {/* 승패 */}
                {userData && matchResult ? (
                  matchResult === '승' ? (
                    <span className="font-bold text-4xl">승</span>
                  ) : matchResult === '패' ? (
                    <span className="font-bold text-4xl">패</span>
                  ) : (
                    <span className="font-bold text-4xl">무</span>
                  )
                ) : (
                  <span>승패없음</span>
                )}
                {/* 날짜 */}
                {matchDetail ? (
                  <span className="text-xs">{matchDetail.matchDate}</span>
                ) : (
                  <span className="text-xs">날짜정보없음</span>
                )}
              </div>
              <div className="flex justify-center flex-grow text-xl">
                {matchDetail?.matchInfo?.length > 1 ? (
                  <>
                    <span>{matchDetail.matchInfo[0].nickname}</span>
                    <span className="mx-2">
                      {matchDetail.matchInfo[0].shoot.goalTotal} : {matchDetail.matchInfo[1].shoot.goalTotal}
                    </span>
                    <span>{matchDetail.matchInfo[1].nickname}</span>
                  </>
                ) : (
                  <span>매치 상대 정보 없음</span>
                )}
              </div>
              <div>
                <span className="text-5xl" onClick={() => toggleDetail(index)}>
                  🤡
                </span>
              </div>
            </div>

            {/* 상세창 토글 */}
            {!isToggle[index] ? (
              <div className="flex flex-col justify-between items-center  bg-green-300 text-white max-w-3xl w-full mx-auto">
                <nav className="bg-pink-400 flex items-center justify-between m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
                  <span>평점</span>
                  <span>종합</span>
                  <span>슈팅</span>
                  <span>패스</span>
                  <span>수비</span>
                </nav>
                <div className="bg-green-400 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
                  <div className="flex-1 flex flex-col items-start">
                    {matchDetail.matchInfo[0].player
                      .filter((player) => player.status.spRating > 0)
                      .map((player, index) => (
                        <span key={index}>
                          <Image
                            className="rounded-md object-scale-down"
                            width={64}
                            height={64}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`}
                            onError={() => console.log('이미지 로드에 실패했습니다.')}
                            alt={String(player.spId)}
                          />
                          {player.spGrade}등급/포지션:{getPlayerPosition(player.spPosition)}/평점:
                          {player.status.spRating}
                          /패스성공률:{Math.round((player.status.passSuccess / player.status.passTry) * 100)}%/득점:
                          {player.status.goal}
                          {getPlayerName(player.spId)}
                        </span>
                      ))}
                  </div>
                  <div className="flex-1 flex flex-col items-end border-l-2">
                    {matchDetail.matchInfo[1].player
                      .filter((player) => player.status.spRating > 0)
                      .map((player, index) => (
                        <span key={index}>
                          <Image
                            className="rounded-md object-scale-down"
                            width={64}
                            height={64}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`}
                            onError={() => console.log('이미지 로드에 실패했습니다.')}
                            alt={String(player.spId)}
                          />
                          {player.spGrade}등급/포지션:{getPlayerPosition(player.spPosition)}/평점:
                          {player.status.spRating}
                          /패스성공률:{Math.round((player.status.passSuccess / player.status.passTry) * 100)}%/득점:
                          {player.status.goal}
                          {getPlayerName(player.spId)}
                        </span>
                      ))}
                  </div>
                </div>
                <div></div>
                {/* <div className="bg-orange-400 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
                  여기스코어보드
                  <div>
                    <span>평균평점</span>
                  </div>
                </div> */}
              </div>
            ) : null}
          </div>
        );
      })}
      <button onClick={handleLoadMore} className="bg-gray-300 text-white max-w-3xl w-full mx-auto p-3">
        더보기
      </button>
    </div>
  );
}
