import { Router } from 'express';
import { createEvent, getEvents, deleteEvent } from '../controllers/calendar';

const router = Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.delete('/:id', deleteEvent);

export default router;
