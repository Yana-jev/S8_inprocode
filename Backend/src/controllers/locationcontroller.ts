import {Request, Response}from 'express';
import Location from '../models/location';


export const getLocations = async (req: Request, res: Response) => {
   try {
      const locations = await Location.findAll();
      res.json(locations);
   } catch (error){
      res.status(500).json({
         msg: 'Error of get locations', error
      })
   }
};

export const postLocation = async (req: Request, res: Response) => {
   const { latitude, longitude, description } = req.body;
   try {
      const newLocation = await Location.create({ longitude, latitude, description });
      res.json(newLocation);
   } catch (error) {
      console.error('Error while adding location:', error); 
      res.status(500).json({
         msg: 'Error of adding location',
         error
      });
   }
};



export const deleteLocation = async (req: Request, res: Response) =>{
   const {id} = req.params;
   try {
      const location = await Location.findByPk(id);
      if(!location){
         return res.status(404).json({
            msg: 'location is not found'
         });
      }
      await location.destroy();
      res.json({msg: 'location is deleted'})
   } catch(error){
      res.status(500).json({ msg: 'Error of deleting location', error})
   }
}


