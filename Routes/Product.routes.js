import { Router } from "express";
import { addProduct, getAllProducts, getSingleProduct } from "../controllers/Products.controllers.js";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";


const router = Router();

router.post('/add-product',checkUserId, addProduct)
router.post("/get-single-product",getSingleProduct)
router.post("/get-all-product",checkUserId ,getAllProducts)

export default router;