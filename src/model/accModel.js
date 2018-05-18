const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');
require('../../config.js');
if(!global.db){
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
};


function getAccount(account=' '){

    const where = ` Where account ILIKE '%$1:value%'`;
    const sql = `
        SELECT *
        FROM acc
        ${where}
    `;
    return db.any(sql,account);

    /*
  return new Promise((resolve,reject)=>{
    if(!fs.existsSync('acc-data.json')){
      fs.writeFileSync('acc-data.json','');
    }
    fs.readFile('acc-data.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let acc = data ? JSON.parse(data) : [];
            if (acc.length > 0 && account) {

                acc = acc.filter(p => {
                    return p.account==account;
                });
            }
            resolve(acc);
        });
    });
    */

}

function setAccount(account, password, role) {

  const sql = `
    INSERT INTO acc (account,password,role)
    SELECT $<account>,$<password>,$<role>
    WHERE NOT EXISTS (SELECT 1 FROM acc WHERE account=$<account>)
    RETURNING *
  `;
    return db.any(sql,{account, password, role});
  /*
  return db.one(sql,{account,password,role});
  return new Promise((resolve,reject)=>{

    if(!fs.existsSync('acc-data.json')){
      fs.writeFileSync('acc-data.json','');
    }

    const newAcc = {
            account: account,
            password:password,
            role:role
        };

        getAccount().then(acc => {
            flag = true;
            for(var i in acc){
              if(acc[i].account==newAcc.account){
                  flag = false;
                  break;
              }
            }
            if(flag){
              acc = [
                  newAcc,
                  ...acc
              ];
              fs.writeFile('acc-data.json', JSON.stringify(acc), err => {
                  if (err) reject(err);
              });
            }
              resolve(flag);
        });
    });*/
}
function confirmAccount(account,password){

  const where = ` WHERE account ILIKE '$1:value' AND password ILIKE '$2:value'`;

  const sql = `
      SELECT *
      FROM acc
      ${where}
  `;
  console.log(sql);
  console.log(account);
  console.log(password);
  return db.any(sql,[account,password]);
  /*
  return db.one(sql,{account,password,role});
  return new Promise((resolve,reject)=>{

    if(!fs.existsSync('acc-data.json')){
      fs.writeFileSync('acc-data.json','');
    }

    const newAcc = {
            account: account,
            password:password,
            role:role
        };

        getAccount().then(acc => {
            flag = true;
            for(var i in acc){
              if(acc[i].account==newAcc.account){
                  flag = false;
                  break;
              }
            }
            if(flag){
              acc = [
                  newAcc,
                  ...acc
              ];
              fs.writeFile('acc-data.json', JSON.stringify(acc), err => {
                  if (err) reject(err);
              });
            }
              resolve(flag);
        });
    });*/
}

module.exports = {
    setAccount,
    getAccount,
    confirmAccount
};
