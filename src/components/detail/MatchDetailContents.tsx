'use client';

import { DefenceType, PassingType, PlayerMatchDetailType, ShootType } from '@/types/matchType';
import { useState } from 'react';
import DetailGraph from './DetailGraph';
import MatchRateDetail from './MatchRateDetail';

export type DetailButtonsType = Record<'rate' | 'shoot' | 'pass' | 'defence', '평점' | '슈팅' | '패스' | '수비'>;
export type DetailButtonsKeysType = keyof DetailButtonsType;
const DETAIL_BUTTONS: DetailButtonsType = {
  rate: '평점',
  shoot: '슈팅',
  pass: '패스',
  defence: '수비'
} as const;

const MatchDetailContents = ({ matchInfo }: { matchInfo: PlayerMatchDetailType[] }) => {
  const [detailType, setDetailType] = useState<DetailButtonsKeysType>('rate');
  const handleDetailTypeButton = (key: DetailButtonsKeysType) => {
    setDetailType(key);
  };

  const getMatchInfoWithDetailType = (info: PlayerMatchDetailType[]): ShootType[] | PassingType[] | DefenceType[] => {
    switch (detailType) {
      case 'shoot':
        return info.map((data) => data.shoot);
      case 'pass':
        return info.map((data) => data.pass);
      case 'defence':
        return info.map((data) => data.defence);
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-between m-2 px-10 gap-5 text-xl max-w-3xl w-full mx-auto">
        {Object.entries(DETAIL_BUTTONS).map(([key, value]) => {
          const isActive = key === detailType;
          return (
            <button
              key={key}
              onClick={() => handleDetailTypeButton(key as DetailButtonsKeysType)}
              className={`${isActive ? 'bg-black text-white' : 'bg-gray-300 text-black'} rounded-md w-1/4 h-10`}
            >
              {value}
            </button>
          );
        })}
      </div>
      <div className="w-full border-2 border-solid rounded-md border-gray-500 flex flex-col justify-center items-center">
        {detailType === 'rate' ? (
          <MatchRateDetail data={matchInfo} />
        ) : (
          <DetailGraph data={getMatchInfoWithDetailType(matchInfo)} type={detailType} />
        )}
      </div>
    </div>
  );
};

export default MatchDetailContents;
