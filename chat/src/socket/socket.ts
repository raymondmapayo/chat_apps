import { io } from "socket.io-client";

// SINGLETON SOCKET INSTANCE (IMPORTANT)
export const socket = io("http://localhost:8081", {
  transports: ["websocket"],
  autoConnect: true,
});
