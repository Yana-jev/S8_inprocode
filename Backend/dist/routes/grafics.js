"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grafic_1 = require("../controllers/grafic");
const router = (0, express_1.Router)();
router.get('/', grafic_1.getSalesData);
exports.default = router;
