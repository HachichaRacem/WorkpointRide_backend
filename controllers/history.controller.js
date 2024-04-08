const History = require ('../models/history.model');

// Controller functions for handling history CRUD operations
exports.getAllHistories = async (req, res) => {
  try {
    const histories = await History.find();
    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHistory = async (req, res) => {
  const history = new History(req.body);
  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHistoryById = async (req, res) => {
  try {
    const history = await History.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHistoryById = async (req, res) => {
  try {
    const history = await History.findByIdAndDelete(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.json({ message: 'History deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
