"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.deleteEvent = exports.getEvents = exports.createEvent = void 0;
const calendar_1 = __importDefault(require("../models/calendar"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, start, end } = req.body;
    try {
        const event = yield calendar_1.default.create({ title, start, end });
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error creating event', error });
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield calendar_1.default.findAll();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error fetching events', error });
    }
});
exports.getEvents = getEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield calendar_1.default.findByPk(id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        yield event.destroy();
        res.json({ msg: 'Event deleted' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error deleting event', error });
    }
});
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const event = yield calendar_1.default.findByPk(id);
        if (event) {
            yield event.update(body);
            res.json({
                msg: `Event updated successfully`,
                event
            });
        }
        else {
            res.status(404).json({
                msg: `No event found with id ${id}`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `An error occurred, please contact support`,
            error
        });
    }
});
exports.updateEvent = updateEvent;
