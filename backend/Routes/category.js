import express from "express";
const router = express.Router();

import { createCategory, categoryId, categoryName } from "../Controllers/category.js";

//Ruta za kreiranje nove kategorije:
router.post('/', createCategory);

//Ruta za id kategorije:
router.get('/:type', categoryId);

//Vrati kategoriju prema id-ju:
router.get('/:id/name', categoryName);


export default router;