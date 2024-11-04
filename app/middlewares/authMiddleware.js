const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'Não autorizado, token não encontrado' });
  }
};

module.exports = authMiddleware;