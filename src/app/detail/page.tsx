'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [isToggle, setIsToggle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userMatchData, setUserMatchData] = useState([]);
  const [matchDetailData, setMatchDetailData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [ouid, setOuid] = useState(null);
  const [matchType, setMatchType] = useState(50); // 공식경기 : 50

  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');

  // 유저정보
  const fetchUserData = async (nickname: string) => {
    try {
      const res = await fetch(`/api/user/detail?nickname=${nickname}`);
      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const userRes = await res.json();
      setUserData(userRes);
      setOuid(userRes.ouid);
    } catch (error) {
      console.error('유저정보오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 유저 매치 정보
  const fetchUserMatchData = async (ouid: string, matchType) => {
    try {
      const res = await fetch('/api/usermatch/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ouid, matchType })
      });

      if (!res.ok) {
        throw new Error(`서버 응답 없음: ${res.status}`);
      }
      const userMatchData = await res.json();
      setUserMatchData(userMatchData.map((matchId: string) => matchId));
      console.log('유저매치데이터!!!!!!', userMatchData);
      setIsToggle(new Array(userMatchData.length).fill(true));
    } catch (error) {
      console.error('유저 매치 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 매치 디테일 정보
  const fetchMatchDetailData = async (userMatchData: string[]) => {
    try {
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
      const matchDetailData = await res.json();
      setMatchDetailData(matchDetailData);
      console.log('매치 디테일 데이터!!!!!', matchDetailData);
    } catch (error) {
      console.error('매치 디테일 데이터 오류', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nickname) {
      fetchUserData(nickname);
    }
  }, []);

  useEffect(() => {
    if (ouid) {
      fetchUserMatchData(ouid, matchType);
    }
  }, [ouid]);

  useEffect(() => {
    if (userMatchData.length > 0) {
      fetchMatchDetailData(userMatchData);
    }
  }, [userMatchData]);

  // 로딩 화면
  if (isLoading) return <div className="flex justify-center items-center text-2xl">전적을 불러오고 있습니다....✨</div>;

  // 토글
  const toggleDetail = (index) => {
    setIsToggle((prev) => prev.map((toggle, i) => (i !== index ? toggle : !toggle)));
  };

  // 매치데이터 필터
  const matchDetailFilter = matchDetailData.filter((matchDetail) => {
    return userMatchData.includes(matchDetail.matchId);
  });

  const handleMatchType = (matchType: number) => {
    setMatchType(matchType);
    fetchUserMatchData(ouid, matchType);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
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
        <span onClick={() => handleMatchType(30)} className="cursor-pointer">
          공식친선
        </span>
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
                {matchDetail && matchDetail.matchInfo && matchDetail.matchInfo.length > 1 ? (
                  <span>{matchDetail.matchInfo[0].nickname}</span>
                ) : null}
                <span className="mx-3">vs</span>
                {matchDetail && matchDetail.matchInfo && matchDetail.matchInfo.length > 1 ? (
                  <span>{matchDetail.matchInfo[1].nickname}</span>
                ) : (
                  <>
                    <span>매치 상대 정보 없음</span>
                  </>
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
                <div className="bg-green-400 flex items-center m-2 p-5 gap-2 text-xl max-w-3xl w-full mx-auto">
                  여기에 축구장
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
