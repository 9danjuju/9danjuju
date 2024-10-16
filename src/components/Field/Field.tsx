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
    { top: '42%', left: '3%' }, // 0, GK
    { top: '50%', left: '15%' }, // 1 SW
    { bottom: '10%', left: '15%' }, // 2 RWB

    { bottom: '5%', left: '10%' }, // 3, RB
    { bottom: '25%', left: '10%' }, // 4, RCB
    { top: '50%', left: '10%' }, // 5, CB
    { top: '25%', left: '10%' }, // 6, LCB
    { top: '5%', left: '10%' }, // 7, LB

    { top: '10%', left: '15%' }, // 8 LWB

    { bottom: '25%', left: '20%' }, // 9, RDM
    { top: '50%', left: '20%' }, // 10 CDM
    { top: '25%', left: '20%' }, // 11 LDM

    { bottom: '10%', left: '25%' }, // 12 RM
    { bottom: '25%', left: '25%' }, // 13 RCM
    { top: '50%', left: '25%' }, // 14 CM
    { top: '25%', left: '25%' }, // 15 LCM
    { top: '10%', left: '25%' }, // 16 LM

    { bottom: '25%', left: '30%' }, // 17 RAM
    { bottom: '50%', left: '30%' }, // 18 CAM
    { top: '25%', left: '30%' }, // 19 LAM

    { bottom: '33.3%', left: '35%' }, // 20 RF
    { top: '50%', left: '35%' }, // 21 CF
    { top: '33.3%', left: '35%' }, // 22 LF
    { bottom: '10%', left: '35%' }, // 23 RW

    { bottom: '33.3%', left: '39%' }, // 24 RS
    { top: '50%', left: '39%' }, // 25 ST
    { top: '33.3%', left: '39%' }, // 26 LS
    { top: '10%', left: '35%' } // 27 LW
  ];

  const mapPositionRight = [
    { top: '42%', right: '3%' }, // 0, GK
    { top: '50%', right: '15%' }, // 1 SW
    { bottom: '10%', right: '15%' }, // 2 RWB

    { bottom: '5%', right: '10%' }, // 3, RB
    { bottom: '25%', right: '10%' }, // 4, RCB
    { top: '50%', right: '10%' }, // 5, CB
    { top: '25%', right: '10%' }, // 6, LCB
    { top: '5%', right: '10%' }, // 7, LB

    { top: '10%', right: '15%' }, // 8 LWB

    { bottom: '25%', right: '20%' }, // 9, RDM
    { top: '50%', right: '20%' }, // 10 CDM
    { top: '25%', right: '20%' }, // 11 LDM

    { bottom: '10%', right: '25%' }, // 12 RM
    { bottom: '25%', right: '25%' }, // 13 RCM
    { top: '50%', right: '25%' }, // 14 CM
    { top: '25%', right: '25%' }, // 15 LCM
    { top: '10%', right: '25%' }, // 16 LM

    { bottom: '25%', right: '30%' }, // 17 RAM
    { bottom: '50%', right: '30%' }, // 18 CAM
    { top: '25%', right: '30%' }, // 19 LAM

    { bottom: '33.3%', right: '35%' }, // 20 RF
    { top: '50%', right: '35%' }, // 21 CF
    { top: '33.3%', right: '35%' }, // 22 LF
    { bottom: '10%', right: '35%' }, // 23 RW

    { bottom: '33.3%', right: '39%' }, // 24 RS
    { top: '50%', right: '39%' }, // 25 ST
    { top: '33.3%', right: '39%' }, // 26 LS
    { top: '10%', right: '35%' } // 27 LW
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
        <div className="relative w-[1440px] h-[700px] bg-green-950/50 overflow-hidden shadow-lg">
          {/* 중앙 선 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-white"></div>
          </div>

          {/* 중앙 원 */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border-solid border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* 페널티 박스 - 왼쪽 */}
          <div className="absolute top-[50%] left-4 w-32 h-64 border-solid border-2 border-white transform -translate-y-1/2"></div>

          {/* 페널티 박스 - 오른쪽 */}
          <div className="absolute top-[50%] right-4 w-32 h-64 border-solid border-2 border-white transform -translate-y-1/2"></div>

          {/* 골대 - 왼쪽 */}
          <div className="absolute top-[50%] left-2 w-8 h-24 border-solid border-2 border-white transform -translate-y-1/2"></div>

          {/* 골대 - 오른쪽 */}
          <div className="absolute top-[50%] right-2 w-8 h-24 border-solid border-2 border-white transform -translate-y-1/2"></div>

          {/* 왼쪽 팀 포지션들 */}
          {playersLeft.map(
            (player, index) =>
              player && (
                <button
                  key={index}
                  className="absolute transform  text-white p-2 rounded"
                  style={mapPosition[index]}
                  onClick={() => player && openModal(player)}
                >
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} imgWidth={60} imgHeight={60} />
                  <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold text-xs">
                    {getPlayerPosition(player.spPosition, playerPosition)}
                  </div>
                  <div className="bg-zinc-900 text-white p-1 rounded-lg flex justify-center items-center text-xs">
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
                  key={index}
                  className="absolute transform  text-white p-2 rounded"
                  style={mapPositionRight[index]}
                  onClick={() => player && openModal(player)}
                >
                  <PlayerImage spId={player.spId} spRating={player.status.spRating} />
                  <div className="bg-green-800 text-white p-1 rounded-lg flex justify-center items-center font-bold mb-1">
                    {getPlayerPosition(player.spPosition, playerPosition)}
                  </div>
                  <div className="bg-zinc-900 text-white p-1 rounded-lg flex justify-center items-center">
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
