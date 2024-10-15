import { FcUser } from './type';

//ouid 조회
export const fetchOuid = async (nickname: string) => {
  try {
    const res = await fetch(`https://open.api.nexon.com/fconline/v1/id?nickname=${nickname}`, {
      method: 'GET',
      headers: {
        'x-nxopen-api-key': process.env.NEXT_PUBLIC_FIFA_API_KEY || ''
      }
    });

    const data: { ouid: string } = await res.json();
    // console.log(data);

    return data.ouid;
  } catch (error) {
    console.error(error);
  }
};

//유저 기본정보 조회
export const fetch9danju = async (nickname: string) => {
  const ouid = await fetchOuid(nickname);
  // console.log('구단 ouid : ', ouid);
  if (!ouid) {
    return;
  }
  const res = await fetch(`https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`, {
    headers: {
      'x-nxopen-api-key': process.env.NEXT_PUBLIC_FIFA_API_KEY || ''
    }
  });
  const user: FcUser = await res.json();
  // console.log(user);

  return user;
};
