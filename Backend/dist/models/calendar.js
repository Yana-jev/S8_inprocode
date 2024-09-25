"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const CalendarEvent = connection_1.default.define('CalendarEvent', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    start: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    modelName: 'CalendarEvent',
    tableName: 'calendar'
});
exports.default = CalendarEvent;
