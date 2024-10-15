'use client';
import { useGetPlayersNameQuery } from '@/hooks/useGetPlayersNameQuery';
import { useGetPositionQuery } from '@/hooks/useGetPositionQuery';
import { PlayerMatchDetailType } from '@/types/matchType';
import Image from 'next/image';
import PlayerImage from './PlayerImage';

const MatchRateDetail = ({ data }: { data: PlayerMatchDetailType[] }) => {
  const { data: playerPosition } = useGetPositionQuery();
  const { data: playerNames } = useGetPlayersNameQuery();

  const getPlayerPosition = (spPosition: number) => {
    const positionName = playerPosition?.find((pp) => pp.spposition === spPosition);
    return positionName ? positionName.desc : '포지션 이름 없음';
  };

  const getPlayerName = (spId: number) => {
    const player = playerNames?.find((pl) => Number(pl.id) === Number(spId));
    return player ? player.name.split(/[\s-]+/).pop() : '선수 이름 없음';
  };

  return (
    <>
      <div className="bg-green-400 flex flex-row justify-between m-2 p-5 gap-2 text-xl max-w-7xl w-full mx-auto">
        {data.map((info, index) => (
          <div key={index} className={`flex-1 flex flex-col ${index === 0 ? 'items-start' : 'items-end border-l-2'}`}>
            {info.player
              .filter((player) => player.status.spRating > 0)
              .map((player, playerIndex) => (
                <div key={playerIndex} className="mb-3 w-28">
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} />

                  <div className="bg-red-500 text-white p-1 rounded-lg text-center font-bold">
                    {getPlayerPosition(player.spPosition)}
                  </div>
                  <div className="bg-zinc-800 text-white p-1 rounded-lg text-center">{getPlayerName(player.spId)}</div>
                  <div>{player.spGrade}등급</div>
                  <div>
                    패스성공률:
                    {isNaN(Math.round((player.status.passSuccess / player.status.passTry) * 100))
                      ? 0
                      : Math.round((player.status.passSuccess / player.status.passTry) * 100)}
                    %
                  </div>
                  <div>득점: {player.status.goal}</div>
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
    </>
  );
};

export default MatchRateDetail;
