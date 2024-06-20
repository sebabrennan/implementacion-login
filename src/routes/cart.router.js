import { Router } from "express";
import { getAll, getById, create, update, remove, addProdToCart, removeProdToCart, updateProdQuantityToCart, clearCart } from "../controllers/cart.controllers.js"

const router = Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

router.post("/:idCart/products/:idProd", addProdToCart);

router.delete("/:idCart/products/:idProd", removeProdToCart);

router.put("/:idCart/products/:idProd", updateProdQuantityToCart);

router.delete("/clear/:idCart", clearCart);

export default router;
