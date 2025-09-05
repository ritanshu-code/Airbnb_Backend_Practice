// external module
const express = require('express');
const storeRouter = express.Router();
// Local module
const homesController = require('../controllers/storeController');

storeRouter.get('/', homesController.getIndex); 
storeRouter.get('/homes', homesController.getHomes); // Route to get all homes)
storeRouter.get('/bookings', homesController.getBookings); 
storeRouter.get('/favourite', homesController.getFavouriteList); 

storeRouter.get('/homes/:homeId', homesController.getHomeDetails); 
storeRouter.post('/favourite', homesController.postAddToFavourite); // Route to add a home to favourite list

module.exports = storeRouter;