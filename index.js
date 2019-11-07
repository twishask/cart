var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
<<<<<<< HEAD
var passwordHash = require('password-hash');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './frontend/public/pictures/');
=======

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './cart/public/pictures/');
>>>>>>> 827994d7e9289589cbaf096965c84a0731c6ff91
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
})

var upload = multer({storage: storage})

mongoose.connect('mongodb://localhost/store');

var itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String},
  itemImage: {type: String}
});

var Item = mongoose.model('Item', itemSchema);

<<<<<<< HEAD
var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: false},
  hashedPassword: {type: String, required: false},
  email: {type: String, required: false},
  mobile: {type: Number},
});

var User = mongoose.model('User', userSchema);

=======
>>>>>>> 827994d7e9289589cbaf096965c84a0731c6ff91
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/items', function (req, res) {
  Item.find({}, function (err, itemlist) {
    if (err) console.log(err)
    else {
      res.send(itemlist);
    }
  })
})

app.post('/items/', upload.single('itemImage'), function (req, res) {
  var newitem = req.body
  newitem.itemImage = req.file.filename
  Item.create(newitem, function (err, newitem) {
    if (err) console.log(err)
    else {
      res.send(newitem)
    }
  })
})

app.put('/items/update/:item', upload.single('itemImage'), function (req, res) {
  var olditem = {name: req.params.item}
  var newitem = req.body
  newitem.itemImage = req.file.filename
  Item.update(olditem, newitem, function (err, newitem) {
    if (err) console.log(err)
    else {
      res.send(newitem)
    }
  })
})

app.delete('/items/delete/:item', function (req, res) {
  var item = {name: req.params.item}
  Item.remove(item, function (err, deleteRes) {
    if (err) console.log(err)
    else {
      res.send(deleteRes)
    }
  })
})

<<<<<<< HEAD
app.get('/users', function(req, res) {
    User.find({}, function(err, userlist) {
      if (err) console.log(err)
      else {
          res.send(userlist)
      }
    })
})

app.post('/newuser', function(req, res) {
    console.log(req.file);
    var newuser = req.body
    newuser.hashedPassword = passwordHash.generate(req.body.password);
    User.create(newuser, function(err, user) {
      if (err) console.log(err)
      else {
        console.log("Inserted "+user)
      }
      res.send(user)
    })
})

app.put('/update/:item', function(req, res) {
    var user = {username: req.params.item}
    user.hashedPassword = passwordHash.generate(req.body.password);
    User.update(user, req.body, function(err, user) {
      if (err) console.log(err)
      else {
        console.log("Updated "+user)
      }
      res.send(user)
    })
})

app.delete('/:username', function(req, res) {
    var user = {username: req.params.username}
    User.remove(user, function(err, user) {
      if (err) console.log(err)
      else {
        console.log(user+" deleted")
        }
      res.send(user)
    })
})

// authentication

app.post('/userinfo/:user', function(req, res) {
    var user = {username: req.params.user}
    User.findOne(user, function(err, userinfo) {
        if (err) console.log(err)
        else if (userinfo == null) {
          res.send("No such user");
        }
        else if (passwordHash.verify(req.body.password, userinfo.hashedPassword)){
            res.send(userinfo.id);
        }
        else{
            res.send("Password incorrect");
        }
    })
})

=======
>>>>>>> 827994d7e9289589cbaf096965c84a0731c6ff91
app.listen(5000);
console.log("Server running at http://localhost:5000");
