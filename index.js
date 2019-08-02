var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './cart/public/pictures/');
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

app.listen(5000);
console.log("Server running at http://localhost:5000");
