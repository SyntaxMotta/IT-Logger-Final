const Tech = require('../models/Tech');

// @route   GET api/techs
// @desc    GET all techs
// @access    Public
exports.getTechs = async (req, res, next) => {
  try {
    const techs = await Tech.find();

    return res.status(200).json({
      success: true,
      count: techs.length,
      data: techs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @route   Add api/techs
// @desc    POST new tech
// @access    Public
exports.addTech = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    const tech = await Tech.create(req.body);

    return res.status(201).json({
      success: true,
      data: tech,
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

// @route   DELETE api/techs/:id
// @desc    DELETE tech
// @access    Public
exports.deleteTech = async (req, res, next) => {
  try {
    const tech = await Tech.findById(req.params.id);

    if (!tech) {
      return res.status(404).json({
        success: false,
        error: 'No tech found',
      });
    }

    await tech.remove();

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
