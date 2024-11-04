const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'u_id',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'u_nome',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'u_email',
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'u_senha',
  },
  crn: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'u_crn',
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    field: 'u_telefone',
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'u_data_nascimento',
  },
}, {
  tableName: 'usuario',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

User.prototype.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;

// permissionId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   field: 'u_id_permissao',
//   references: {
//     model: 'permissao_acesso',
//     key: 'id_permissao',      
//   },
// },