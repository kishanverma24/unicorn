import { ChatHistory } from "../models/chatHistoryModel.js"; // Adjust the path as needed
export const getChatHistory = async (req, res) => {
  try {
    // console.log(req.userid);

    // Find the chat history document
    const chatHistory = await ChatHistory.findOne({ user: req.userid });

    if (!chatHistory) {
      // throw new Error("Chat history not found");

      return res
        .json({ message: "Chat history not found", status: true })
        .status(200);
    }
    return res.json({ chatHistory, status: true }).status(200);
  } catch (error) {
    console.error("Error adding chat to history:", error);
    throw error;
  }
};
export const addChatToHistory = async (req, res) => {
  // console.log(req.body);
  const { newChat } = req.body; // username,userid

  // here new chat is an object which has keys named userId and userName
  try {
    // Find the chat history document
    const chatHistory = await ChatHistory.findOne({ user: req.userid });

    if (!chatHistory) {
      // throw new Error("Chat history not found");
      const user = await ChatHistory.create({
        user: req.userid,
        chats: [newChat],
      });
      return res.json({ user });
    }

    // Check if the chat already exists
    const chatExists = chatHistory.chats.some(
      (chat) => chat.userId.toString() === newChat.userId.toString()
    );

    if (chatExists) {
      // Remove existing chat if it exists
      chatHistory.chats = chatHistory.chats.filter(
        (chat) => chat.userId.toString() !== newChat.userId.toString()
      );
    }

    // Add the new chat to the end of the array
    chatHistory.chats.push(newChat);

    // Save the updated chat history
    await chatHistory.save();

    return res.json({ message: "added success", success: true });
  } catch (error) {
    console.error("Error adding chat to history:", error);
    throw error;
  }
};

export const deleteChat = async (req, res) => {
  const { chatUserId } = req.body;

  try {
    // Find the ChatHistory document for the given user
    const chatHistory = await ChatHistory.findOne({ user: req.userid });

    if (!chatHistory) {
      return res
        .status(404)
        .json({ message: "Chat history not found for this user." });
    }

    // Remove the chat with the specified chatUserId
    const updatedChats = chatHistory.chats.filter(
      (chat) => chat.userId.toString() !== chatUserId
    );

    // Update the ChatHistory document
    chatHistory.chats = updatedChats;
    await chatHistory.save();

    return res
      .status(200)
      .json({ message: "Chat deleted successfully.", success: "true" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// export const updateUnreadChats = async (req, res) => {
//   const { userId, chatUserId } = req.params;
//   const { unreadChats } = req.body;

//   try {
//     // Find the ChatHistory document for the given user
//     const chatHistory = await ChatHistory.findOne({ user: userId });

//     if (!chatHistory) {
//       return res
//         .status(404)
//         .json({ message: "Chat history not found for this user." });
//     }

//     // Find the chat entry for the specified chatUserId
//     const chatEntry = chatHistory.chats.find(
//       (chat) => chat.userId.toString() === chatUserId
//     );

//     if (!chatEntry) {
//       return res
//         .status(404)
//         .json({ message: "Chat entry not found for this user." });
//     }

//     // Update the unreadChats count
//     chatEntry.unreadChats = unreadChats;
//     await chatHistory.save();

//     return res
//       .status(200)
//       .json({ message: "Unread chats updated successfully." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };
