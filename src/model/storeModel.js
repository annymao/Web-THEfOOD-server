const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function getStoreName(restaurant){

  const where = restaurant?` Where restaurant ILIKE '%$1:value%'`:'';
  const sql = `
      SELECT *
      FROM store
      ${where}
  `;
  return db.any(sql,restaurant)
  /*
  return new Promise((resolve,reject)=>{
    if(!fs.existsSync('storeList-data.json')){
      fs.writeFileSync('storeList-data.json','');
    }
    fs.readFile('storeList-data.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let storeName = data ? JSON.parse(data) : [];
            if (storeName.length > 0 && restaurant) {
                storeName = storeName.filter(p => {
                    return p.restaurant == restaurant;

                });
                resolve(storeName);
            }
            resolve(null);
        });

    });
    */
}
module.exports = {
  getStoreName
};
