//Biblioteke:
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

//Rute:
import usersRoute from "./Routes/users.js";
import postRoute from "./Routes/post.js";
import conversationRoute from "./Routes/conversation.js";
import messageRoute from "./Routes/message.js"
import volunteeringRoute from "./Routes/volunteering.js";
import categoryRoute from "./Routes/category.js";


//Omogucavamo rad sa .env fajlovima:
dotenv.config();

//Povezujemo se sa bazom podataka:
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to the database...');
});

//Sama aplikacija:
const app = express();

//Middleware:
//Cors sluzi za dozvolu komunikacije frontend-a s backend-om (whitelist domena koje imaju pristup backend-u)
app.use(cors());
//Za parsovanje POST requesta:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Za sakrivanje podataka iz url-a:
app.use(helmet());
//Za sakrivanje argumenata koje saljemo preko url-a:
app.use(morgan('common'));


//Routes:
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/volunteering", volunteeringRoute);
app.use("/api/category", categoryRoute);

app.listen(8800, () => {
    console.log("Backend server is running...");
});
