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


// import { Model, DataTypes } from 'sequelize';
// import db from '../db/connection';

// export interface ICalendarEvent extends Model {
//    id?: number; 
//    title: string;
//    start: Date;
//    end?: Date; 
// }


// const CalendarEvent = db.define<ICalendarEvent>('CalendarEvent', {
//    title: {
//       type: DataTypes.STRING,
//       allowNull: false
//    },
//    start: {
//       type: DataTypes.DATE,
//       allowNull: false
//    },
//    end: {
//       type: DataTypes.DATE
//    }
// }, {
//    modelName: 'CalendarEvent',
//    tableName: 'calendar'
// });

// export default CalendarEvent;
