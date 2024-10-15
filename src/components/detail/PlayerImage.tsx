'use client';
import Image from 'next/image';
import { useState } from 'react';

interface PlayerImageProps {
  spId: number;
  spRating: number;
}

const PlayerImage = ({ spId, spRating }: PlayerImageProps) => {
  const [imgSrc, setImgSrc] = useState(
    `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`
  );

  const handleImgError = () => {
    setImgSrc(`/img/anonPlayerImage.png`);
  };
  return (
    <div className="relative flex justify-center item-center">
      <Image
        className="rounded-md object-scale-down"
        width={64}
        height={64}
        sizes="(max-width: 768px) 100vw, 33vw"
        src={imgSrc}
        onError={handleImgError}
        alt={String(spId)}
      />
      <div className="absolute top-[-10px] right-[-2px] bg-zinc-800 text-white p-1 rounded-lg">
        {spRating.toFixed(1)}
      </div>
    </div>
  );
};

export default PlayerImage;
