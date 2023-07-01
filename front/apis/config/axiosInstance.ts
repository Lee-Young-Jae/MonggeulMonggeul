import axios from "axios";

// // axios 전역 설정
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// axios 인스턴스 생성
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
