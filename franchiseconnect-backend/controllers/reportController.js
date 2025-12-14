import Report from "../models/reportModel.js";

export const createReport = async (req, res) => {
  const rep = await Report.create({ reporter: req.user.id, ...req.body });
  res.status(201).json(rep);
};

export const listReports = async (req, res) => {
  const reports = await Report.find().populate("reporter","name email");
  res.json(reports);
};
