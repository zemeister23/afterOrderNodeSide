var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));

// CONNECT TO DB
mongoose.connect('mongodb+srv://admin:admin112233@cluster0.au3r2.mongodb.net/users?retryWrites=true&w=majority');

// USE AND CREATE SCHEMA
const Cat = mongoose.model('User', {
  name: String,
  number: String,
  course: String,
  password: String,
  isLogin: Boolean,
});
// USE ADMIN AND CREATE SCHEMA
const Admin = mongoose.model('Admin', {
  number: String,
  password: String
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  Cat.find({}).then((result) => res.json(result));

});

/* GET users listing. */
router.get('/admin', function (req, res, next) {
  Admin.find({}).then((result) => res.json(result));
});

/* GET finded user listing. */
router.get('/:phonenumber', function (req, res, next) {
  Cat.find({'number' : req.params.phonenumber}).then((result) => res.json(result));
});

// POST NEW USER FOR COURSE
router.post('/', (req, res, next) => {
  const kitty = new Cat({
    name: req.body.name,
    number: req.body.number,
    course: req.body.course,
    password: req.body.password,
    isLogin: req.body.isLogin
  });
  kitty.save().then(() => res.send(req.body));
});
// POST NEW ADMIN FOR COURSE
router.post('/admin', (req, res, next) => {
  const admin = new Admin({
    number: req.body.number,
    password: req.body.password
  });
  admin.save().then(() => res.send(req.body));
});

// UPDATE THE ISLOGIN TO False
router.post('/updateIsLoginToFalse',  (req,res,next) => {
  Cat.findOneAndUpdate({'isLogin': true},{'isLogin':false}).then((result) => res.json(result));
});
// UPDATE THE ISLOGIN TO True
router.post('/updateIsLoginToTrue',  (req,res,next) => {
  Cat.findOneAndUpdate({'isLogin': false},{'isLogin':true}).then((result) => res.json(result));
});

// DELETE NEW USER FOR COURSE
router.delete('/', async (req, res, next) => {
  const result = await Cat.deleteOne({
    number: req.body.number
  });

  res.json(result);
});

module.exports = router;


// mongodb+srv://admin:admin112233@cluster0.au3r2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority