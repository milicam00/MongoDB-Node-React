import express from "express";
const router = express.Router();

import { getAll, createVolunteering, registerToVolunteer, allRegistred, getAllVolunteernigs, updateVolunteernig, deleteVolunteernig } from "../Controllers/volunteering.js";
import { auth } from "../Middleware/auth.js";

//Metoda za kreiranje novog volontiranja:
router.post('/', auth, createVolunteering);

//Metoda za prijavljivanje na volontiranje:
router.post('/:volId/register', auth, registerToVolunteer);

//Metoda za prikaz svih volontera prijavljenih:
router.get('/:id', allRegistred);

//Ne koristimo vise:
//Metoda za prikaz filtriranih podataka:
// router.post('/filter', findByCategories);

//Metoda za vracanje svih volontiranja koje je kreirao korisnik:
router.get('/:userId/all', getAllVolunteernigs);

//Metoda koja vraca sva volontiranja iz baze:
router.post('/getAll', getAll);

//Metoda za update postojeceg volontiranja:
router.put('/:postId/update', auth, updateVolunteernig);

//Metoda za brisanje volontiranja:
router.delete('/:volunteernigId', auth, deleteVolunteernig);

export default router;