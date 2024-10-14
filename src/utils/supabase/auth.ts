import browserClient from './client';

export const getUserInfo = async () => {
  try {
    const res = await browserClient.auth.getUser();
    const data = res.data.user;
    // console.log('user : ', res);

    return data;
  } catch (error) {
    console.error(error);
  }
};
