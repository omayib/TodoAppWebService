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

    res.json({ success: true, data: user, message: 'register success' });
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
			res.json({ success: false,data:null ,message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false,data:null, message: 'Authentication failed. Wrong password.' });
			} else {				
    			res.json({ success: true, data: user, message: 'login success' });
			}		

		}

	});
}

exports.insertItemTodo=function(req,res){
	var itemTodo = {item: req.body.item ,
						   date: new Date()};
	console.log(itemTodo);
	User.findOneAndUpdate(
		{_id:req.body.token},
		{$push:{todos:itemTodo}},
		[{upsert:true},{new:true}],
		function(err,user){
			if(err) throw err;
    		res.json({ success: true, data: null, message: 'insert item success' });
		});
}

exports.getTodos=function(req,res){
	console.log('query token '+req.query.token);
	User.findOne(
		{_id:req.query.token},
		function(err,user){
			if(err) throw err;
    		res.json({ success: true, data: user.todos, message: null });
		});
}

exports.updateItemTodo=function(req,res){
	var itemTodo = {item: req.body.item,
					_id:req.params.todo_id,
					date: new Date()};
	console.log(itemTodo);
	User.update(
		{'todos._id':req.params.todo_id},
		{'$set':{
			'todos.$.item':req.body.item
		}},
		function(err){
			if(err) throw err;
    		res.json({ success: true, data: null, message: 'update item success' });
		});
}

exports.deleteItemTodo=function(req,res){
	var itemTodo = {_id:req.params.todo_id,
					date: new Date()};
	User.findOneAndUpdate(
		{_id:req.body.token},
		{$pull:{todos:{_id:req.params.todo_id}}},
		[{upsert:true},{new:true}],
		function(err,user){
			if(err) throw err;
    		res.json({ success: true, data: null, message: 'delete item success' });
		});
}