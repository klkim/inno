var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    uID: String,
    uName: String,
    rID: String,
    cID: String
});

var AlarmSchema = new mongoose.Schema({
    aID: String,
    type: String,
    time: Date,
    member : [{uID: String, status: String}]       
});

var User = mongoose.model('User', UserSchema);
var Alarm = mongoose.model('Alarm', AlarmSchema);

//var db = mongoose.connect('mongodb://admin:admin@ds033617-a.mongolab.com:33617/ghf');
var db = mongoose.connect('mongodb://localhost/ghf');
/*
User.collection.remove(function(err) {
    console.log('deleted...');
});
*/
User.remove({}, function(err) {
    console.log('deleted...');
});
Alarm.remove({}, function(err) {
    console.log('deleted...');
});

var mockUser = [
    {uID: 'jinserk', uName: 'jinserk@gmail.com',  rID: 'APA91bHun4MxP5egoKMwt2KZFBaFUH-1RYqx', cID: 'jinserk_Clock_1'},
    {uID: 'kwanlae', uName: 'kwanlae@gmail.com',  rID: 'egoKMwt2KZFBaFUH-1RYqx', cID: 'kwanlae_Clock_1'},
    {uID: 'huewu', uName: 'huewu@gmail.com',  rID: '91bHun4MxP5egoKMwt2KZFBaFUH-1RYqx', cID: 'huewu_Clock_1'},
    {uID: 'before', uName: 'before@gmail.com',  rID: 'PA91bHun4KZFBaFUH-1RYqx', cID: 'won_Clock_1'},
];

for (var i = 0; i < mockUser.length; i++) {
    new User(mockUser[i]).save(function() {
        console.log('created...');
    });
}

new Alarm({
    aID: '2nd',
    type: 'GROUP',
    time: new Date(),
    member: [{uID: 'jinserk', status: 'ON'}, {uID: 'kwanlae', status: 'OFF'}]
}).save(function() {
    Alarm.findOne({aID: 'first'}, function(err, data) {
        console.log(data);   
    });
   
    Alarm.update({aID: '2nd', 'member.uID': 'kwanlae'}, {$set: {'member.$.status': 'ON'}}, function(err, data, raw) {
        if (err) {
            console.log(err);
        } else {
            console.log('updated...');
            console.log(raw);
            Alarm.findOne({aID: '2nd'}, function(err, data) {
                for (i = 0; i < data.member.length; i++) {
                    console.log(data.member[i].status);
                }
            });
        }
       
       
    });
   
});

User.findOne({uID: 'jinserk'}, function(err, data) {
    console.log(data.cID);
});