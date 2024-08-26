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

// ______________or___________
// import mongoose from "mongoose";

// const chatSchema = mongoose.Schema({
//   userId: {
//     type: Number,
//     required: true,
//   },
//   userName: {
//     type: String,
//     required: true,
//   }
// });

// const chatHistorySchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   chats: [chatSchema], // Array of subdocuments
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// export const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);
