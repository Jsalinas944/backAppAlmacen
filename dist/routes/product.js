"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validar_token_1 = __importDefault(require("./validar-token"));
const router = (0, express_1.Router)();
router.get('/', validar_token_1.default, product_controller_1.getProducts);
router.get('/:id', product_controller_1.getProduct);
router.delete('/:id', product_controller_1.deleteProduct);
router.post('/', product_controller_1.postProduct);
router.put('/:id', product_controller_1.updateProduct);
exports.default = router;
