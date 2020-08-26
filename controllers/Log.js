const Log = require('../models/Log');

// @route   GET api/logs
// @desc    GET all logs
// @access    Public
exports.getLogs = async (req, res, next) => {
  try {
    const logs = await Log.find();

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @route   Add api/logs
// @desc    POST new log
// @access    Public
exports.addLog = async (req, res, next) => {
  try {
    const { tech, message, attention } = req.body;

    const log = await Log.create(req.body);

    return res.status(201).json({
      success: true,
      data: log,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @route   DELETE api/logs/:id
// @desc    DELETE log
// @access    Public
exports.deleteLog = async (req, res, next) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        error: 'No Log found',
      });
    }

    await log.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.updateLog = async (req, res, next) => {
  const { tech, message, attention } = req.body;

  const logFields = {};
  if (tech) logFields.tech = tech;
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;

  const options = { new: true };

  try {
    let log = await Log.findById(req.params._id);

    if (!log) {
      return res.status(404).json({
        success: false,
        error: 'No Log found',
      });
    }

    log = await Log.findByIdAndUpdate(req.params._id, logFields, options);

    return res.status(201).json({
      success: true,
      data: logFields,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
