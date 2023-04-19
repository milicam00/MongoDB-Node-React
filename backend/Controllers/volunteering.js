import express from "express";
const router = express.Router();

import User from "../Models/User.js";
import Volunteering from "../Models/Volunteering.js";
import Category from "../Models/Category.js";


//Ne eksportuju se, samo se zovu kao pomocne metode:

//Return array of categories id-s:
const findCategorisIds = async (array) => {
    let categories = [];
    for(let i = 0; i < array.length; i++) {
        const category = await Category.findOne({type: array[i]});
        if(category)
            categories.push(category._id);
    }
    return categories;
};

//Get array of User objects:
const findUsersProfiles = async (array) => {
    let profiles = [];
    for(let i = 0; i < array.length; i++) {
        const user = await User.findById(array[i]);
        if(user)
            profiles.push(user);
    }
    return profiles;
};

//Create new Volunteernig object:
export const createVolunteering = async (req, res) => {
    try {
        const creator = await User.findById(req.body.creatorId);
        if(!creator)
            return res.status(404).json("User not found!");
        
        const vol = await new Volunteering({
            creatorId: creator._id,
            header: req.body.header,
            time: req.body.time,
            place: req.body.place,
            address: req.body.address
        });
        //Cuvamo volontiranje:
        const savedVol = await vol.save();

        //Ne koristimo vise:
        //Ako je poslao kategorije uopste?
        // if(req.body.categories) {
        //     //Vracamo id-jeve kategorija:
        //     const categoriesIds = await findCategorisIds(req.body.categories);
        //     await savedVol.updateOne({category: categoriesIds});
        // }

        // await creator.updateOne({$push:{volunteerings: savedVol._id}});
        //Sacuvano je sve!
        return res.status(200).json(savedVol);
    
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Apply to Volunteering:
export const registerToVolunteer = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const vol = await Volunteering.findById(req.params.volId);
        if(!user || !vol) 
            return res.status(404).json("User or Volunteering not found!");

        //Ukoliko je vec prijavljen i opet pozove ovu metodu, samo ce da se odjavi sa volontiranja:
        if(vol.users.includes(user._id)) {
            await vol.updateOne({$pull:{users: user._id}});
            await user.updateOne({$pull:{signedUp: vol._id}});

            return res.status(200).json("You are succesfully unsubscribed!");
        }
        
        if(vol.creatorId === user._id)
            return res.status(400).json("You cannot apply to voluntee to your own post!");

        //Dodajemo id korisnika koji se prijavio za volontiranje u listu:
        await vol.updateOne({$push:{users: user._id}});
        await user.updateOne({$push:{signedUp: vol._id}});

        return res.status(200).json("Thank you for applying to volunteering!");

    } catch (err) {
        return res.status(200).json(err);
    }
};

