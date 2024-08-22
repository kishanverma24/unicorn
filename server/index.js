import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import { UserRouter } from "./routes/userRoute.js";
import { MessageRouter } from "./routes/messageRoute.js";
import { ChatHistoryRouter } from "./routes/chatHistoryRoute.js";
import "./db.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "hello g!" });
});

app.use("/api/user", UserRouter);
app.use("/api/chathistory", ChatHistoryRouter);
app.use("/api/messages", MessageRouter);

const server = app.listen(5000, () => {
  console.log("Server started!");
});

const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
