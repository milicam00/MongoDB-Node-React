import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    creatorId: {        //Kreator posta
        type: String,
        required: true
    },
    creatorName: {
        type: String
    },
    header: {
        type: String,
        required: true,
        max: 100
    },
    data: {             
        type: String,   //Opis zahteva/ponude
        max: 5000,
        default: ""
    },
    isRequest: {
        type: Boolean,
        default: false
    },
    categories: {       //Kategorije pomoci
        type: [String],
        default: []
    },
    city: {             //Grad, obavezan
        type: String,
        required: true
    },
    address: {          //Tacna adresa, nije obavezna
        type: String,
        default: ""
    },
    contact: {          //Brojevi telefona?
        type: String,
        default: ""
    },
    donators: {
        type: Array,
        default: []
    },
    active: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: ""
    }
}, {timestamps: true}
);

export default mongoose.model("Post", PostSchema);