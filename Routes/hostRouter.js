// external module
const express = require('express');
const hostRouter = express.Router();
// Local module
const homesController = require("../controllers/hostController");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // or configure storage as needed 

hostRouter.get('/add-home', homesController.getAddHome )
hostRouter.get('/host-home-list', homesController.getHostHomes )
hostRouter.post('/add-home',upload.single('photo'), homesController.postAddHome )
hostRouter.get('/edit-home/:homeId', homesController.getEditHome )
hostRouter.post('/edit-home',upload.single('photo'), homesController.postEditHome )
hostRouter.post("/delete-home/:homeId", homesController.postDeleteHome);



module.exports = hostRouter