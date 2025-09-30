"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { generateRandomCursor } from "../lib/generate-random-cursor";

export type User = {
  socketId: string;
  name: string;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  location: string;
  flag: string;
};

export type Message = {
  socketId: string;
  content: string;
  time: Date;
  username: string;
};

export type UserMap = Map<string, User>;

type SocketContextType = {
  socket: Socket | null;
  users: UserMap;
  setUsers: Dispatch<SetStateAction<UserMap>>;
  msgs: Message[];
};

const INITIAL_STATE: SocketContextType = {
  socket: null,
  users: new Map(),
  setUsers: () => {},
  msgs: [],
};

export const SocketContext = createContext<SocketContextType>(INITIAL_STATE);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<UserMap>(new Map());
  const [msgs, setMsgs] = useState<Message[]>([]);

  // SETUP SOCKET.IO
  useEffect(() => {
    // Only connect if the WebSocket URL is configured
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.log("WebSocket URL not configured - running in offline mode");
      return;
    }

    const username = (typeof window !== 'undefined' ? localStorage.getItem("username") : null) || generateRandomCursor().name;
    const socketInstance = io(wsUrl, {
      query: { username },
    });
    setSocket(socketInstance);
    
    // Type assertion to handle socket.io-client type issues
    const typedSocket = socketInstance as any;
    
    typedSocket.on("connect", () => {
      console.log("Connected to socket server");
    });
    
    typedSocket.on("msgs-receive-init", (msgs: Message[]) => {
      setMsgs(msgs);
    });
    
    typedSocket.on("msg-receive", (msg: Message) => {
      setMsgs((prev) => [...prev, msg]);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket, users, setUsers, msgs }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
