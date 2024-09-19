import { DataTypes } from 'sequelize';
import db from '../db/connection';


const GraficSales = db.define('GraficSales', {
id: {
   type: DataTypes.INTEGER,
   autoIncrement: true,
   primaryKey: true,
},
month: {
   type: DataTypes.STRING,
},
avg_temp: {
   type: DataTypes.FLOAT,
},
sales: {
   type: DataTypes.INTEGER,
},
}, {
tableName: 'sales',
timestamps: false,  
});

export default GraficSales;
