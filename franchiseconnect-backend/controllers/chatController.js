import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const createOrGetChat = async (req, res) => {
  try {
    const { participantId } = req.body;
    const userId = req.user.id;
    let chat = await Chat.findOne({ participants: { $all: [userId, participantId] }});
    if (!chat) chat = await Chat.create({ participants: [userId, participantId] });
    res.json(chat);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const msg = await Message.create({ chat: chatId, sender: req.user.id, text });
    await Chat.findByIdAndUpdate(chatId, { lastMessage: msg._id });
    res.status(201).json(msg);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId }).populate("sender","name email");
    res.json(messages);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
