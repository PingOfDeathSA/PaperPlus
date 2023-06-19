// Import required modules
const express = require("express"); // Express.js framework for building web applications
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const mongoose = require("mongoose"); // MongoDB object modeling tool
const session = require('express-session'); // Middleware for managing sessions
const passport = require("passport"); // Authentication middleware for Node.js
const passportLocalMongoose = require('passport-local-mongoose'); // Mongoose plugin for simplifying user authentication
const MongoStore = require('connect-mongo')(session); // MongoDB session store for Express.js
const LocalStrategy = require('passport-local').Strategy; // Passport.js strategy for authenticating with a username and password
const router = express.Router()
const { Builder, By, Key, until } = require('selenium-webdriver'); // WebDriver for automating web browsers
const nodemailer = require('nodemailer'); // Module for sending emails
require('chromedriver'); // WebDriver for Chrome browser

mongoose.set('strictQuery', true); // Enable strict query mode

const app = express();
app.set('view engine', 'ejs'); // Set the template engine to EJS
app.use(bodyParser.urlencoded({ extended: true })); // Parse request bodies
app.use(express.static("public")); // Serve static files from the "public" directory
app.set('trust proxy', 1); // Trust the first proxy

// Configure session middleware
app.use(session({
  secret: 'THeTerminatorIsHere', // Secret key used to sign the session ID cookie
  resave: false, // Do not save the session if unmodified
  saveUninitialized: false, // Do not create a session until something is stored
  store: new MongoStore({
    mongooseConnection: mongoose.connection, // Use the existing Mongoose connection
    collectionName: 'sessions', // Collection name to store the sessions
    ttl: 60 * 60 // Session TTL (1 hour)
  })
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/PaperPlusDB');



const userschema = new mongoose.Schema({
  email: String,
  password: String,
});
const automaildateschema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const passwordresetschema = new mongoose.Schema({
  token: String,
  user: String,
});

userschema.plugin(passportLocalMongoose);


const UserModel = mongoose.model("User", userschema);

passport.use(UserModel.createStrategy());
passport.use(new LocalStrategy({ username: 'email' }, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());




const userInterestsDataSchema = new mongoose.Schema({
  user: { type: String, required: true },
  interest1: {
    searchQueryName: { type: String, required: true },
    searchPageRange: { type: String, required: true },
    ContentType: { type: String, required: true },
    Ranges: { type: String, required: true },
    sortType: { type: String, required: true }
  },
  interest2: {
    searchQueryName: { type: String, required: true },
    searchPageRange: { type: String, required: true },
    ContentType: { type: String, required: true },
    Ranges: { type: String, required: true },
    sortType: { type: String, required: true }
  },
  interest3: {
    searchQueryName: { type: String, required: true },
    searchPageRange: { type: String, required: true },
    ContentType: { type: String, required: true },
    Ranges: { type: String, required: true },
    sortType: { type: String, required: true }
  },
  Date: { type: Date, default: Date.now }
});

const UserInterestsModel = mongoose.model("User_interest_collec", userInterestsDataSchema);
const AutomailModel = mongoose.model("AAutomail_collec", automaildateschema);
const TokenModel = mongoose.model("Token_collec", passwordresetschema);


router.post('/update-interests', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.username;
    console.log('logged in user:', user);
    // interest 1 data request Start
    const interest1 = req.body.researchPapers1;
    const ContentTypeQuery1 = req.body.contenttype1;
    const sortbyQuery1 = req.body.sortType1;
    const PageRange1 = req.body.searchPageRange1;
    const FromDateQuery1 = req.body.fromyear1;
    const ToDate1 = req.body.toyear1;

 console.log('Selected research papers interest 1:', interest1);
 console.log('Selected research papers interest 1:', ContentTypeQuery1);
 console.log('Selected research papers interest 1:', PageRange1);
 console.log('Selected research papers interest 1:', sortbyQuery1);
 const FinalDateRage1 = FromDateQuery1+"_"+ ToDate1+"_Year"
 console.log(FinalDateRage1)
 // interest 1 data request End


    // interest 2 data Start
    const interest2 = req.body.researchPapers2;
    const ContentTypeQuery2 = req.body.contenttype2;
    const PageRange2 = req.body.searchPageRange2;
    const sortbyQuery2 = req.body.sortType2;
    const FromDateQuery2 = req.body.fromyear2;
    const ToDate2 = req.body.toyear2;
    console.log('Selected research papers interest 2:', interest2);
    console.log('Selected research papers interest 2:', ContentTypeQuery2);
 console.log('Selected research papers interest 2:', PageRange2);
 console.log('Selected research papers interest 2:', sortbyQuery2);
 const FinalDateRage2 = FromDateQuery2+"_"+ ToDate2+"_Year"
 console.log(FinalDateRage2)
  // interest 2 data End


    // interest 3 data Start
    const interest3 = req.body.researchPapers3;
    const ContentTypeQuery3 = req.body.contenttype3;
    const PageRange3 = req.body.searchPageRange3;
    const sortbyQuery3 = req.body.sortType3;
    const FromDateQuery3 = req.body.fromyear3;
    const ToDate3 = req.body.toyear3;
    console.log('Selected research papers interest 3:', interest3);
    console.log('Selected research papers interest 3:', ContentTypeQuery3);
    console.log('Selected research papers interest 3:', PageRange3);
 console.log('Selected research papers interest 3:', sortbyQuery3);
 const FinalDateRage3 = FromDateQuery3+"_"+ ToDate3+"_Year"
 console.log(FinalDateRage3)
     // interest 3 data End

    // Update the interests in the database
    UserInterestsModel.findOneAndUpdate(
      { user: user },
      { 
        user: user,
        interest1: {
          searchQueryName: interest1,
          searchPageRange: PageRange1,
          ContentType: ContentTypeQuery1,
          Ranges:  FinalDateRage1,
          sortType: sortbyQuery1,
        },
        interest2: {
          searchQueryName: interest2,
          searchPageRange: PageRange2,
          ContentType: ContentTypeQuery2,
          Ranges:  FinalDateRage2,
          sortType: sortbyQuery2
        },
        interest3: {
          searchQueryName: interest3,
          searchPageRange: PageRange3,
          ContentType: ContentTypeQuery3,
          Ranges: FinalDateRage3,
          sortType: sortbyQuery3
        },
      },

      { new: true },
      (err, updatedInterests) => {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          // Redirect to the dashboard after updating the interests
          res.redirect('/Dashboard.html');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});


router.get("/logout", function (req, res) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/", function (req, res) {
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });

  req.logIn(user, function (err) {
    if (err) {

      return res.status(500).send("Internal Server Error");
    }

    passport.authenticate("local", function (err, user, info) {
      if (err) {
        
        return res.status(500).send("Internal Server Error");
      }

      if (!user) {
        return res.status(400).send("User not found. Please register a new account.");
      }

      const userName = user.username;

      UserInterestsModel.find({ user: userName }, function (err, usersInterest) {
        if (err) {
         
          return res.status(500).send("Internal Server Error");
        }

        res.render("mail", {
          userInterests: usersInterest,
        });
      });
    })(req, res);
  });
});


router.get('/welcome.html', (req, res) => {

  if (req.isAuthenticated()) {
    const user = req.user.username;
    UserModel.find({ email: user }, function (err, userfound) {

      if (err) {
        console.log(err)
      } else {

        res.render("welcome", {
          user: userfound,
        });
      }
    })
  } else {
    res.redirect("/")
  }
});


router.get('/Dashboard.html', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.username;
    UserModel.find({ email: user }, function (err, userfound) {
      if (err) {
        console.log(err)
      } else {
        UserInterestsModel.find({ user: user }, function (err, userInterest) {

          if (err) {
            console.log(err)
          } else {
            res.render("mail", {
              listTitle: "Today",
              user: userfound,
              userInterests: userInterest,
            });
          }
        });
      }
    });
  } else {
    res.redirect("/")
  }
});



