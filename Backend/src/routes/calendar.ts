import { Router } from 'express';
import { createEvent, getEvents, deleteEvent, updateEvent } from '../controllers/calendar';

const router = Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.delete('/:id', deleteEvent);
router.put('/events/:id', updateEvent);

export default router;
