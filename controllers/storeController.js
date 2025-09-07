const Favourite = require('../models/favourite');
const Booking = require('../models/booking');
const Home = require('../models/home');


exports.getIndex = (req, res, next) => {     
     Home.find().then(homes => res.render('store/index', { homes: homes, pageTitle: 'Home',isLoggedIn: req.isLoggedIn,user: req.session.user, currentPage: "index" }))
          
}
exports.getHomes = (req, res, next) => {
     Home.find().then(homes => res.render('store/home-list', { homes: homes, pageTitle: 'Homes List',isLoggedIn: req.isLoggedIn,currentPage: "Home", user: req.session.user }) );
}

exports.getBookings = async (req, res, next) => {
     console.log("Query params :", req.query);
     const showModal = req.query.modal === 'true';
     const homeId = req.query.homeId;
     
     try {
        const bookings = await Booking.find({ userId: req.session.user._id }).populate("homeId");

        // extract the homes with booking details
        const bookedHomes = bookings.map(b => ({
            home: b.homeId,
            checkIn: b.checkIn,
            checkOut: b.checkOut
        }));

        res.render("store/bookings", {
            bookedHomes,
            showModal,
            homeId,
            pageTitle: "My Bookings",
            currentPage: "bookings",
            isLoggedIn: req.isLoggedIn,
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}; 


exports.postBooking = async (req, res, next) => {
     console.log("Booking data :", req.body);
     
    try {
        const { homeId, checkIn, checkOut } = req.body;
        const booking = new Booking({
            homeId,
            userId: req.session.user._id, // assuming logged in
            checkIn,
            checkOut
        });
        await booking.save();

        res.redirect("/bookings"); // after booking, show bookings list
    } catch (err) {
        console.error(err);
        next(err);
    }
};



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

