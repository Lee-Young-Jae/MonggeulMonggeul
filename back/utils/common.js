/**
 * 해시 값을 기반으로 랜덤한 코드를 생성합니다.
 * @param {string} hash 해시 값
 * @param {number} length 코드 길이
 * @returns {string}
 */
const generateRandomCode = (hash, length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";

  // 해시 값을 숫자로 변환하여 시드(seed)로 사용합니다.
  let seed = 0;
  for (let i = 0; i < hash.length; i++) {
    seed += hash.charCodeAt(i);
  }

  // 시드를 기반으로 난수를 생성하여 랜덤한 코드를 생성합니다.
  for (let i = 0; i < length; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const index = Math.floor((seed / 233280) * characters.length);
    randomCode += characters.charAt(index);
  }

  return randomCode;
};

module.exports = {
  generateRandomCode,
};
