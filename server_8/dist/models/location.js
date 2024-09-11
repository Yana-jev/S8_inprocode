"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Location = connection_1.default.define('Location', {
    idlocation: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'locations',
    timestamps: true
});
exports.default = Location;
