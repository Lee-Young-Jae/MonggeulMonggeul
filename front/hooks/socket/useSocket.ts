import { useState, useEffect } from "react";
import { socket } from "@/apis/config/socket.io.ts";

export interface EventProps {
  name: string;
  handler(...args: any[]): any;
}

const useSocket = (events: EventProps[]) => {
  useEffect(() => {
    for (const event of events) {
      socket.on(event.name, event.handler);
    }
    return () => {
      for (const event of events) {
        socket.off(event.name);
      }
    };
  }, []);
};

export default useSocket;
