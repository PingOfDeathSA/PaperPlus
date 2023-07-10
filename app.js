//jshint esversion:6
const express = require("express"); // Express.js framework for building web applications
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const mongoose = require("mongoose"); // MongoDB object modeling tool
const session = require('express-session'); // Middleware for managing sessions
const passport = require("passport"); // Authentication middleware for Node.js
const passportLocalMongoose = require('passport-local-mongoose'); // Mongoose plugin for simplifying user authentication
const MongoStore = require('connect-mongo'); // MongoDB session store for Express.js
const LocalStrategy = require('passport-local').Strategy; // Passport.js strategy for authenticating with a username and password
const { Builder, By, Key, until } = require('selenium-webdriver'); // WebDriver for automating web browsers
const nodemailer = require('nodemailer'); // Module for sending emails
const UserAPI = require('./router/APIs')

require('chromedriver'); // WebDriver for Chrome browser

// Configure Mongoose
mongoose.set('strictQuery', true); // Enable strict query mode

// Create an Express application
const app = express();
const port =5000
app.set('view engine', 'ejs'); // Set the template engine to EJS
app.use(bodyParser.urlencoded({ extended: true })); // Parse request bodies
app.use(express.static("public")); // Serve static files from the "public" directory
app.set('trust proxy', 1); // Trust the first proxy

// Configure session middleware
app.use(session({
  secret: 'THeTerminatorIsHere', // Secret key used to sign the session ID cookie
  resave: false, // Do not save the session if unmodified
  saveUninitialized: false, // Do not create a session until something is stored
  store: MongoStore.create({
 mongoUrl: "mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/PaperPlusDB",
    collectionName: 'sessions', // Collection name to store the sessions
    ttl: 60 * 60 // Session TTL (1 hour)
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', UserAPI)



app.listen(process.env.PORT || port, ()=> console.log(`Listening on port ${port}`))

// // Starting Sever
// app.listen(5000, function () {
//   console.log("Server started on port 5000");
// });
