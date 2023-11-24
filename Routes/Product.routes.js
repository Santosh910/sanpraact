import { Router } from "express";
import { addProduct, filterProducts, getAllProducts, getSingleProduct } from "../controllers/Products.controllers.js";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";


const router = Router();

router.post('/add-product',checkUserId, addProduct)
router.post("/get-single-product",getSingleProduct)
router.get("/get-all-product",getAllProducts)
router.post("/filter-products",filterProducts)

export default router;