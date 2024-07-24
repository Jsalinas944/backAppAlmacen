import { Router } from "express";
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from "../controllers/product.controller";
import validarToken from "./validar-token";

const router = Router();

router.get('/', validarToken ,getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.post('/', postProduct);
router.put('/:id', updateProduct);

export default router;