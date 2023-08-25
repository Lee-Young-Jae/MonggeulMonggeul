import { socket } from "@/apis/config/socket.io.ts";

const useSocketEmit = () => {
  const emit = (eventName: string, ...args: any[]) => {
    socket.emit(eventName, ...args);
  };

  return { emit };
};

export default useSocketEmit;
