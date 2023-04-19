import express from "express";
const router = express.Router();

import User from "../Models/User.js";
import Post from "../Models/Post.js";
import Category from "../Models/Category.js";

//Method for extracting Donation id by array of donation name:
const findCategorisIds = async (array, res) => {

    let categories = [];
    for(let i = 0; i < array.length; i++) {
        const category = await Category.findOne({type: array[i]});
        if(category)
            categories.push(category._id);
    }
    return categories;
};


const nadjiIdKategorije= async (cat, res) => {

    let category;
    category = await Category.findOne({type: cat});
    return category._id;
};


//Metoda za kreiranje novog posta/donacije:
//Sami podaci se salju preko body-ja, ali posto moramo da budemo autorizovani, moramo
//Da posaljemo i token preko header-a:
export const createPost = async (req, res) => {
    try {
        const creator = await User.findById(req.body.creatorId);
        if(!creator)
           return res.status(404).json("User not found!");

        //Kreiramo novi post na osnovu podataka koji postoje:
        const newPost = new Post({
            creatorId: creator._id,
            header: req.body.header,
            data: req.body.data,
            categories: req.body.categories,
            city: req.body.city,
            creatorName: creator.username,
            image:req.body.image,
            isRequest: req.body.isRequest,
            address: req.body.address,
            contact: req.body.contact
        });

        const savedPost = await newPost.save();
        await creator.updateOne({$push:{posts: savedPost._id}});

        return res.status(200).json(savedPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

//Metoda za update posta:
//Same podatke saljemo preko body-ja, id posta preko parametara, a id korisnika koji
//pokusava da izvrsi update takodje preko body-ja:
export const updatePost = async (req, res) => {
//Trazimo post po id-ju:
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json("Post is not found!");

        const user = await User.findById(req.body.userId);
        if(!user)
            return res.status(404).json("No users found!");
        
        //Proveravamo da li kreator pokusava da promeni post ili neko drugi:
        if(post.creatorId === req.body.userId || user.isAdministrator) {
            //Radimo update:
            await post.updateOne({$set:req.body});
            
            // Ovo vise ne koristimo:
            // Za slucaj da se menjaju kategorije, posto moramo da ih trazimo preko id-ja:
            // if(req.body.categories) {
            //     console.log(req.body.categories);
            //     const categoriesId = await findCategorisIds(req.body.categories);
            //     console.log(categoriesId);
            //     await post.updateOne({categories: categoriesId});
            // }

            return res.status(200).json("Post is updated!");
        } 
        else {
            return res.status(403).json("You can edit only posts you created!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Deleting post:
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json("Post is not found!");

        const user = await User.findById(req.user.id);
        if(!user)
            return res.status(404).json('No users found!');

        if(post.creatorId === req.user.id || user.isAdministrator) {
            //Post takodje brisemo i iz liste korisnika koji ga je kreirao:
            const creator = await User.findById(post.creatorId);
            await creator.updateOne({$pull:{posts:post._id}});
            //Brisemo post:
            await post.deleteOne();
            return res.status(200).json("Post is deleted!");
        }
        else {
            return res.status(403).json("You can only delete posts you created!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Donate on post:
export const donateToPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json("Post not found!");

        //E sad, niko nam ne brani da vise puta doniramo, mada u okviru jedne donacije mozemo da podrazumevamo i jedan komad
        //odece i nekoliko razlicitih komada odece, tako da ce ostati da je moguce samo jednom donirati, a koliko stvari ce biti donirano 
        //zavisi od donatora!
        //Ako jos uvek nije zabelezena donacija:
        if(!post.donators.includes(req.body.userId)) {
            //Trazimo korisnika:
            const user = await User.findById(req.body.userId);
            //Vrsimo update liste donatora na post-u:
            await post.updateOne({$push:{donators:req.body.userId}});
            //Vrsimo update liste "lajkovanih" postova na strani korisnika:
            await user.updateOne({$push:{liked:post._id}});
            return res.status(200).json("Your donation is recorded! Thank you!");
        }
        else {
            //Inace, uklanjamo 'lajk' sa donacije:
            //Trazimo korisnika:
            const user = await User.findById(req.body.userId);
            //Vrsimo update liste donatora na post-u:
            await post.updateOne({$pull:{donators:req.body.userId}});
            //Vrsimo update liste 'lajkovanih' postova na strani korisnika:
            await user.updateOne({$pull:{liked:post._id}});
            return res.status(200).json("Your donation to post is successfully removed!");
        }

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Find post by id:
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json("Post is not found!");

        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Get all user posts:
export const getAllPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(!user)
            return res.status(404).json("User not found!");
        
        //Id-jevi postova koji pripadaju ovom korisniku:
        const posts = user.posts;
        if(!posts)
            return res.status(404).json("No posts related to this user!");
        else {
            //Niz postova(objekta):
            let postsArray = [];
            for(let i = 0; i < posts.length; i++) {
                const post = await Post.findById(posts[i]);
                if(post)
                    postsArray.push(post);
            }

            //Vracamo niz postova(objekta):
            return res.status(200).json(postsArray);
        }

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Vrati sve postove prijatelja:
export const friendPosts = async (req, res) => {
    try {
        //Trazimo sebe:
        const user = await User.findById(req.body.userId);
        if(!user)
            return res.status(404).json("User not found!");
        
        //Izvlacimo listu prijatelja:
        const userList = user.posts;
        if(!userList)
            return res.status(404).json("This user has no friends!");

        //Izvlacimo sve postove prijatelja:
        let timeline = [];
        for(let i = 0; i < userList.length; i++) {
            //Na praznu listu dodajemo ono sto nam vrati za svakog prijatelja:
            await timeline.concat(await getUsetPosts(userList[i]));
        }

        //Vracamo sve sto je potrebno:
        return res.status(200).json(timeline);

    } catch (err) {
        return res.status(500).json(err);
    }
};

//Metoda koja vraca sve postove jednog korisnika, ne mora da se eksporuje,
//samo se koristi kao poziv unutar metode koja stvarno vraca podatke:
export const getUsetPosts = async (id) => {
    try {
        let postList = [];
        //Ako nema nista vracamo praznu listu:
        const user = await User.findById(id);
        if(!user)
            return postList;
        
        //Izvlacimo sve postove preko liste id-jeva posta svakog korisnika:
        postList = await Promise.all(
            user.posts.map(postId => {
                return Post.findById(postId);
            })
        );
    } catch (err) {
        return res.status(500).json(err);
    }
};

//Metoda koja vraca sve postove u bazi koji su odgovarajuce kategorije: 
export const getAllDonationsByCategory = async (req, res) => {
    try {
        // Proveravamo da li smo poslali uslove za filtriranje?
        if(!req.body.type)
            return res.status(400).json("No parameters set!");

        let idCat = await nadjiIdKategorije(req.body.type);

        //Trazimo sve donacije/postove koji u nizu kategorija imaju odgovarajuci id:
        const firstArray = await Post.find({categories: {$in: idCat}});
        
        //Ako nemamo nista u niz, vracamo obavestenje da nema objekta koji odgovaraju kriterijumima:
        if(firstArray.length === 0)
            return res.status(404).json("There are no objects that meet the criteria!");
        else 
            return res.status(200).json(firstArray);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//Metoda koja vraca 10 najnovijih donacija iz baze podataka:
export const latestDonations = async (req, res) => {
    try {
        const arr = await Post.find().sort({_id: -1}).limit(10);
        if(!arr)
            return res.status(404).json('No donation objects in database!');
            
        return res.status(200).json(arr);
    } catch (err) {
        return res.status(500).json(err)
    }
};

export default router;