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

/**
 * 날짜를 받아 현재 시간과 비교하여 얼마만큼의 시간이 남았는지 반환하는 함수
 * @param {Date} date - 날짜
 * @returns {string} - 남은 시간
 * @example
 * const date = new Date("2021-08-01T00:00:00");
 * const result = getRemainTime(date);
 * console.log(result); // 1일 12시간 30분
 * console.log(typeof result); // string
 *
 */
export const getRemainTime = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((diff / (1000 * 60)) % 60);

  if (diff < 0) return "만료";

  if (day === 0 && hour === 0) return `${minute}분`;
  if (day === 0) return `${hour}시간 ${minute}분`;

  return `${day}일 ${hour}시간 ${minute}분`;
};

/**
 *  시간을 받아 5분전 10분전 등으로 반환하는 함수
 * @param {string} time - 시간
 * @returns {string} - 5분전 10분전 등
 * @example
 * const time = "2021-08-01T00:00:00";
 * const result = getBeforeTime(time);
 * console.log(result); // 5분전
 * console.log(typeof result); // string
 *
 */
export const getBeforeTime = (time: string): string => {
  const now = new Date();
  const date = new Date(time);
  const diff = now.getTime() - date.getTime();

  const minute = Math.floor(diff / (1000 * 60));

  if (minute < 1) return "방금 전";
  if (minute < 60) return `${minute}분 전`;
  if (minute < 60 * 24) return `${Math.floor(minute / 60)}시간 전`;
  if (minute < 60 * 24 * 30) return `${Math.floor(minute / (60 * 24))}일 전`;
  if (minute < 60 * 24 * 30 * 12)
    return `${Math.floor(minute / (60 * 24 * 30))}달 전`;

  return `${Math.floor(minute / (60 * 24 * 30 * 12))}년 전`;
};
