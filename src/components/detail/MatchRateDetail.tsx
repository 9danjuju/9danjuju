'use client';
import { useGetPlayersNameQuery } from '@/hooks/useGetPlayersNameQuery';
import { useGetPositionQuery } from '@/hooks/useGetPositionQuery';
import { PlayerInfoType, PlayerMatchDetailType, SpidPlayerType, SppositionType } from '@/types/matchType';
import Image from 'next/image';
import PlayerImage from './PlayerImage';
import { useState } from 'react';

const MatchRateDetail = ({ data }: { data: PlayerMatchDetailType[] }) => {
  const { data: playerPosition } = useGetPositionQuery();
  const { data: playerNames } = useGetPlayersNameQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="flex flex-row justify-center items-center m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
        {data.map((info, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-wrap gap-4 justify-center items-center  ${
              index === 0 ? 'items-start' : 'items-end border-l-2'
            }`}
          >
            {/* 선수목록 */}
            {info.player
              .filter((player) => player.status.spRating > 0)
              .map((player, playerIndex) => (
                <div key={playerIndex} onClick={() => openModal(player)} className="w-1/4 p-2">
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} />
                  <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                    {getPlayerPosition(player.spPosition, playerPosition)}
                  </div>
                  <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                    {getPlayerName(player.spId, playerNames)}
                  </div>
                </div>
              ))}
          </div>
        ))}

        {/* {data[0].player
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
          {data[1].player
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
            ))} */}
      </div>
      {/* 모달 */}
      {isModalOpen && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
          <div
            className="bg-white p-4 rounded shadow-lg w-1/6  text-black text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center justify-center mb-5 ">
              {/* 선수기본정보 */}
              <div className="p-5">
                {/* 선수이름 */}
                <h3 className="text-4xl font-bold text-left">
                  {selectedPlayer && getPlayerName(selectedPlayer.spId, playerNames)}
                </h3>
                <div className="flex flex-row justify-center items-center gap-2 mt-2">
                  <span>포지션</span>
                  <span className="font-bold">
                    {selectedPlayer && getPlayerPosition(selectedPlayer.spPosition, playerPosition)}
                  </span>
                  <span>강화등급</span>
                  <span className="bg-slate-200 rounded-sm w-12">{selectedPlayer?.spGrade}</span>
                </div>
              </div>
              {/* 선수이미지 */}
              <div>
                <PlayerImage
                  spId={selectedPlayer.spId}
                  spRating={selectedPlayer.status.spRating}
                  showRating={false}
                  imgWidth={105}
                  imgHeight={105}
                />
              </div>
            </div>
            <div>
              {/* 주요지표 */}
              <h2 className="modal-h2">주요지표</h2>
              <div className="modal-status-container">
                <div className="flex justify-between modal-status-detail-container">
                  <span>평점</span>
                  <span className="bg-gray-300 rounded-sm w-8">{selectedPlayer.status.spRating}</span>
                </div>
                <div className="flex justify-between">
                  <span>득점</span>
                  <span className="modal-status">{selectedPlayer.status.goal}</span>
                </div>
                <div className="flex justify-between">
                  <span>어시스트</span>
                  <span className="modal-status">{selectedPlayer.status.assist}</span>
                </div>
                <div className="flex justify-between">
                  <span>패스성공률</span>
                  <span className="modal-status">
                    {isNaN(Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100))
                      ? 0
                      : Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)}
                    %
                  </span>
                </div>
              </div>
            </div>
            <div>
              {/* 공격지표 */}
              <h2 className="modal-h2">공격지표</h2>
              <div className="modal-status-container">
                <div className="flex justify-between">
                  <span>슈팅정확도</span>
                  <span className="modal-status">
                    {isNaN(Math.round((selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100))
                      ? 0
                      : Math.round((selectedPlayer.status.effectiveShoot / selectedPlayer.status.shoot) * 100)}
                    %
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>빗나간슈팅</span>
                  <span className="modal-status">
                    {selectedPlayer.status.shoot - selectedPlayer.status.effectiveShoot}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>유효 슈팅</span>
                  <span className="modal-status">{selectedPlayer.status.effectiveShoot}</span>
                </div>

                <div className="flex justify-between">
                  <span>전체 슛</span>
                  <span className="modal-status">{selectedPlayer.status.shoot}</span>
                </div>
              </div>

              <div>
                {/* 공통지표 */}
                <h2 className="modal-h2">공통지표</h2>
                <div className="modal-status-container">
                  <div className="flex justify-between">
                    <span>패스 성공률</span>
                    <span className="modal-status">
                      {isNaN(Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100))
                        ? 0
                        : Math.round((selectedPlayer.status.passSuccess / selectedPlayer.status.passTry) * 100)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>패스 시도</span>
                    <span className="modal-status">{selectedPlayer.status.passTry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>패스 성공</span>
                    <span className="modal-status">{selectedPlayer.status.passSuccess}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>드리블 시도</span>
                    <span className="modal-status">{selectedPlayer.status.dribbleTry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>드리블 성공</span>
                    <span className="modal-status">{selectedPlayer.status.dribbleSuccess}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={closeModal} className="mt-4 bg-gray-500 text-white p-2 rounded">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchRateDetail;
