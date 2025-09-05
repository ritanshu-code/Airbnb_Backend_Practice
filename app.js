// Core modules
const path = require('path');

// External module
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const DB_PATH = process.env.DB_PATH;
const MongoDBStore = require('connect-mongodb-session')(session);

// Local module
const storeRouter = require('./Routes/storeRouter');
const hostRouter = require('./Routes/hostRouter');
const authRouter = require('./Routes/authRouter');
const rootDir = require('./utils/pathUtil');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', 'views'); // Set the views directory

//Middleware in Express

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
})

app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: "airbnbPracticeSecret",
    resave: false,
    saveUninitialized: true,
    store: store
}))
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(rootDir, 'public'))); // Serve static files from 'public' directory


app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req, res, next) => {
    if (req.isLoggedIn) {
        next();
        
    } else {
        res.redirect("/login");
    }
})
app.use("/host", hostRouter);
app.use((req, res, next) => {
    // console.log("First middleware", req.url, req.method);
    // next(); // Call next middleware or route handler
    // res.status(404).sendFile(path.join(rootDir,  'views', 'pageNotFound.html'));
    res.render('pageNotFound', {pageTitle: 'PageNotFound',isLoggedIn: req.isLoggedIn, user: req.session.user} );
})


const port = 3001;
// mongoConnect(() =>{
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     })
// })



mongoose.connect(DB_PATH).then(()=>{
    console.log("Connected to MongoDB using Mongoose");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
}).catch(err =>{
    console.log("Error connecting to MongoDB", err);
    
})

