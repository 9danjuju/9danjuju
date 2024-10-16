import MatchContainer from '@/components/detail/MatchContainer';
import UserInfoBox from '@/components/detail/UserInfoBox';
interface ParamsType {
  nickname: string;
}
const Detail = ({ params }: { params: ParamsType }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <UserInfoBox nickname={params.nickname} />
      <div className="w-[1440px] flex flex-col justify-center items-center">
        <MatchContainer />
      </div>
    </div>
  );
};

export default Detail;
