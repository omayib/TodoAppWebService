var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var userController = require('../TodoAppWebService/controllers/user');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../TodoAppWebService/config'); // get our config file

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var router = express.Router();

router.route('/user/signup')
  .post(userController.registerUser);
router.route('/user/signin')
  .post(userController.login);
router.route('/todo')
  .post(userController.insertItemTodo)
  .get(userController.getTodos);
router.route('/todo/:todo_id')
 	.put(userController.updateItemTodo)
 	.delete(userController.deleteItemTodo);

app.use('/api', router);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);