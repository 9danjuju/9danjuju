import { getPlayerName, getPlayerPosition } from '@/components/detail/MatchRateDetail';
import PlayerImage from '@/components/detail/PlayerImage';
import { PlayerInfoType, PlayerMatchDetailType, SpidPlayerType, SppositionType } from '@/types/matchType';

interface FieldProps {
  matchInfo: PlayerMatchDetailType[];
  playerNames: SpidPlayerType[] | undefined;
  playerPosition: SppositionType[] | undefined;
  openModal: (player: PlayerInfoType) => void;
}

const Field = ({ matchInfo, playerNames, playerPosition, openModal }: FieldProps) => {
  // const leftLwbRef = useRef<HTMLButtonElement | null>(null);
  // const leftGkRef = useRef<HTMLButtonElement | null>(null);

  const playersLeft = Array.from({ length: 28 }, (_, index) =>
    matchInfo[0]?.player.find((player) => player.spPosition === index)
  );

  const playersRight = Array.from({ length: 28 }, (_, index) =>
    matchInfo[1]?.player.find((player) => player.spPosition === index)
  );

  return (
    <>
      <div>
        <div className="relative w-[1440px] h-[700px] bg-field bg-green-600 overflow-hidden shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            {/*중앙 선 */}
            <div className="h-full w-0.5 bg-white"></div>
          </div>
          {/* 중앙 원 */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border-solid border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* 페널티 박스 - 왼쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 페널티 박스 - 오른쪽 */}
          <div className="absolute top-[50%] transform -translate-y-1/2 right-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 골대 - 왼쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 w-8 h-24 border-solid border-2 border-white"></div>
          {/* 골대 - 오른쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 right-2 w-8 h-24 border-solid border-2 border-white"></div>

          {/* 왼쪽 팀 포지션들 */}
          {playersLeft[0] && (
            <button
              className="absolute top-1/2 left-[3%] transform -translate-y-1/2 bg-win text-white p-2 rounded"
              onClick={() => playersLeft[0] && openModal(playersLeft[0])}
            >
              <PlayerImage spId={playersLeft[0].spId} spRating={playersLeft[0].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[0].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[0].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[1] && (
            <button
              className="absolute top-[50%] left-[15%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[1] && openModal(playersLeft[1])}
            >
              <PlayerImage spId={playersLeft[1].spId} spRating={playersLeft[1].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[1].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[1].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[2] && (
            <button
              className="absolute top-[10%] left-[15%] bg-win text-white p-2 rounded"
              onClick={() => playersLeft[2] && openModal(playersLeft[2])}
            >
              <PlayerImage spId={playersLeft[2].spId} spRating={playersLeft[2].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[2].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[2].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[3] && (
            <button
              className="absolute bottom-[10%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[3] && openModal(playersLeft[3])}
            >
              <PlayerImage spId={playersLeft[3].spId} spRating={playersLeft[3].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[3].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[3].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[4] && (
            <button
              className="absolute bottom-[25%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[4] && openModal(playersLeft[4])}
            >
              <PlayerImage spId={playersLeft[4].spId} spRating={playersLeft[4].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[4].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[4].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[5] && (
            <button
              className="absolute top-[50%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[5] && openModal(playersLeft[5])}
            >
              <PlayerImage spId={playersLeft[5].spId} spRating={playersLeft[5].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[5].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[5].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[6] && (
            <button
              className="absolute top-[25%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[6] && openModal(playersLeft[6])}
            >
              <PlayerImage spId={playersLeft[6].spId} spRating={playersLeft[6].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[6].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[6].spId, playerNames)}
              </div>
            </button>
          )}
          {playersLeft[7] && (
            <button
              className="absolute top-[10%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[7] && openModal(playersLeft[7])}
            >
              <PlayerImage spId={playersLeft[7].spId} spRating={playersLeft[7].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[7].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[7].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[8] && (
            <button
              className="absolute top-[25%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[8] && openModal(playersLeft[8])}
            >
              <PlayerImage spId={playersLeft[8].spId} spRating={playersLeft[8].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[8].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[8].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[9] && (
            <button
              className="absolute top-[50%] left-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[9] && openModal(playersLeft[9])}
            >
              <PlayerImage spId={playersLeft[9].spId} spRating={playersLeft[9].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[9].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[9].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[10] && (
            <button
              className="absolute top-[50%] left-[15%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[10] && openModal(playersLeft[10])}
            >
              <PlayerImage spId={playersLeft[10].spId} spRating={playersLeft[10].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[10].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[10].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[11] && (
            <button
              className="absolute top-[10%] left-[15%] bg-win text-white p-2 rounded"
              onClick={() => playersLeft[11] && openModal(playersLeft[11])}
            >
              <PlayerImage spId={playersLeft[11].spId} spRating={playersLeft[11].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[11].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[11].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[12] && (
            <button
              className="absolute top-[10%] left-[25%] bg-win text-white p-2 rounded"
              onClick={() => playersLeft[12] && openModal(playersLeft[12])}
            >
              <PlayerImage spId={playersLeft[12].spId} spRating={playersLeft[12].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[12].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[12].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[13] && (
            <button
              className="absolute bottom-[10%] left-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[13] && openModal(playersLeft[13])}
            >
              <PlayerImage spId={playersLeft[13].spId} spRating={playersLeft[13].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[13].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[13].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[14] && (
            <button
              className="absolute top-[25%] left-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[14] && openModal(playersLeft[14])}
            >
              <PlayerImage spId={playersLeft[14].spId} spRating={playersLeft[14].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[14].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[14].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[15] && (
            <button
              className="absolute top-[50%] left-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[15] && openModal(playersLeft[15])}
            >
              <PlayerImage spId={playersLeft[15].spId} spRating={playersLeft[15].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[15].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[15].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[16] && (
            <button
              className="absolute top-[25%] left-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[16] && openModal(playersLeft[16])}
            >
              <PlayerImage spId={playersLeft[16].spId} spRating={playersLeft[16].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[16].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[16].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[17] && (
            <button
              className="absolute top-[50%] left-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[17] && openModal(playersLeft[17])}
            >
              <PlayerImage spId={playersLeft[17].spId} spRating={playersLeft[17].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[17].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[17].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[18] && (
            <button
              className="absolute bottom-[25%] left-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[18] && openModal(playersLeft[18])}
            >
              <PlayerImage spId={playersLeft[18].spId} spRating={playersLeft[18].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[18].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[18].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[19] && (
            <button
              className="absolute top-[50%] left-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[19] && openModal(playersLeft[19])}
            >
              <PlayerImage spId={playersLeft[19].spId} spRating={playersLeft[19].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[19].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[19].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[20] && (
            <button
              className="absolute top-[10%] left-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[20] && openModal(playersLeft[20])}
            >
              <PlayerImage spId={playersLeft[20].spId} spRating={playersLeft[20].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[20].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[20].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[21] && (
            <button
              className="absolute top-[50%] left-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[21] && openModal(playersLeft[21])}
            >
              <PlayerImage spId={playersLeft[21].spId} spRating={playersLeft[21].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[21].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[21].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[22] && (
            <button
              className="absolute top-1/3 left-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[22] && openModal(playersLeft[22])}
            >
              <PlayerImage spId={playersLeft[22].spId} spRating={playersLeft[22].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[22].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[22].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[23] && (
            <button
              className="absolute bottom-1/3 left-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[23] && openModal(playersLeft[23])}
            >
              <PlayerImage spId={playersLeft[23].spId} spRating={playersLeft[23].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[23].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[23].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[24] && (
            <button
              className="absolute bottom-[10%] left-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[24] && openModal(playersLeft[24])}
            >
              <PlayerImage spId={playersLeft[24].spId} spRating={playersLeft[24].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[24].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[24].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[25] && (
            <button
              className="absolute top-1/3 left-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[25] && openModal(playersLeft[25])}
            >
              <PlayerImage spId={playersLeft[25].spId} spRating={playersLeft[25].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[25].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[25].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[26] && (
            <button
              className="absolute top-[50%] left-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[26] && openModal(playersLeft[26])}
            >
              <PlayerImage spId={playersLeft[26].spId} spRating={playersLeft[26].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[26].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[26].spId, playerNames)}
              </div>
            </button>
          )}

          {playersLeft[27] && (
            <button
              className="absolute bottom-1/3 left-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersLeft[27] && openModal(playersLeft[27])}
            >
              <PlayerImage spId={playersLeft[27].spId} spRating={playersLeft[27].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersLeft[27].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersLeft[27].spId, playerNames)}
              </div>
            </button>
          )}
          {/* 오른쪽 팀 포지션들 */}

          {playersRight[0] && (
            <button
              className="absolute top-1/2 right-[3%] transform -translate-y-1/2 bg-win text-white p-2 rounded"
              onClick={() => playersRight[0] && openModal(playersRight[0])}
            >
              <PlayerImage spId={playersRight[0].spId} spRating={playersRight[0].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[0].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[0].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[1] && (
            <button
              className="absolute top-[50%] right-[15%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[1] && openModal(playersRight[1])}
            >
              <PlayerImage spId={playersRight[1].spId} spRating={playersRight[1].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[1].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[1].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[2] && (
            <button
              className="absolute top-[10%] right-[15%] bg-win text-white p-2 rounded"
              onClick={() => playersRight[2] && openModal(playersRight[2])}
            >
              <PlayerImage spId={playersRight[2].spId} spRating={playersRight[2].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[2].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[2].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[3] && (
            <button
              className="absolute bottom-[10%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[3] && openModal(playersRight[3])}
            >
              <PlayerImage spId={playersRight[3].spId} spRating={playersRight[3].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[3].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[3].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[4] && (
            <button
              className="absolute bottom-[25%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[4] && openModal(playersRight[4])}
            >
              <PlayerImage spId={playersRight[4].spId} spRating={playersRight[4].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[4].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[4].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[5] && (
            <button
              className="absolute top-[50%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[5] && openModal(playersRight[5])}
            >
              <PlayerImage spId={playersRight[5].spId} spRating={playersRight[5].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[5].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[5].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[6] && (
            <button
              className="absolute top-[25%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[6] && openModal(playersRight[6])}
            >
              <PlayerImage spId={playersRight[6].spId} spRating={playersRight[6].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[6].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[6].spId, playerNames)}
              </div>
            </button>
          )}
          {playersRight[7] && (
            <button
              className="absolute top-[10%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[7] && openModal(playersRight[7])}
            >
              <PlayerImage spId={playersRight[7].spId} spRating={playersRight[7].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[7].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[7].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[8] && (
            <button
              className="absolute top-[25%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[8] && openModal(playersRight[8])}
            >
              <PlayerImage spId={playersRight[8].spId} spRating={playersRight[8].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[8].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[8].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[9] && (
            <button
              className="absolute top-[50%] right-[10%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[9] && openModal(playersRight[9])}
            >
              <PlayerImage spId={playersRight[9].spId} spRating={playersRight[9].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[9].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[9].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[10] && (
            <button
              className="absolute top-[50%] right-[15%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[10] && openModal(playersRight[10])}
            >
              <PlayerImage spId={playersRight[10].spId} spRating={playersRight[10].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[10].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[10].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[11] && (
            <button
              className="absolute top-[10%] right-[15%] bg-win text-white p-2 rounded"
              onClick={() => playersRight[11] && openModal(playersRight[11])}
            >
              <PlayerImage spId={playersRight[11].spId} spRating={playersRight[11].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[11].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[11].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[12] && (
            <button
              className="absolute top-[10%] right-[25%] bg-win text-white p-2 rounded"
              onClick={() => playersRight[12] && openModal(playersRight[12])}
            >
              <PlayerImage spId={playersRight[12].spId} spRating={playersRight[12].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[12].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[12].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[13] && (
            <button
              className="absolute bottom-[10%] right-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[13] && openModal(playersRight[13])}
            >
              <PlayerImage spId={playersRight[13].spId} spRating={playersRight[13].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[13].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[13].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[14] && (
            <button
              className="absolute top-[25%] right-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[14] && openModal(playersRight[14])}
            >
              <PlayerImage spId={playersRight[14].spId} spRating={playersRight[14].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[14].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[14].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[15] && (
            <button
              className="absolute top-[50%] right-[25%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[15] && openModal(playersRight[15])}
            >
              <PlayerImage spId={playersRight[15].spId} spRating={playersRight[15].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[15].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[15].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[16] && (
            <button
              className="absolute top-[25%] right-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[16] && openModal(playersRight[16])}
            >
              <PlayerImage spId={playersRight[16].spId} spRating={playersRight[16].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[16].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[16].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[17] && (
            <button
              className="absolute top-[50%] right-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[17] && openModal(playersRight[17])}
            >
              <PlayerImage spId={playersRight[17].spId} spRating={playersRight[17].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[17].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[17].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[18] && (
            <button
              className="absolute bottom-[25%] right-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[18] && openModal(playersRight[18])}
            >
              <PlayerImage spId={playersRight[18].spId} spRating={playersRight[18].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[18].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[18].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[19] && (
            <button
              className="absolute top-[50%] right-[30%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[19] && openModal(playersRight[19])}
            >
              <PlayerImage spId={playersRight[19].spId} spRating={playersRight[19].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[19].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[19].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[20] && (
            <button
              className="absolute top-[10%] right-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[20] && openModal(playersRight[20])}
            >
              <PlayerImage spId={playersRight[20].spId} spRating={playersRight[20].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[20].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[20].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[21] && (
            <button
              className="absolute top-[50%] right-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[21] && openModal(playersRight[21])}
            >
              <PlayerImage spId={playersRight[21].spId} spRating={playersRight[21].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[21].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[21].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[22] && (
            <button
              className="absolute top-1/3 right-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[22] && openModal(playersRight[22])}
            >
              <PlayerImage spId={playersRight[22].spId} spRating={playersRight[22].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[22].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[22].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[23] && (
            <button
              className="absolute bottom-1/3 right-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[23] && openModal(playersRight[23])}
            >
              <PlayerImage spId={playersRight[23].spId} spRating={playersRight[23].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[23].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[23].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[24] && (
            <button
              className="absolute bottom-[10%] right-[35%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[24] && openModal(playersRight[24])}
            >
              <PlayerImage spId={playersRight[24].spId} spRating={playersRight[24].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[24].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[24].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[25] && (
            <button
              className="absolute top-1/3 right-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[25] && openModal(playersRight[25])}
            >
              <PlayerImage spId={playersRight[25].spId} spRating={playersRight[25].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[25].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[25].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[26] && (
            <button
              className="absolute top-[50%] right-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[26] && openModal(playersRight[26])}
            >
              <PlayerImage spId={playersRight[26].spId} spRating={playersRight[26].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[26].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[26].spId, playerNames)}
              </div>
            </button>
          )}

          {playersRight[27] && (
            <button
              className="absolute bottom-1/3 right-[40%] bg-lose text-white p-2 rounded"
              onClick={() => playersRight[27] && openModal(playersRight[27])}
            >
              <PlayerImage spId={playersRight[27].spId} spRating={playersRight[27].status.spRating} />
              <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                {getPlayerPosition(playersRight[27].spPosition, playerPosition)}
              </div>
              <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                {getPlayerName(playersRight[27].spId, playerNames)}
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Field;
