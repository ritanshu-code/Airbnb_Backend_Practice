const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Favourite', favouriteSchema);


// module.exports = class Favourite {
//     static addToFavourite(homeId, callback) {
//         Favourite.getFavourite((favourite) => {
//             if (favourite.includes(homeId)) {
//                 console.log("Home already in favourite list");
//                 return;
//             } else {
//                 favourite.push(homeId);
//                 fs.writeFile(favouriteDataPath, JSON.stringify(favourite), callback);
                
                
//             }
//         });
//     }
//     static getFavourite(callback) {
//         fs.readFile(favouriteDataPath, (err, data) => {
//             if (!err) {
//                 callback(JSON.parse(data));// Parse the JSON data and return it
//             } else {
//                 callback([]); // If there's an error, return an empty array
//             }

//         });
//     }

// }