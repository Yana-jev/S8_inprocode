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
exports.deleteLocation = exports.postLocation = exports.getLocations = void 0;
const location_1 = __importDefault(require("../models/location"));
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield location_1.default.findAll();
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error of get locations', error
        });
    }
});
exports.getLocations = getLocations;
const postLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, description } = req.body;
    try {
        const newLocation = yield location_1.default.create({ longitude, latitude, description });
        res.json(newLocation);
    }
    catch (error) {
        console.error('Error while adding location:', error);
        res.status(500).json({
            msg: 'Error of adding location',
            error
        });
    }
});
exports.postLocation = postLocation;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const location = yield location_1.default.findByPk(id);
        if (!location) {
            return res.status(404).json({
                msg: 'location is not found'
            });
        }
        yield location.destroy();
        res.json({ msg: 'location is deleted' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Error of deleting location', error });
    }
});
exports.deleteLocation = deleteLocation;
