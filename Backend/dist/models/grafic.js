"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const GraficSales = connection_1.default.define('GraficSales', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    month: {
        type: sequelize_1.DataTypes.STRING,
    },
    avg_temp: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    sales: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    tableName: 'sales',
    timestamps: false,
});
exports.default = GraficSales;
