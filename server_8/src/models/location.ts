import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Location = db.define('Location', {
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
});

export default Location;