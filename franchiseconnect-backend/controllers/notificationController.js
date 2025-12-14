import Notification from "../models/notificationModel.js";

export const listNotifications = async (req, res) => {
  const notifications = await Notification.find({ to: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
};

export const markRead = async (req, res) => {
  const n = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(n);
};
