const yargs = require('yargs');
const accModel = require('../model/accModel.js');
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

//create account

router.post('/acc',function(req,res){
  const {account,password, role} = req.body;
  if(!account||!password||!role){
    const err = new Error('account password role is needed');
    err.status = 400;
    throw err;
  }
  accModel.setAccount(account,password,role).then(newAcc=>{
    res.json(newAcc);
  });
});

module.exports = router;
