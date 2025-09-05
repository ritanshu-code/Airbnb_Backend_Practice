const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
    res.render('host/add-home',
    { pageTitle: 'Add Home to airbnb',
      currentPage: "addHome",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user
    });     
}

exports.postAddHome =  (req, res, next) => {
    const {homeName, location, price, rating, description } = req.body; // Destructure to get home details from the request body
    const photo = req.file ? req.file.filename : null; // Get the photo filename if available
    const home = new Home(
        {homeName,
        location,
        price,
        rating,
        photo,
        description} 
    )
    home.save().then(()=>{
        console.log("Home saved successfully",home);
        
    })    
    res.redirect("/host/host-home-list");}

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId
    const editing = req.query.editing === 'true'; // this will convert the string value to a boolean

    Home.findById(homeId).then((home)=>{
        if(!home){
            console.log("Home not found for editing");
            return res.redirect('/host/host-home-list'); // Redirect if home not found
        }
        console.log(homeId, editing, home);
        
        res.render('host/edit-home', {
             pageTitle: 'Edit Home', 
             editing: editing,
             currentPage: "host-homes",
             home: home ,
             isLoggedIn: req.isLoggedIn,
             user: req.session.user
            }); // Render the 'addHome' view
    })
}

exports.postEditHome =  (req, res, next) => {
    const {id, homeName, location, price, rating, existingPhoto, description} = req.body;
    const photo = req.file ? req.file.filename : existingPhoto; 
    
    Home.findById(id).then(home => {
        home.homeName = homeName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.photo = photo;
        home.description = description;
        home.save().then(result => {
            console.log("UPDATED HOME!");
            res.redirect('/host/host-home-list');
        }).catch(err => console.log("Err while updating",err));
    }).catch(err => console.log("Err while finding home",err));

}

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findByIdAndDelete(homeId).then(() => {
        console.log("DESTROYED HOME");
        res.redirect('/host/host-home-list');
    }).catch(err => console.log("Err while deleting home", err));
}

exports.getHostHomes = (req, res, next) => {
     Home.find().then(homes => res.render('host/host-home-list', { homes: homes, pageTitle: 'Host Homes List',isLoggedIn: req.isLoggedIn,currentPage: "host-homes",user: req.session.user, }))
}

