import { DefenceType, ShootType, PassingType } from '@/types/matchType';
import { dataConverter } from '@/utils/services/matchDetailDataConverter';
import { useEffect, useState } from 'react';

type GraphDetailType = {
  data: DefenceType[] | ShootType[] | PassingType[];
  type: 'shoot' | 'pass' | 'defence';
};

type ConverterResultType = {
  content: string;
  percentage: number;
};

type TeamDataType = {
  [key: string]: ConverterResultType;
};

const LIST = {
  shoot: ['전체 슈팅', '헤딩 슛', '프리킥 슛', '박스 안 슛', '중거리 슛', '페널티킥'],
  pass: ['패스', '짧은 패스', '긴 패스', '스루 패스', '로빙 스루 패스', '바운싱 롭 패스', '드리븐 땅볼 패스'],
  defence: ['블록', '태클']
} as const;

const DetailGraph = ({ data, type }: GraphDetailType) => {
  const [teamData, setTeamData] = useState<{
    home: TeamDataType;
    away: TeamDataType;
  }>({
    home: {},
    away: {}
  });

  useEffect(() => {
    setTeamData({
      home: dataConverter(data[0], type),
      away: dataConverter(data[1], type)
    });
  }, [type]);
  return (
    <div className="flex justify-center items-center w-full h-full p-10">
      <div className="flex flex-col justify-center items-end text-black gap-5 w-full h-full">
        {Object.entries(teamData.home).map(([key, value]) => {
          return (
            <div
              className={`${
                value.percentage === 0 ? 'white' : 'bg-blue-300'
              } h-[30px] transform origin-right flex justify-end items-center`}
              key={key}
              style={{
                width: value.percentage === 0 ? '100%' : value.percentage < 30 ? '30%' : `${value.percentage}%`
              }}
            >
              <p className="p-2">
                {value.content} ({value.percentage}%)
              </p>
            </div>
          );
        })}
      </div>
      <div className="mx-8 text-center flex flex-col gap-5 w-1/2 text-black">
        {LIST[type].map((element) => {
          return (
            <p className="text-lg w-full h-[30px] font-semibold" key={element}>
              {element}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 w-full h-full text-black">
        {Object.entries(teamData.away).map(([key, value]) => {
          return (
            <div
              className={`${value.percentage === 0 ? 'white' : 'bg-red-300'} h-[30px] flex justify-start items-center`}
              key={key}
              style={{
                width: value.percentage === 0 ? '100%' : value.percentage < 30 ? '30%' : `${value.percentage}%`
              }}
            >
              <p className="p-2">
                ({value.percentage}%) {value.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailGraph;
