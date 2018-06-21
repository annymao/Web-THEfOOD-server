const yargs = require('yargs');
const accModel = require('../model/accModel.js');
const orderModel = require('../model/orderModel.js');
const listModel = require('../model/listModel.js');
const storeModel = require('../model/storeModel.js');
const favoriteModel = require('../model/favoriteModel.js');
const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());

/* Account */
// get accounts
router.get('/acc',function(req,res){
    const {account,password} = req.query;
    if(password === undefined){
      accModel.getAccount(account).then(acc=>{
        var data = [];
        var obj = {};
        console.log(acc[0]);
        if(acc[0] !== undefined) {
          obj["account"]=acc[0]["account"];
          data[0] = obj;
        }
        //console.log(acc[0]["account"]);
        res.json(data);


      });
    } else{
        const role = req.query.role;
        accModel.confirmAccount(account.toString(), password.toString(), role.toString())
          .then(acc => {
            var data = [];
            var obj = {};
            if(acc[0] !== undefined) {
              data[0] = acc[0];
            }
            console.log(acc);
            res.json(data);
      });
    }
});

// create account
router.post('/acc',function(req, res){

  const mode = req.body.mode;
  if (mode == 'modify') {
    const {account, password, newPassword} = req.body;
    if (!account || !password || !role || !newPassword) {
      const err = new Error('ERROR : Modify Password');
      err.status = 400;
      throw err;
    }
    accModel.modifyAccount(account, password, role, newPassword)
      .then((acc) => {
        res.json(acc);
    });
  } else {
    const {account, password, role, name, email} = req.body;
    if (!account || !password || !role || !name || !email) {
      const err = new Error('ERROR : Create Account');
      err.status = 400;
      throw err;
    }
    accModel.setAccount(account, password, role, name, email)
      .then((newAcc) => {
        res.json(newAcc);
    });
  }
});

// get orderList
router.get('/order',function(req,res) {
  orderModel.getOrderList(req.query.userId).then(order => {
    res.json(order);
  });
});

router.get('/lists', function(req, res) {
  listModel.getList(req.query.userId).then(lists => {
    res.json(lists);
  });
});

//get StoreOrder
router.get('/store',function(req,res){
  orderModel.getStoreOrder(req.query.store).then(orders=>{
    res.json(orders);
  });
});

//set confirm
router.post('/confirm',function(req,res){
  orderModel.confirmOrder(req.body.orderId).then(orders=>{
    res.json(orders);
  });
});

//create order
router.post('/order',function(req, res){
  console.log(req.body);
  console.log(req.body.order.meal);
  const userId = req.body.uID;
  const order = req.body.order;
  const lists = req.body.order.meal;
  if(!userId || !order || !lists) {
    const err = new Error('userId is needed or no orders');
    err.status = 400;
    throw err;
  }
  orderModel.setOrder(userId, order, lists)
});

//get getStoreName
router.get('/restaurant',function(req,res){
  const {id} = req.query;
  storeModel.getStoreName(id).then(names=>{
    res.json(names);
  });
});

//get getMeal
router.get('/meals',function(req,res){
  const {id} = req.query;
  storeModel.getMealName(id).then(storename=>{
    let restaurant = storename[0].restaurant;
    storeModel.getAllMealName(storename[0].name).then(names=>{
        names.forEach(function(element) {
          element.restaurant = restaurant;
        });
       res.json(names);
    });
  });
});

/* Vendor API */

router.post('/vendor', function(req, res) {
  const mode = req.body.mode;
  const ID = req.body.ID;
  if(!oID) {
    const err = new Error('Order ID lost ... ');
    err.status = 400;
    throw err;
  }
  if (mode == 'confirm') {
    orderModel.confirmOrder(ID);
  } else if (mode == 'pay') {
    orderModel.payOrder(ID);
  };
});

router.get('vendor', function(req, res) {
  const mode = req.body.mode;
  if (mode == 'check') {
    orderModel.getAllOrders(req.query.storeName);
  } else {
    orderModel.checkOrder(req.query.ID);
  };
});

/* Favorite */
router.get('favorite', function(req, res) {
  const userID = req.body.userID;
  favoriteModel.getFavorite(userID);
});

router.post('favorite', function(req, res) {
  const mode = req.query.mode;
  const {userID, storeName, mealName, mealprice} = req.query;
  if (mode == 'add') {
    favoriteModel.addFavorite(userID, storeName, mealName, mealPrice);
  } else {
    favoriteModel.removeFavorite(userID, storeName, mealName, mealPrice);
  }
});

module.exports = router;
