import { FcUser } from './type';

//ouid 조회
export const fetchOuid = async (nickname: string) => {
  try {
    const res = await fetch(`https://open.api.nexon.com/fconline/v1/id?nickname=${nickname}`, {
      method: 'GET',
      headers: {
        'x-nxopen-api-key': `test_ff678e92628b4b6a227e041bd6a1676887e31fc28b9612287d3d555427b5fc76efe8d04e6d233bd35cf2fabdeb93fb0d`
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
      'x-nxopen-api-key': `test_ff678e92628b4b6a227e041bd6a1676887e31fc28b9612287d3d555427b5fc76efe8d04e6d233bd35cf2fabdeb93fb0d`
    }
  });
  const user: FcUser = await res.json();
  // console.log(user);

  return user;
};
