import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const initChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async ({ chatId, senderId, text }) => {
      try {
        const msg = await Message.create({ chat: chatId, sender: senderId, text });
        await Chat.findByIdAndUpdate(chatId, { lastMessage: msg._id });
        io.to(chatId).emit("message", msg);
        // also notify participants by their userIds
        const chat = await Chat.findById(chatId).populate("participants");
        chat.participants.forEach(p => io.to(p._id.toString()).emit("newMessage", msg));
      } catch (err) {
        console.error("socket sendMessage err:", err.message);
      }
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  });
};
