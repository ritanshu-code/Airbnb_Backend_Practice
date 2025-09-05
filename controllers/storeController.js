const Favourite = require('../models/favourite');
const Home = require('../models/home');


exports.getIndex = (req, res, next) => {     
     Home.find().then(homes => res.render('store/index', { homes: homes, pageTitle: 'Home',isLoggedIn: req.isLoggedIn,user: req.session.user, currentPage: "index" }))
          
}
exports.getHomes = (req, res, next) => {
     Home.find().then(homes => res.render('store/home-list', { homes: homes, pageTitle: 'Homes List',isLoggedIn: req.isLoggedIn,currentPage: "Home", user: req.session.user }) );
}

exports.getBookings = (req, res, next) => {
     res.render('store/bookings', {  pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user, }); 
}
exports.getFavouriteList = (req, res, next) => {
     Favourite.find().then(favourite => {
          favourite = favourite.map(fav => fav.homeId.toString());
          Home.find().then(homes => {
               const favouriteHomes = homes.filter(home => favourite.includes(home._id.toString()));
               res.render('store/favourite', { favouriteHomes: favouriteHomes,pageTitle: "My Favourites",
               currentPage: "favourites",
               isLoggedIn: req.isLoggedIn, 
               user: req.session.user, })
          }
     );

     })
}
exports.postAddToFavourite = (req, res, next) => {
     console.log("came to postAddToFavourite", req.body);
     const homeId = req.body.id;
     Favourite.findOne({ homeId: homeId }).then(fav => {
          if (fav) {
               console.log("Already in fav :", fav);
               
               
          } else {
               fav = new Favourite({ homeId: homeId });
               fav.save().then((result) => {
                    console.log("Added to fav :", result);
                    
               })
               
          }
          res.redirect('/favourite'); // Redirect to the favourite list after adding a home
                    
          
     }).catch(err => {
          console.log("Error in finding fav :", err);
     })
     
}


exports.getHomeDetails = (req, res, next) => {
     const homeId = req.params.homeId;
     console.log("homeId :", homeId);
     Home.findById(homeId).then(home =>{
          if(!home){
               console.log("Home not found");
               res.redirect("/homes"); // Redirect to homes list if home not found
          }else{
               res.render('store/home-detail', { 
                    home: home,
                    pageTitle: "Home Detail",
                    currentPage: "Home",
                    isLoggedIn: req.isLoggedIn, 
                    user: req.session.user,});
                              
          }
          
     })
           
       

}

