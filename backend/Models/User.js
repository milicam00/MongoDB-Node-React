//Konekcija sa bazom podataka:
import mongoose from "mongoose";

//Kreiramo model korisnika (registrovanog):
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    isAdministrator: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        max: 50
    },
    friends: {
        type: Array,
        default: []
    },
    posts: {
        type: Array,
        default: []
    },
    volunteerings: {
        type: Array,
        default: []
    },
    signedUp: {
        type: Array,
        default: []
    },
    contact: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    liked: {
        type: Array,
        default: []
    }
}, {timestamps: true}  //Vreme kreiranja/poslednje promene
);

export default mongoose.model("User", UserSchema);