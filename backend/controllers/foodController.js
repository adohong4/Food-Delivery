
import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async (req, res) => {
    try {
        let image_filename = "";
        if (req.file) {
            image_filename = req.file.filename;
        } else {
            throw new Error("No file uploaded");
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// all list food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//update food
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        const updates = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        };

        // check new pictures?
        if (req.file) {
            // delete old picture
            fs.unlink(`upload/${food.image}`, () => { })

            updates.image = req.file.filename; // update picture
        }

        // update
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, updates, { new: true });

        res.json({ success: true, message: "Food Updated", data: updatedFood });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

//paginate list food
const paginateFood = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;

    try {
        // Sort by lastest time and paginate
        const orders = await foodModel.find().limit(limit).skip(startIndex);
        const totalFoods = await foodModel.countDocuments();
        const totalPages = Math.ceil(totalFoods / limit);

        res.json({
            success: true,
            data: orders,
            page,
            totalPages,
            totalFoods
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

//search food by name
const searchFoodByName = async (req, res) => {
    try {
        const foodName = req.query.term || '';
        const foods = await foodModel.find({ name: { $regex: foodName, $options: 'i' } })

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            })
        }

        // const filteredFoods = foods.map(food => ({
        //     _id: food._id,

        //     name: food.name,
        //     description: food.description,
        //     price: food.price,
        //     category: food.category
        // }));

        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}


export { addFood, listFood, removeFood, updateFood, paginateFood, searchFoodByName };