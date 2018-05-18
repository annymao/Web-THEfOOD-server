const yargs = require('yargs');
const accModel = require('../model/accModel.js');
const orderModel = require('../model/orderModel.js');
const storeModel = require('../model/storeModel.js');
const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());

// get accounts

router.get('/acc',function(req,res){
  accModel.getAccount(req.query.account).then(acc=>{
    res.json(acc);
  });
});
// get orderList
router.get('/order',function(req,res){
  orderModel.getOrderList(req.query.userId).then(orders=>{
    res.json(orders);
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
//create account

router.post('/acc',function(req,res){
  const {account,password, role} = req.body;
  if(!account||!password||!role){
    const err = new Error('account password role is needed');
    err.status = 400;
    throw err;
  }
  accModel.setAccount(account,password,role).then((newAcc)=>{
    res.json(newAcc);
  });
});

//create order
router.post('/order',function(req,res){
  const {userId,order} = req.body;
  if(!userId||!order){
    const err = new Error('userId is needed or no orders');
    err.status = 400;
    throw err;
  }
  orderModel.setOrder(userId,order).then((newOrder)=>{
    res.json(newOrder);
  });
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

module.exports = router;
