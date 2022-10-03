const express = require('express');
const router = express.Router();
const Ctrl = require('../controller/controller');

// GET all posts
router.get('/', Ctrl.index)

// POST new post
router.post('/', Ctrl.create)

module.exports = router;