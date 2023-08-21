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

export const formatMinute = (minute: number) => {
  const hour = Math.floor(minute / 60);
  const min = minute % 60;

  if (hour === 0) return `${min}분`;
  else return `${hour}시간 ${min}분`;
};

/**
 *  시간의 합을 구하는 함수
 * @param {string} time1 - 시간1
 * @param {string} time2 - 시간2
 * @returns {string} - 시간1 + 시간2
 */
export const addTime = (time1: string, time2: string) => {
  const [hour1, minute1] = time1.split(":").map((time) => Number(time));
  const [hour2, minute2] = time2.split(":").map((time) => Number(time));

  const hour = hour1 + hour2;
  const minute = minute1 + minute2;

  return `${hour}:${minute}`;
};

/**
 * 날짜와 분을 받아 합친 날짜를 반환하는 함수
 * @param {Date} date - 날짜
 * @param {number} minute - 분
 * @returns {Date} - 날짜 + 분
 * @example
 * const date = new Date("2021-08-01T00:00:00");
 * const minute = 30;
 * const result = addMinute(date, minute);
 * console.log(result); // 2021-08-01T00:30:00
 * console.log(result instanceof Date); // true

  */
export const addMinute = (date: Date, minute: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minute);
  return result;
};
