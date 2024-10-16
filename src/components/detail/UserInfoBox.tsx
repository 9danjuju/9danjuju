import { getFifaUserInfo } from '@/utils/server-action';
import { utcTimeToKstConverter } from '@/utils/services/utcTimeToKstConverter';
import Image from 'next/image';

const UserInfoBox = async ({ nickname }: { nickname: string }) => {
  const userData = await getFifaUserInfo(nickname);
  return (
    <div className="bg-gray-200 flex justify-center items-center m-2 p-5 max-w-[1440px] w-full mx-auto">
      {userData ? (
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-center justify-center w-1/2">
            <Image src={'/img/anonPlayerImage.png'} width={100} height={100} alt="profile" />
            <h1 className="text-2xl">{userData.nickname}</h1>
            <p>Level: {userData.level}</p>
          </div>

          <div className="flex flex-col justify-center items-end">
            {userData.maxDivision.map((division) => {
              return (
                <div key={division.achievementDate} className="mt-5">
                  <p>
                    {division.matchType}: {division.division}
                  </p>
                  <p>최고 티어 달성일: {utcTimeToKstConverter(division.achievementDate)}</p>
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
  );
};

export default UserInfoBox;
