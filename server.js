//Core modules
const fs = require('fs');

//Third-part modules
const express = require('express');
const hbs = require('hbs');

//Setting use of partial
hbs.registerPartials(__dirname + '/views/partials');

// Setting Handlebars  helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

const port = process.env.PORT || 3000;

//Initializing web-server
var app = express();

//Setting Handlebars as view engine (templating)
app.set('view engine', 'hbs');

//Logger middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//Maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//Default middleware to serve /public assets
app.use(express.static(__dirname + '/public'));

//Handler for '/' GET requests (it use hbs templating)
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

//Handler for '/about' GET requests (it use hbs templating)
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

//Handler of '/bad' request
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request.'
  });
});

//Launching web server on port 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
