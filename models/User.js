import { DataTypes } from "sequelize";

import { sequelize } from "./_db.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "starter",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  { timestamps: true, version: false }
);
