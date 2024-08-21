import mongoose from "mongoose";

const chatHistorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chats: [
      //chats means to whom the current user is chatting
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: {
          type: String,
          required: true,
        },
        // unreadChats: {
        //   type: Number,
        // },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);
