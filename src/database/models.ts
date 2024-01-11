import { DataTypes } from 'sequelize';
import sequelize from '.';

export const Commands = sequelize.define(
  'commands',
  {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  { timestamps: false, indexes: [{ unique: true, fields: ['name'] }] },
);

export const Users = sequelize.define(
  'users',
  {
    id: { primaryKey: true, type: DataTypes.STRING },
    exp: DataTypes.NUMBER,
    lvl: DataTypes.NUMBER,
  },
  { timestamps: false },
);
