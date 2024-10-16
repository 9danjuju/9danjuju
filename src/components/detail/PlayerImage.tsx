'use client';
import Image from 'next/image';
import { useState } from 'react';

interface PlayerImageProps {
  spId: number;
  spRating: number;
  showRating?: boolean;
  imgWidth?: number;
  imgHeight?: number;
}

const PlayerImage = ({ spId, spRating, showRating = true, imgWidth = 64, imgHeight = 64 }: PlayerImageProps) => {
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
        width={imgWidth}
        height={imgHeight}
        sizes="(max-width: 768px) 100vw, 33vw"
        src={imgSrc}
        onError={handleImgError}
        alt={String(spId)}
      />
      {showRating && (
        <div className="absolute top-[-10px] right-[-2px] bg-zinc-800 text-white p-1 rounded-lg">
          {spRating.toFixed(1)}
        </div>
      )}
    </div>
  );
};

export default PlayerImage;
