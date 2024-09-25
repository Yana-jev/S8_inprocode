import { DataTypes } from 'sequelize';
import db from '../db/connection';




const CalendarEvent = db.define('CalendarEvent', {
title: {
   type: DataTypes.STRING,
   allowNull: false
},
start: {
   type: DataTypes.DATE,
   allowNull: false
},
end: {
   type: DataTypes.DATE
}},
{
   modelName: 'CalendarEvent',
   tableName: 'calendar'
});

export default CalendarEvent;

