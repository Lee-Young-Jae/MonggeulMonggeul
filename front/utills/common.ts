// Date 객체를 받아 년 월 일 오후 오전 몇시 몇분으로 반환하는 함수
export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minute = date.getMinutes();

  const ampm = date.getHours() >= 12 ? "오후" : "오전";

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}시 ${minute}분`;
};
