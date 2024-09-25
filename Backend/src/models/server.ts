import express, {Application, Request, Response} from 'express';
import cors from 'cors'
import routesProducto from '../routes/producto';
import db from '../db/connection';
import routesLocation from '../routes/location';
import calendarRoutes from '../routes/calendar';
import salesDataRoutes from '../routes/grafics';


class Server {

   private app: Application;
   private port: string;

   constructor(){
      
      this.app = express();
      this.port = process.env.PORT || '3001';
      this.listen();
      this.midlewares();
      this.routes();
      this.dbConnect();
      this.app.use('/api/locations', routesLocation);
      this.app.use('/api/grafics', salesDataRoutes);
      this.app.use('/api/calendar', calendarRoutes);
      
   }


   listen(){
      this.app.listen(this.port, ()=>{
         console.log(`Aplicacion corriendo en el puerto ${this.port}`)
      })
   }


   routes(){
      this.app.get('/', (req: Request, res: Response)=>{
         res.json({
            msg: 'api working'
         })

      })
      this.app.use('/api/productos', routesProducto)
   }

   midlewares(){
      this.app.use(express.json());

      //cors
      this.app.use(cors());
   }

   async dbConnect(){

      try {
         await db.authenticate();
         console.log('Base de datos conectada');
   } catch (error) {
         console.error('error al conectarse a base de datos:', error);
   }
   }
}

export default Server;