router.post("/welcomeUpade.html", function (req, res) {
  if (req.isAuthenticated()) {

    const user = req.user.username;
    console.log('logged in user:', user);


    // interest 1 data request Start
    const interest1 = req.body.researchPapers1;
    const ContentTypeQuery1 = req.body.contenttype1;
    const sortbyQuery1 = req.body.sortType1;
    const PageRange1 = req.body.searchPageRange1;
    const FromDateQuery1 = req.body.fromyear1;
    const ToDate1 = req.body.toyear1;

 console.log('Selected research papers interest 1:', interest1);
 console.log('Selected research papers interest 1:', ContentTypeQuery1);
 console.log('Selected research papers interest 1:', PageRange1);
 console.log('Selected research papers interest 1:', sortbyQuery1);
 const FinalDateRage1 = FromDateQuery1+"_"+ ToDate1+"_Year"
 console.log(FinalDateRage1)
 // interest 1 data request End


    // interest 2 data Start
    const interest2 = req.body.researchPapers2;
    const ContentTypeQuery2 = req.body.contenttype2;
    const PageRange2 = req.body.searchPageRange2;
    const sortbyQuery2 = req.body.sortType2;
    const FromDateQuery2 = req.body.fromyear2;
    const ToDate2 = req.body.toyear2;
    console.log('Selected research papers interest 2:', interest2);
    console.log('Selected research papers interest 2:', ContentTypeQuery2);
 console.log('Selected research papers interest 2:', PageRange2);
 console.log('Selected research papers interest 2:', sortbyQuery2);
 const FinalDateRage2 = FromDateQuery2+"_"+ ToDate2+"_Year"
 console.log(FinalDateRage2)
  // interest 2 data End


    // interest 3 data Start
    const interest3 = req.body.researchPapers3;
    const ContentTypeQuery3 = req.body.contenttype3;
    const PageRange3 = req.body.searchPageRange3;
    const sortbyQuery3 = req.body.sortType3;
    const FromDateQuery3 = req.body.fromyear3;
    const ToDate3 = req.body.toyear3;
    console.log('Selected research papers interest 3:', interest3);
    console.log('Selected research papers interest 3:', ContentTypeQuery3);
    console.log('Selected research papers interest 3:', PageRange3);
 console.log('Selected research papers interest 3:', sortbyQuery3);
 const FinalDateRage3 = FromDateQuery3+"_"+ ToDate3+"_Year"
 console.log(FinalDateRage3)
     // interest 3 data End
    const userInterestsData = [
      {
        user: user,
        interest1: {
          searchQueryName: interest1,
          searchPageRange: PageRange1,
          ContentType: ContentTypeQuery1,
          Ranges:  FinalDateRage1,
          sortType: sortbyQuery1,
        },
        interest2: {
          searchQueryName: interest2,
          searchPageRange: PageRange2,
          ContentType: ContentTypeQuery2,
          Ranges:  FinalDateRage2,
          sortType: sortbyQuery2
        },
        interest3: {
          searchQueryName: interest3,
          searchPageRange: PageRange3,
          ContentType: ContentTypeQuery3,
          Ranges: FinalDateRage3,
          sortType: sortbyQuery3
        },
        Date: Date.now(),
      },
    ];

    // Check if the user already has interests
    UserInterestsModel.findOne({ user: user })
      .then(existingInterests => {
        if (existingInterests) {
          // User already has interests, redirect to dashboard
          res.redirect("/Dashboard.html");
        } else {
          // User doesn't have interests, create new interests
          UserInterestsModel.create(userInterestsData)
            .then(results => {
              console.log("User Interests added");
              console.log(results);
              res.redirect("/Dashboard.html");
            })
            .catch(err => {
              console.error(err);
              // Handle the error and send an appropriate response
              res.status(500).send(`<div style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; border-radius: 5px; margin-bottom: 20px;"><strong>Error:</strong> ${err}</div>`);
            });
        }
      })
    .catch(err => {
      console.error(err);
      // Handle the error and send an appropriate response
      res.status(500).send(`<div style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; border-radius: 5px; margin-bottom: 20px;"><strong>Error:</strong> ${err}</div>`);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/UseRegister.html", function (req, res) {
  res.render("registerpage");
});


router.get("/", function (req, res) {
  res.render("login");
});



router.post("/UseRegister.html", function (req, res) {
  const username = req.body.username;

  // Check if the username already exists in the database
  UserModel.findOne({ username: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.redirect("/UseRegister.html");
    } else {
      if (foundUser) {
        // Username already exists
        console.log("Username already exists");
        res.status(409).send("Username already exists");
      } else {
        // Username does not exist, proceed with registration
        UserModel.register({ username: username }, req.body.password, function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/UseRegister.html");
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/welcome.html");
            });
          }
        });
      }
    }
  });
});


