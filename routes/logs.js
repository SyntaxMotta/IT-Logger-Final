const express = require('express');
const router = express.Router();
const { getLogs, addLog, deleteLog, updateLog } = require('../controllers/Log');

const Log = require('../controllers/Log');

// @route   GET api/logs
// @desc    Get all logs
// @access    Public
router.route('/').get(getLogs).post(addLog);

router.route('/:id').delete(deleteLog).put(updateLog);

module.exports = router;
