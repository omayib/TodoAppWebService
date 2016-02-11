var User=require('../models/user');
// Create endpoint /api/users for POST
exports.registerUser = function(req, res) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body.email);
  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: user });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};


exports.login=function(req,res){
	User.findOne({
		email: req.body.email
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {				
    			res.json({ message: user });
			}		

		}

	});
}