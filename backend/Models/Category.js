import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            "Novac",
            "Hrana",
            "Odeca",
            "Lekovi",
            "Zdravlje",
            "Higijena",
            "Krv",
            "Edukacija",
            "Briga",
            "Drugo"
        ]
    }
}, {timestamps: true});

export default mongoose.model("Category", CategorySchema);