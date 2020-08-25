const express = require('express');
const router = express.Router();
const { getTechs, addTech, deleteTech } = require('../controllers/Tech');

const Tech = require('../controllers/Tech');

// @route   GET api/logs
// @desc    Get all logs
// @access    Public
router.route('/').get(getTechs).post(addTech);

router.route('/:id').delete(deleteTech);

module.exports = router;
