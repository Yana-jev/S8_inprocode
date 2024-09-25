import { Request, Response } from 'express';
import CalendarEvent from '../models/calendar';

export const createEvent = async (req: Request, res: Response) => {
const { title, start, end } = req.body;
try {
   const event = await CalendarEvent.create({ title, start, end });
   res.json(event);
} catch (error) {
   res.status(500).json({ msg: 'Error creating event', error });
}
};

export const getEvents = async (req: Request, res: Response) => {
try {
   const events = await CalendarEvent.findAll();
   res.json(events);
} catch (error) {
   res.status(500).json({ msg: 'Error fetching events', error });
}
};


export const deleteEvent = async (req: Request, res: Response) => {
const { id } = req.params;
try {
   const event = await CalendarEvent.findByPk(id);
   if (!event) {
   return res.status(404).json({ msg: 'Event not found' });
   }
   await event.destroy();
   res.json({ msg: 'Event deleted' });
} catch (error) {
   res.status(500).json({ msg: 'Error deleting event', error });
}
};




export const updateEvent = async (req: Request, res: Response) => {
   const { body } = req;
   const { id } = req.params;

   try {
      const event = await CalendarEvent.findByPk(id);

      if (event) {
         await event.update(body);
         res.json({
            msg: `Event updated successfully`,
            event  
         });
      } else {
         res.status(404).json({
            msg: `No event found with id ${id}`
         });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({
         msg: `An error occurred, please contact support`,
         error  
      });
   }
};