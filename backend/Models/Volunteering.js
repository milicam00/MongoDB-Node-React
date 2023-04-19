import mongoose from "mongoose";

const VolunteeringSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        default: []
    },
    header: {
        type: String,
        max: 50,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: false,
        default: []
    }
}, {timestamps: true}
);

export default mongoose.model("Volunteering", VolunteeringSchema);