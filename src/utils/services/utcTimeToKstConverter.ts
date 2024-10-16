export const utcTimeToKstConverter = (time: string) => {
  const utcDate = new Date(time);
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toLocaleString('ko-KR');
};
