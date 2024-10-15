import MatchContainer from '@/components/detail/MatchContainer';
import { getFifaUserInfo } from '@/utils/server-action';

interface ParamsType {
  nickname: string;
}

// 매치 디테일 데이터의 spId로 선수 이름 가져오기
// export const getPlayerName = (spId: number, playerNames: { id: number; name: string }[]) => {
//   const player = playerNames.find((pl) => Number(pl.id) === Number(spId));
//   return player ? player.name.split(/[\s-]+/).pop() : '선수 이름 없음';
// };

// 매치 디테일 데이터의 spPosition으로 선수 포지션 가져오기
// export const getPlayerPosition = (spPosition: number, playerPosition: SppositionType[]) => {
//   const positionName = playerPosition.find((pp) => pp.spposition === spPosition);
//   return positionName ? positionName.desc : '포지션 이름 없음';
// };

const Detail = async ({ params }: { params: ParamsType }) => {
  const userData = await getFifaUserInfo(params.nickname);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-200 flex justify-center items-center m-2 p-5 max-w-3xl w-full mx-auto">
        {userData ? (
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl">{userData.nickname}</h1>
              <p>Level: {userData.level}</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              {userData.maxDivision.map((division) => {
                return (
                  <div key={division.achievementDate}>
                    <p>
                      {division.matchType}: {division.division}
                    </p>
                    <p>최고 티어 달성일: {new Date(division.achievementDate).toLocaleString('ko-KR')}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <h1>닉네임정보없음</h1>
            <p>레벨정보없음</p>
          </>
        )}
      </div>
      <div className="container w-full px-20 flex flex-col justify-center items-center">
        <MatchContainer />
      </div>
    </div>
  );
};

export default Detail;
