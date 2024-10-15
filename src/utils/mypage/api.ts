import { DivisionMeta, FcUser, Rate } from './type';

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

// 유저 등급정보 조회 및 가공
export const fetchRate = async (nickname: string) => {
  const ouid = await fetchOuid(nickname);
  if (!ouid) {
    return;
  }
  try {
    const res = await fetch(`https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${ouid}`, {
      headers: {
        'x-nxopen-api-key': process.env.NEXT_PUBLIC_FIFA_API_KEY || ''
      }
    });

    const divisionMap = await fetchDivisionMeta(); // 등급 메타데이터 호출

    const datas: Rate[] = await res.json();

    const rate = datas // 데이터 가공 시작
      .filter((data) => data.matchType === 50 || 52) // 두개의 매치타입(공식, 감독) 만 사용
      .map((el) => {
        if (el.matchType === 50) {
          return { ...el, matchType: '공식경기' };
        } else {
          return { ...el, matchType: '감독모드' };
        }
      });

    const formattedRate = rate.map((match) => {
      const dateString = match.achievementDate;
      const date = new Date(dateString);
      const formatDate = date.toLocaleDateString('ko-KR');
      return { ...match, division: divisionMap[match.division], achievementDate: formatDate }; // 등급 id 값을 등급명(string)으로 대체, 날짜 형태변환
    });
    return formattedRate;
  } catch (error) {
    console.error(error);
    throw new Error('유저 등급정보 요청 실패');
  }
};

// **등급메타데이터**
export const fetchDivisionMeta = async () => {
  try {
    const res = await fetch('https://open.api.nexon.com/static/fconline/meta/division.json');

    const data: DivisionMeta[] = await res.json();
    const formattedData = data.map((el) => [el.divisionId, el.divisionName]);

    const divisionMap: { [key: number]: string } = Object.fromEntries(formattedData);
    return divisionMap;
  } catch (error) {
    console.error(error);
    throw new Error('등급메타데이터 호출 실패');
  }
};
