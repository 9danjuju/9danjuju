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

  const mapPosition = [
    { top: '50%', left: '3%' }, // 0, GK
    { top: '50%', left: '15%' }, // 1
    { top: '10%', left: '15%' }, // 2
    { bottom: '10%', left: '10%' }, // 3
    { bottom: '25%', left: '10%' }, // 4
    { top: '50%', left: '10%' }, // 5
    { top: '25%', left: '10%' }, // 6
    { top: '10%', left: '10%' }, // 7
    { top: '25%', left: '10%' }, // 8
    { top: '50%', left: '10%' }, // 9
    { top: '50%', left: '15%' }, // 10
    { top: '10%', left: '15%' }, // 11
    { top: '10%', left: '25%' }, // 12
    { bottom: '10%', left: '25%' }, // 13
    { top: '25%', left: '25%' }, // 14
    { top: '50%', left: '25%' }, // 15
    { top: '25%', left: '30%' }, // 16
    { top: '50%', left: '30%' }, // 17
    { bottom: '25%', left: '30%' }, // 18
    { top: '50%', left: '30%' }, // 19
    { top: '10%', left: '35%' }, // 20
    { top: '50%', left: '35%' }, // 21
    { top: '33.3%', left: '35%' }, // 22
    { bottom: '33.3%', left: '35%' }, // 23
    { bottom: '10%', left: '35%' }, // 24
    { top: '33.3%', left: '40%' }, // 25
    { top: '50%', left: '40%' }, // 26
    { bottom: '33.3%', left: '40%' } // 27
  ];

  const mapPositionRight = [
    { top: '50%', right: '3%' }, // 0, GK
    { top: '50%', right: '15%' }, // 1
    { top: '10%', right: '15%' }, // 2
    { bottom: '10%', right: '10%' }, // 3
    { bottom: '25%', right: '10%' }, // 4
    { top: '50%', right: '10%' }, // 5
    { top: '25%', right: '10%' }, // 6
    { top: '10%', right: '10%' }, // 7
    { top: '25%', right: '10%' }, // 8
    { top: '50%', right: '10%' }, // 9
    { top: '50%', right: '15%' }, // 10
    { top: '10%', right: '15%' }, // 11
    { top: '10%', right: '25%' }, // 12
    { bottom: '10%', right: '25%' }, // 13
    { top: '25%', right: '25%' }, // 14
    { top: '50%', right: '25%' }, // 15
    { top: '25%', right: '30%' }, // 16
    { top: '50%', right: '30%' }, // 17
    { bottom: '25%', right: '30%' }, // 18
    { top: '50%', right: '30%' }, // 19
    { top: '10%', right: '35%' }, // 20
    { top: '50%', right: '35%' }, // 21
    { top: '33.3%', right: '35%' }, // 22
    { bottom: '33.3%', right: '35%' }, // 23
    { bottom: '10%', right: '35%' }, // 24
    { top: '33.3%', right: '40%' }, // 25
    { top: '50%', right: '40%' }, // 26
    { bottom: '33.3%', right: '40%' } // 27
  ];

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
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border-solid border-2 border-white rounded-full transform -translate-x-1/2 "></div>
          {/* 페널티 박스 - 왼쪽 */}
          <div className="absolute top-1/2 transform  left-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 페널티 박스 - 오른쪽 */}
          <div className="absolute top-1/2 transform  right-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 골대 - 왼쪽 */}
          <div className="absolute top-1/2 transform  left-2 w-8 h-24 border-solid border-2 border-white"></div>
          {/* 골대 - 오른쪽 */}
          <div className="absolute top-1/2 transform  right-2 w-8 h-24 border-solid border-2 border-white"></div>

          {/* 왼쪽 팀 포지션들 */}
          {playersLeft.map(
            (player, index) =>
              player && (
                <button
                  className="absolute transform  text-white p-2 rounded"
                  style={mapPosition[index]}
                  onClick={() => player && openModal(player)}
                >
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} />
                  <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold">
                    {getPlayerPosition(player.spPosition, playerPosition)}
                  </div>
                  <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                    {getPlayerName(player.spId, playerNames)}
                  </div>
                </button>
              )
          )}

          {/* 오른쪽 팀 포지션들 */}
          {playersRight.map(
            (player, index) =>
              player && (
                <button
                  className="absolute transform  text-white p-2 rounded"
                  style={mapPositionRight[index]}
                  onClick={() => player && openModal(player)}
                >
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} />
                  <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                    {getPlayerPosition(player.spPosition, playerPosition)}
                  </div>
                  <div className="bg-zinc-800 text-white p-1 rounded-lg flex justify-center items-center">
                    {getPlayerName(player.spId, playerNames)}
                  </div>
                </button>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Field;