router.get("/forgotpassword.html", function (req, res) {
  res.render("passwordreset");
});




router.post("/forgotpassword.html", function (req, res) {
  const username = req.body.username;

  // Check if the username already exists in the TokenModel
  TokenModel.findOne({ user: username }, function (err, foundToken) {
    if (err) {
      console.log(err);
      // Handle the error condition
    } else {
      if (foundToken) {
        // User already has a token, delete the token
        TokenModel.deleteOne({ user: username }, function (err) {
          if (err) {
            console.error(err);
            // Handle the error condition
          } else {
            console.log("Previous token deleted");
            // Proceed with generating and sending a new token
            generateAndSendToken(username);
          }
        });
      } else {
        // User does not have a token, proceed with generating and sending a new token
        generateAndSendToken(username);
      }
    }
  });

  function generateAndSendToken(username) {
    // Generate a reset token
    const tokenLength = 32;
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    // Save the token and user in the TokenModel
    TokenModel.create({ token: token, user: username }, function (err, results) {
      if (err) {
        console.error(err);
        // Handle the error condition
      } else {
        console.log("Token saved:", results);

        // Send the token to the user
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mailapi348@gmail.com',
            pass: 'lhhoqgnfyjfgpvvg'
          }
        });

        const mailOptions = {
          from: 'mailapi348@gmail.com',
          to: username,
          subject: 'Password Reset Instructions',
          text: `Dear ${username},\n\nPlease use the following token to reset your password: ${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(error);
            // Handle the error condition
          } else {
            console.log(`Email sent to ${username}: ${info.response}`);
            // Redirect or send a response indicating that the token has been sent
            res.render("ResertPage");
          }
        });
      }
    });
  }
});




router.get("/Resetpassword.html", function (req, res) {
  res.render("ResetPage");
});

router.post("/Resetpassword.html", function (req, res) {
  const username = req.body.username;
  const token = req.body.token;
  const newPassword = req.body.password;

  // Check if the username and token match in the TokenModel
  TokenModel.findOne({ user: username, token: token }, function (err, foundToken) {
    if (err) {
      console.log(err);
      // Handle the error condition
    } else {
      if (foundToken) {
        // Username and token match

        // Find and delete the user in the UserModel
        UserModel.findOneAndDelete({ username: username }, function (err, deletedUser) {
          if (err) {
            console.log(err);
            // Handle the error condition
          } else {
            if (deletedUser) {
              // Register the user with the new email and password
              UserModel.register({ username: username, email: username }, newPassword, function (err, user) {
                if (err) {
                  console.log(err);
                  // Handle the error condition
                  res.redirect("/UseRegister.html");
                } else {
                  passport.authenticate("local")(req, res, function () {
                    // Delete the user's token from the TokenModel
                    TokenModel.deleteOne({ user: username }, function (err) {
                      if (err) {
                        console.log(err);
                        // Handle the error condition
                      } else {
                        console.log("Token deleted");
                        res.redirect("'/Dashboard.html");
                      }
                    });
                  });
                }
              });
            } else {
              // User not found in the UserModel
              res.status(404).send("User not found. Please check your credentials.");
            }
          }
        });
      } else {
        // Username and token do not match in the TokenModel
        res.status(401).send("Invalid token. Please check your credentials.");
      }
    }
  });
});


function performFunctionOnMondayMorning() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  if (currentDay === 1 && (currentHour > 8 || (currentHour === 8 && currentMinute >= 30))) {
    AutomailModel.find({}, function (err, datedata) {
      if (err) {
        console.log(err);
      } else {
        const formattedDates = datedata.map(dateObj => {
          const date = dateObj.date;
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the correct month
          const day = date.getDate();

          return {
            year,
            month,
            day
          };
        });

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the correct month
        const currentDay = currentDate.getDate();

        const matchedDates = formattedDates.filter(dateObj => {
          return (
            dateObj.year === currentYear &&
            dateObj.month === currentMonth &&
            dateObj.day === currentDay
          );
        });

        if (matchedDates.length > 0) {
          console.log("Emails already sent.");
          matchedDates.forEach(dateObj => {
            console.log(`${dateObj.year}-${dateObj.month}-${dateObj.day}`);
          });
        } else {
          console.log("Sending emails...");


          UserInterestsModel.find({}, function (err, users) {
            if (err) {
              console.log(err);
            } else {
              let UserInterests = [];
              users.forEach(function (user) {
                let userInterests = {
                  user: user.user,
                  interest1: user.interest1,
                  interest2: user.interest2,
                  interest3: user.interest3
                };
                UserInterests.push(userInterests);
              });
          
          
              (async () => {
                try {
                  const driver = await new Builder().forBrowser('chrome').build();
                  const base_url = 'https://ieeexplore.ieee.org/search/searchresult.jsp?';
                  console.log(UserInterests)
                  for (const user of UserInterests) {
                    const interests = [user.interest1, user.interest2, user.interest3];
                    const emailContent = [];
          
                    for (const interest of interests) {
                      const url = `${base_url}queryText=${interest.searchQueryName}&highlight=true&returnType=SEARCH&matchPubs=true&rowsPerPage=${interest.searchPageRange}&refinements=ContentType:${interest.ContentType}&ranges=${interest.Ranges}&returnFacets=ALL&sortType=${interest.sortType}`;
          await driver.get(url);
          await driver.wait(until.elementLocated(By.className('List-results-items')), 10000);
          const listAll = await driver.findElements(By.className('List-results-items'));
          
                      if (listAll.length > 0) {
                        const item = listAll[0];
                        const links = await item.findElements(By.tagName('a'));
                        const text = await item.getText();
                        const linkPromises = links.map(async (link) => await link.getAttribute('href'));
                        const link_1_Details = await Promise.all(linkPromises);
                        const link_2_Author = link_1_Details.slice(1, 2);
          
                        const content = {
                          interest,
                          paper: text,
                          detailsLink: link_1_Details[0],
                          authorLink: link_2_Author[0]
                        };
          
                        emailContent.push(content);
                      }
                    }
          
                    console.log(`Sending email to user: ${user.user}`);
                    console.log(`Interests: ${interests}`);
                    console.log(`Email Content: `, emailContent);
          
                    // Generate email body content
                    let emailBody = `
                      <html>
                        <head>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              background-color: #f5f5f5;
                              padding:                           20px;
                            }
                          
                            .email-header {
                              background-color: #007bff;
                              padding: 10px;
                              color: #fff;
                            }
                          
                            .email-content {
                              background-color: #fff;
                              padding: 20px;
                            }
                          
                            .email-interest {
                              margin-bottom: 20px;
                            }
                          
                            .email-interest-title {
                              font-weight: bold;
                              font-size: 16px;
                            }
                          
                            .email-paper {
                              margin-top: 10px;
                            }
                          
                            .email-paper-title {
                              font-weight: bold;
                            }
                          
                            .email-paper-link {
                              margin-top: 5px;
                            }
                          
                            .email-paper-link a {
                              color: #007bff;
                            }
                          
                            .email-footer {
                              background-color: #f5f5f5;
                              padding: 10px;
                              font-size: 12px;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="email-header">
                            <h1>Weekly Newsletter</h1>
                          </div>
                          <div class="email-content">
                            <h2>Hello ${user.user},</h2>
                            <p>Here are the latest papers matching your interests:</p>
          `;
          
                    emailContent.forEach(content => {
                      emailBody += `
                            <div class="email-interest">
                              <h3 class="email-interest-title">${content.interest.searchQueryName}</h3>
                              <div class="email-paper">
                                <p class="email-paper-title">${content.paper}</p>
                                <p class="email-paper-link"><a href="${content.detailsLink}">View Details</a></p>
                                <p class="email-paper-link"><a href="${content.authorLink}">Author Information</a></p>
                              </div>
                            </div>
                      `;
                    });
          
                    emailBody += `
                          </div>
                          <div class="email-footer">
                            <p>This is an automated email. Please do not reply.</p>
                          </div>
                        </body>
                      </html>
                    `;
          
                    // Send email to the user with their interests and results
                    const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'mailapi348@gmail.com',
                        pass: 'lhhoqgnfyjfgpvvg'
                      }
                    });
          
                    const mailOptions = {
                      from: 'mailapi348@gmail.com',
                      to: user.user,
                      subject: 'Your Interests and Results',
                      html: emailBody
                    };
          
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        console.error(error);
                      } else {
                        console.log(`Email sent to ${user.user}: ${info.response}`);
                      }
                    });
                  }
          
                  await driver.quit();
          
                  // After sending emails to all users, add the date to the database
                  AutomailModel.create({ date: new Date() }, function (err, results) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log("Date added");
                      console.log(results);
                    }
                  });
          
                } catch (error) {
                  console.error(error);
                }
              })();
            }
          });
          
        }
      }
    });
  } else {
    console.log("It's not Monday morning, or the time is not yet 8:30 AM on Monday");
  }
}

// Call the function
performFunctionOnMondayMorning();








module.exports = router;