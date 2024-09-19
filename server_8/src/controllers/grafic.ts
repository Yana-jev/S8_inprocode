import { Request, Response } from 'express';
import GraficSales from '../models/grafic';


export const getSalesData = async (req: Request, res: Response) => {
try {
   const data = await GraficSales.findAll();  
   res.json(data);
} catch (error) {
   console.error(error);
   res.status(500).json({
   msg: 'Error of get data',
   });
}
};
