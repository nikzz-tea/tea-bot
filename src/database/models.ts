import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export const Commands = sequelize.define(
  'commands',
  {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  { timestamps: false, indexes: [{ unique: true, fields: ['name'] }] },
);

interface UserAttributes {
  id: string;
  exp: number;
  lvl: number;
}

export class Users extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public exp!: number;
  public lvl!: number;
}

Users.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lvl: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize, modelName: 'users', timestamps: false },
);
