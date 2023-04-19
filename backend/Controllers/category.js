import express from "express";
const router = express.Router();

import Category from "../Models/Category.js";

//Create new categoy:
export const createCategory = async (req, res) => {
    try {
        //Proveravamo da li mozda kategorija vec postoji?
        const check = await Category.findOne({type: req.body.type});
        if(!check) {
            //Ako ne postoji pravimo novu:
            const category = await new Category(req.body);
            const newCategory = await category.save();
    
            return res.status(200).json(newCategory);
        }
        else {
            //Inace vracamo vec postojecu:
            return res.status(200).json(check);
        }

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Get category id by name:
export const categoryId = async (req, res) => {
    try {
        const check = await Category.findOne({type: req.params.type});
        if(!check)
            return res.status(404).json("Not found!");
        else 
            return res.status(200).json(check._id);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Get category name by id:
export const categoryName = async (req, res) => {
    try {
        const check = await Category.findById(req.params.id);
        if(!check)
            return res.status(404).json("Not found!");
        return res.status(200).json(check.type);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export default router;