import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Location = db.define('Location', {
   idlocation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   description: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
      tableName: 'locations', 
      timestamps: true 
});

export default Location;