let express = require('express');
//let express=require('express.io');
let app = express();
global.Utils = require('./libs/utils.js');
global.ROOT_PATH = __dirname;
const config = require('./config/environments');
global.config = config;
// global.__lodash = require('lodash');
const path = require('path');
const fs = require('fs');
// let index=fs.readFileSync(path.join(ROOT_PATH,'..','public','index.html'));
//Configure application
require('./config/mongo');
require('./config/express')(app);

// require('./root-user');


app.use(express.static(path.join(__dirname, '../dist')));


//Configure api routes authentication
app.use((req, res, next) => {
  if (req.path.indexOf('/apis') === 0) { // If request is starting with /apis, then apply authentication check
    if (req.session.isLoggedIn === 'Y') {
      next();
    } else {
      let secretKey = req.headers['X-SECRET-KEY'];
      let accessKey = req.headers['X-ACCESS-KEY'];
      let sessionToken = req.headers['X-SESSION-TOKEN'];

      // IMPLEMENT APP SPECIFIC AUTHENTICATION LOGIC
      next();
    }
  } else {
    next();
  }
});




let Api = require('./apis');
new Api(app);

let Module = require('./modules');
new Module(app);



module.exports = app;
