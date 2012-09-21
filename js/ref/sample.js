var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
	console.log('connected...');
	var kittySchema = new mongoose.Schema({
		name: String
	});
	kittySchema.methods.speak = function() {
		var greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
		console.log(greeting);		
	}
	
	var Kitten = db.model('kitten', kittySchema);
	var silence = new Kitten({name: 'Silence'});
	
	console.log(silence.name);
	silence.speak();
	
	Kitten.remove({name: 'Silence'}).exec();
	/*
	silence.save(function(err) {
		if (err) {}
		console.log('meow');
	});
	
	Kitten.find(function(err, kittens) {
		if (err) {}
		console.log(kittens);
	});
	*/
});