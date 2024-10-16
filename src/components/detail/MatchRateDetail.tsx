'use client';
import { useGetPlayersNameQuery } from '@/hooks/useGetPlayersNameQuery';
import { useGetPositionQuery } from '@/hooks/useGetPositionQuery';
import { PlayerInfoType, PlayerMatchDetailType, SpidPlayerType, SppositionType } from '@/types/matchType';
import PlayerImage from './PlayerImage';
import { useState } from 'react';

const MatchRateDetail = ({ data }: { data: PlayerMatchDetailType[] }) => {
  const { data: playerPosition } = useGetPositionQuery();
  const { data: playerNames } = useGetPlayersNameQuery();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInfoType | null>(null);

  // 매치 디테일 데이터의 spId로 선수 이름 가져오기
  const getPlayerName = (spId: number, playerNames: SpidPlayerType[] | undefined) => {
    if (!playerNames) return;
    const player = playerNames.find((pl) => Number(pl.id) === Number(spId));
    return player ? player.name.split(/[\s-]+/).pop() : '선수 이름 없음';
  };

  // 매치 디테일 데이터의 spPosition으로 선수 포지션 가져오기
  const getPlayerPosition = (spPosition: number, playerPosition: SppositionType[] | undefined) => {
    if (!playerPosition) return;
    const positionName = playerPosition.find((pp) => pp.spposition === spPosition);
    return positionName ? positionName.desc : '포지션 이름 없음';
  };

  // 모달 열기
  const openModal = (player: PlayerInfoType) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <>
      <div className="bg-gray-300 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
        {data.map((info, index) => (
          <div key={index} className={`flex-1 flex flex-col ${index === 0 ? 'items-start' : 'items-end border-l-2'}`}>
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
      {/* 모달 */}
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
                    {isNaN(Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100))
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
                    {isNaN(Math.round((selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100))
                      ? 0
                      : Math.round((selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100)}
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
                      {isNaN(Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100))
                        ? 0
                        : Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)}
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
    </>
  );
};

export default MatchRateDetail;
