const express = require('express');
const { register, login } = require('../controller/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;