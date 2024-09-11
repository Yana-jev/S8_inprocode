"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationcontroller_1 = require("../controllers/locationcontroller");
const router = (0, express_1.Router)();
router.get('/', locationcontroller_1.getLocations);
router.post('/', locationcontroller_1.postLocation);
router.delete('/:id', locationcontroller_1.deleteLocation);
exports.default = router;
