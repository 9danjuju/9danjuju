import Image from 'next/image';

interface PlayerImageProps {
  spId: number;
  spRating: number;
}

const PlayerImage = ({ spId, spRating }: PlayerImageProps) => {
  return (
    <div className="relative flex justify-center item-center">
      <Image
        className="rounded-md object-scale-down"
        width={64}
        height={64}
        sizes="(max-width: 768px) 100vw, 33vw"
        src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`}
        onError={() => console.log('이미지 로드에 실패했습니다.')}
        alt={String(spId)}
      />
      <div className="absolute top-[-10px] right-[-2px] bg-zinc-800 text-white p-1 rounded-lg">
        {spRating.toFixed(1)}
      </div>
    </div>
  );
};

export default PlayerImage;