//Return all User-s registred to Volunteernig:
export const allRegistred = async (req, res) => {
    try {
        const vol = await Volunteering.findById(req.params.id);
        if(!vol)
            return res.staus(404).json("Volunteering not found!");
        
        if(vol.users.length === 0)
            return res.status(200).json("No users registred yet!");

        const usersProfiles = await findUsersProfiles(vol.users, res);
        let returnData = [];

        //Vracamo samo podatke koje zelimo da prikazemo korisnicima ili koje mozemo da koristimo na frontend-u:
        for(let i = 0; i < usersProfiles.length; i++) {
            const { password, updatedAt, createdAt, isAdministrator, friends, posts, volunteerings, signedUp,  ...other } = usersProfiles[i]._doc;
            returnData[i] = other;
        }

        return res.status(200).json(returnData);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Retust all User Volunteernigs:
export const getAllVolunteernigs = async (req, res) => {
    try {
        
        let arr = await Volunteering.find({creatorId: req.params.userId});

        if(arr.length === 0) {
            return res.status(404).json("There are no objects that meet the criteria!");
        }

        return res.status(200).json(arr);
    
    } catch (err) {
        return res.status(500).json(err);
    }
};  

//Kontroler:
//Get all Volunteernig-s objects:
export const getAll = async (req, res) => {
    try {
        const all = await Volunteering.find();

        return res.status(200).json(all);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

//Ne koristimo vise:
// //Metoda za vracanje svih volontiranja sa datom kategorijom:
// export const findByCategories = async (req, res) => {
//     try {
//         //Proveravamo da li smo poslali uslove za filtriranje?
//         if(!req.body.categories)
//             return res.status(400).json("No parameters set!");
        
//         //Vracamo id-jeve svih kategorija:
//         let categoriesIds = [];
//         categoriesIds = await findCategorisIds(req.body.categories);
        
//         let allVolunteernigsIds = [];       //Za cuvanje id-jeva vec pronadjenih objekta
//         let allVolunteernigsObjects = [];   //Za cuvanje odgovarajucih objekta

//         //Filtriramo samo unique vrednosti:
//         for(let i = 0; i < categoriesIds.length; i++) {
//             //Vracamo sve koji imaju ovu kategoriju:
//             let firstArray = await Volunteering.find({category: categoriesIds[i]});

//             for(let j = 0; j < firstArray.length; j++) {    //Ovde su svi sa tipom npr "Novac"
//                 if(await !isIncluded(allVolunteernigsIds, firstArray[j])) {     //Proveravamo da li smo sacuvali ovo volontiranje ili ne?
//                     await allVolunteernigsIds.push(firstArray[j]._id);           //Inace cuvamo id kao upotrebljen!
//                     await allVolunteernigsObjects.push(firstArray[j]);        //A cuvamo i objekat da ne bi morali opet da ih pretrazujemo!
//                 }
//             }
//         }

//         if(allVolunteernigsObjects.length === 0)
//             return res.status(404).json("There are no objects that meet the criteria!");
//         else 
//             return res.status(200).json(allVolunteernigsObjects);
        
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// };


export const updateVolunteernig = async (req, res) => {
    try {
        //Proveravamo da li je korisnik uopste prosledjen:
        if(!req.body.userId)
            return res.status(404).json('No user attached!');


        //Uzimamo korisnika i volontiranje iz baze:
        const vol = await Volunteering.findById(req.params.postId);
        if(!vol)
            return res.status(404).json('No volunteernig with same id in database!');
        
        const user = await User.findById(req.body.userId);
        if(!user)
            return res.status(404).json('No user with same id in database!');

        //Inace postoje, sad proveravamo da li korisnik koji pokusava da izvrsi update ima
        //pravo da to i uradi?
        //Samo svoje postove mozemo da editujemo, ili kao administrator:
        if(vol.creatorId === req.body.userId || user.isAdministrator) {
            const {userId, ...other} = req.body;
            const saved = await vol.updateOne({$set: other});
            return res.status(200).json(saved);
        } else {
            return res.status(400).json('You can update only volunteernigs you created!');
        }

    } catch (err) {
        return res.status(500).json(err);
    }
};

export const deleteVolunteernig = async (req, res) => {
    try {

        //Proveravamo da li je poslat uopste id korisnika koji pokusava da obrise volontiranje:
        if(!req.user.id)
            return res.status(400).json('No user attached!');

        //Uzimamo volontiranje i korisnika iz baze i proveravamo da li imaju dozvole za ovu
        //operaciju:
        const vol = await Volunteering.findById(req.params.volunteernigId);

        if(!vol)
            return res.status(404).json('No volunteering with given id in database!');
        
        const user = await User.findById(req.user.id);
        if(!user) 
            return res.status(404).json('No user with given id in database!');

        //Proveravamo da li korisnik sme da obrise volontiranje:
        if(vol.creatorId === req.user.id || user.isAdministrator) {
            const rs = await Volunteering.findByIdAndDelete(req.params.volunteernigId);
            return res.status(200).json(rs);
        } else {
            return res.status(400).json('You can only delete volunteerings you created!');
        }

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Proverava da li je argument seccond deo liste first, zbog asinhronih poziva nekako sam morao
//da se snadjem:
export const isIncluded = async (first, seccond) => {
    if(first.includes(seccond)) return true;
    return false;
};

export default router;