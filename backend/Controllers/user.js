import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();

import User from "../Models/User.js";
import Post from "../Models/Post.js";

import { generateAccessToken, generateRefreshToken } from "../Middleware/auth.js";

//Register new user:
export const registerUser = async (req, res) => {
    try {
        //Gererisemo salt i hesiramo sifru:
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Generisemo novog korisnika sa podacima:
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city,
            contact: req.body.contact,
            image: req.body.image
        });

        //Cuvamo korisnika u bazi podataka:
        const savedUser = await newUser.save();

        const token = generateAccessToken(savedUser);
        const refreshToken = generateRefreshToken(savedUser);

        //Vracamo odgovor:
        return res.status(200).json({
            user: savedUser,
            token: token,
            refreshToken: refreshToken
        });
        
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Try to login user:
export const userLogin = async (req, res) => {
    try {
        
        //Pokusavamo da nadjemo korisnika u kolekciji:
        const user = await User.findOne({email:req.body.email});
     
        if(!user)
            return res.status(404).json("User not found!");
         
        //Proveravamo sifru za slucaj da smo pronasli korisnika:
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
            return res.status(400).json("Wrong password!"); //Pravilo problem, vise ne bi trebalo!
        
        //Generisemo tokene:
        const token = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        //Korisnikovi email i sifra se poklapaju, vracamo tokene:
        return res.status(200).json({
            user: user,
            token: token,
            refreshToken: refreshToken
        });

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Upadte existing user:
export const updateUser = async (req, res) => {
    try {

        //const { id } = req.params;
        const { username, email, password, isAdministrator, city, friends, posts, volunteerings, signedUp,contact,image,liked} = req.body;

        const updatedUser = {
            username: username, 
            email: email, 
            password: password, 
            isAdministrator: isAdministrator, 
            city: city, 
            friends: friends, 
            posts: posts, 
            volunteeringse: volunteerings, 
            signedUp: signedUp,
            contact: contact,
            image: image,
            liked: liked,
            _id: req.params.id 
        };

        //{$set: req.body} <-- postavi sve vrednosti koje su poslate preko body-ja kao nove:
        const user = await User.findByIdAndUpdate(req.params.id, updatedUser);
        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json(err);
    }
};

//Delete existnig user:
export const deleteUser = async (req, res) => {
    try {
        const u = await User.findById(req.user.id);
        if(!u)
            return res.status(404).json('No users found!');

        if(req.body.userId === req.params.id || u.isAdministrator) {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted sucessfuly!");
        } 
        else {
            return res.status(403).json("You can delete only your account!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Get user by id:
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json("User not found!");
        //Izdvajamo samo one vrednosti koje zelimo da prikazemo, nema smisla da prikazujemo sifru i slicno:
        //user._doc; <-- promenljiva koja sadrzi sve vrednosti ovog objekta;
        const {_id, password, updatedAt, createdAt, isAdministrator , ...other} = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Add user to friend list:
export const followUser = async (req, res) => {
    //Ne mozemo sami sebe da dodamo za prijatelja!
    if(req.body.userId !== req.params.id){
        try {
            //Osoba koju zelimo da dodamo za prijatelja:
            const user = await User.findById(req.params.id);
            //Nas profil:
            const currentUser = await User.findById(req.body.userId);

            //Ako tu osobu nemamo za prijatelja:
            if(!user.friends.includes(req.body.userId)) {
                //$push:{friends: req.body.userId} <-- u listu prijatelja pokusavamo da ubacimo id neke druge osobe!
                await user.updateOne({$push:{friends: req.body.userId}});
                await currentUser.updateOne({$push:{friends: req.params.id}});

                return res.status(200).json(`You and ${user.username} are now friends!`);
            }
            else {
                return res.status(403).json("You are already friend with this user!");
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can't add yourself to your friend list!");
    }
};

//Remove user from friend list:
export const unfollowUser = async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            //Profil 'prijatelja':
            const user = await User.findById(req.params.id);
            //Nas profil:
            const currentUser = await User.findById(req.body.userId);

            if(!user || !currentUser)
                return res.status(404).json("Can't find one of users!");

            //Samo ako su prijatelji:
            //{$pull:{friends: req.body.userId}} <-- pull koristimo za izvlacenje elementa iz liste!
            if(currentUser.friends.includes(req.params.id)) {
                await user.updateOne({$pull:{friends: req.body.userId}});
                await currentUser.updateOne({$pull:{friends: req.params.id}});

                return res.status(200).json(`You and ${user.username} are not friends anymore!`);
            }
            else {
                return res.status(403).json("You are not friend with this person!");
            }
        
        } catch (err) {
            return res.status(403).json(err);
        }
    }
    else {
        return res.status(403).json("You can't unfriend yourself!");
    }
};

//Get all user-s profiles (admin method):
export const getAllUsers = async (req, res) => {
    try {
        const arr = await User.find();
        if(arr.length <= 0) 
            return res.status(404).json('No users found in database!');
        return res.status(200).json(arr);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//All posts user donated to:
export const postLikeHistory = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        // console.log('Pozvana metoda za lajkove i ')
        if(!user)
            return res.status(404).json('No user with given id in database!');
            
        let arr = [];
        for(let i = 0; i < user.liked.length; i++) {
            const post = await Post.findById(user.liked[i]);
            //ako se desilo da smo lajkovali neki post koji je kasnije obrisan, previse je 
            //truda potrebno da bi ga svuda obrisali, a sa druge strane veoma malo 
            //memorije zauzima taj podatak, pa je ovako jednostavnije po serversku stranu:
            if(post)
                arr.push(post);
        }

        //Ukoliko nema postova
        if(arr.length == 0)
            return res.status(404).json('This user have no lidek posts!');
        
        return res.status(200).json(arr);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Update only profile image:
export const updateProfilePicture = async (req, res) => {
    try {
        if(!req.body.userId)
            return res.status(400).json('No user sent!');
        
        const user = await User.findById(req.body.userId);
        if(!user)
            return res.status(404).json('No user with matching id in database!');

        //Samo vlasnik profila i administrator mogu da ovo izvrse!
        if(req.params.userId === req.body.userId || user.isAdministrator) {
            const updated = await user.updateOne({$set: {image: req.body.image}});
            return res.status(200).json(updated);
        }
        else 
            return res.status(400).json('You can update only yours profile picture!');

    } catch (err) {
        return res.status(500).json(err);
    }
}
 
export default router;