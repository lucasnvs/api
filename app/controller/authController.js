const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { username } });
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    const user = await User.create({ username, password });
    res.status(201).json({ token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user.id) });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};