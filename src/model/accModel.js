const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');


function getAccount(account){
  return new Promise((resolve,reject)=>{
    if(!fs.existsSync('acc-data.json')){
      fs.writeFileSync('acc-data.json','');
    }
    fs.readFile('acc-data.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let acc = data ? JSON.parse(data) : [];
            if (acc.length > 0 && account) {

                acc = acc.filter(p => {
                    return p.account.toLowerCase()=== account.toLowerCase()
                });
            }

            resolve(acc);
        });

    });
}
function setAccount(account,password,role){
  return new Promise((resolve,reject)=>{
    /*if(!fs.existsSync('acc-data.json')){
      fs.writeFileSync('acc-data.json','');
    }*/
    const newAcc = {
            account: account,
            password:password,
            role:role
        };

        getAccount().then(acc => {
            flag = true;
            for(var i in acc){
              if(acc[i].account.toLowerCase()===newAcc.account.toLowerCase()){
                  flag = false;
                  break;
              }

            }
            if(flag){
              acc = [
                  newAcc,
                  ...acc
              ];
            }
            fs.writeFile('acc-data.json', JSON.stringify(acc), err => {
                if (err) reject(err);

                resolve(newAcc);
            });
        });
    });
}


module.exports = {
    setAccount,
    getAccount
};
