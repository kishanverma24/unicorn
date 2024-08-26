import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server as SocketIO } from "socket.io";
import { UserRouter } from "./routes/userRoute.js";
import { MessageRouter } from "./routes/messageRoute.js";
import { ChatHistoryRouter } from "./routes/chatHistoryRoute.js";
import "./db.js";
import cors from "cors";
import { verifyUser } from "./middleware/verifyUser.js";

dotenv.config();
const app = express();

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.json({ msg: "hello g!" });
});

app.use("/api/user", UserRouter);
app.use("/api/chathistory", verifyUser, ChatHistoryRouter);
app.use("/api/messages", verifyUser, MessageRouter);

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
