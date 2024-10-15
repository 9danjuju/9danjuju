import { PiSpinnerGap } from 'react-icons/pi';

const Loading = () => {
  return (
    <div className="w-sreen min-h-screen flex flex-col justify-center items-center">
      <PiSpinnerGap className="animate-spin mb-10 w-[200px] h-[200px]" />
      <h1>로딩중입니다... 잠시만 기다려주세요.</h1>
    </div>
  );
};

export default Loading;
