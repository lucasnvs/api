const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  const { email, password, crn, name } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    const user = await User.create({ name, email, password, crn  });
    res.status(201).json({ token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: `Erro ao registrar usuário` });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ token: generateToken(user.id) });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas'});
    }
  } catch (error) {
    res.status(500).json({ message: `Erro ao fazer login` });
  }
};