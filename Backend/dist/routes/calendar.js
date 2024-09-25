"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendar_1 = require("../controllers/calendar");
const router = (0, express_1.Router)();
router.post('/', calendar_1.createEvent);
router.get('/', calendar_1.getEvents);
router.delete('/:id', calendar_1.deleteEvent);
exports.default = router;
