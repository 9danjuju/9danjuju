'use client';

import Field from '@/app/api/Field/page';
import PlayerImage from '@/components/detail/PlayerImage';
import { AllMatchType, MatchDetailType, PlayerInfoType, SppositionType, UserInfoType } from '@/types/matchType';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ParamsType {
  nickname: string;
}

// 매치 디테일 데이터의 spId로 선수 이름 가져오기
export const getPlayerName = (spId: number, playerNames: { id: number; name: string }[]) => {
  const player = playerNames.find((pl) => Number(pl.id) === Number(spId));
  return player ? player.name.split(/[\s-]+/).pop() : '선수 이름 없음';
};

// 매치 디테일 데이터의 spPosition으로 선수 포지션 가져오기
export const getPlayerPosition = (spPosition: number, playerPosition: SppositionType[]) => {
  const positionName = playerPosition.find((pp) => pp.spposition === spPosition);
  return positionName ? positionName.desc : '포지션 이름 없음';
};

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfoType | null>(null);
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');

  const openModal = (selectedPlayer: PlayerInfoType) => {
    setSelectedPlayer(selectedPlayer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

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
      // console.log('포지션 데이터:', playerPosition);
    }
    // console.log(params);
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
      <div className="bg-gray-200 flex justify-center items-center m-2 p-5 max-w-7xl w-full mx-auto">
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
      <nav className="bg-yellow-400 flex items-center m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
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
              className={`flex flex-row justify-between items-center m-2 p-2  text-white max-w-7xl w-full mx-auto ${
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
              <div className="flex flex-col justify-between items-center text-white max-w-7xl w-full mx-auto">
                <nav className="bg-pink-400 flex items-center justify-between m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
                  <span>평점</span>
                  <span>종합</span>
                  <span>슈팅</span>
                  <span>패스</span>
                  <span>수비</span>
                </nav>

                <div className="bg-gray-300 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
                  {matchDetail.matchInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`flex-1 flex flex-col ${index === 0 ? 'items-start' : 'items-end border-l-2'}`}
                    >
                      {/* 선수목록 */}
                      {info.player
                        .filter((player) => player.status.spRating > 0)
                        .map((player, playerIndex) => (
                          <div key={playerIndex} onClick={() => openModal(player)} className="mb-3 w-28">
                            <PlayerImage spId={player.spId} spRating={player.status.spRating} />
                            <div className="bg-red-500 text-white p-1 rounded-lg text-center font-bold">
                              {getPlayerPosition(player.spPosition, playerPosition)}
                            </div>
                            <div className="bg-zinc-800 text-white p-1 rounded-lg text-center">
                              {getPlayerName(player.spId, playerNames)}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
                <div></div>
                {isModalOpen && selectedPlayer && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-1/4 text-black  text-center">
                      <div className="flex flex-row">
                        {/* 선수기본정보 */}
                        <div className="p-5">
                          {/* 선수이름 */}
                          <h3 className="text-2xl font-bold mt-2">
                            {selectedPlayer && getPlayerName(selectedPlayer.spId, playerNames)}
                          </h3>
                          <div className="flex flex-row justify-center items-center">
                            <span>포지션</span>
                            <span className="font-bold">
                              {selectedPlayer && getPlayerPosition(selectedPlayer.spPosition, playerPosition)}
                            </span>
                            <span>강화등급</span>
                            <span className="bg-slate-200 rounded-sm w-4">{selectedPlayer?.spGrade}</span>
                          </div>
                        </div>
                        {/* 선수이미지 */}
                        <div>
                          <PlayerImage spId={selectedPlayer.spId} spRating={selectedPlayer.status.spRating} />
                        </div>
                      </div>
                      <div>
                        {/* 주요지표 */}
                        <h2>주요지표</h2>
                        <div className=" bg-gray-200 p-5">
                          <div className="flex justify-between">
                            <span>득점</span>
                            <span>{selectedPlayer.status.goal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>어시스트</span>
                            <span>{selectedPlayer.status.assist}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>패스성공률</span>
                            <span>
                              {isNaN(
                                Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)
                              )
                                ? 0
                                : Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* 주요지표 */}
                        <h2>공격지표</h2>
                        <div className=" bg-gray-200 p-5">
                          <div className="flex justify-between">
                            <span>슈팅정확도</span>
                            <span>
                              {isNaN(
                                Math.round((selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100)
                              )
                                ? 0
                                : Math.round(
                                    (selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100
                                  )}
                              %
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>빗나간슈팅</span>
                            <span>{selectedPlayer.status.shoot - selectedPlayer.status.effectiveShoot}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>유효 슈팅</span>
                            <span>{selectedPlayer.status.effectiveShoot}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>전체 슛</span>
                            <span>{selectedPlayer.status.shoot}</span>
                          </div>
                        </div>

                        <div>
                          {/* 주요지표 */}
                          <h2>공통지표</h2>
                          <div className=" bg-gray-200 p-5">
                            <div className="flex justify-between">
                              <span>패스 성공률</span>
                              <span>
                                {isNaN(
                                  Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)
                                )
                                  ? 0
                                  : Math.round(
                                      (selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100
                                    )}
                                %
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>패스 시도</span>
                              <span>{selectedPlayer.status.passTry}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>패스 성공</span>
                              <span>{selectedPlayer.status.passSuccess}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>드리블 시도</span>
                              <span>{selectedPlayer.status.dribbleTry}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>드리블 성공</span>
                              <span>{selectedPlayer.status.dribbleSuccess}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button onClick={closeModal} className="mt-4 bg-red-500 text-white p-2 rounded">
                        닫기
                      </button>
                    </div>
                  </div>
                )}
                <Field />
                {/* <div className="bg-orange-400 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
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
      <button onClick={handleLoadMore} className="bg-gray-300 text-white max-w-7xl w-full mx-auto p-3">
        더보기
      </button>
    </div>
  );
}
