const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function setOrder(userId,order){
  return new Promise((resolve,reject)=>{
    const orderId = Date.now();
    const newOrder = {
        userId: userId,
        item: order.item,
        store: order.store,
        number: order.number,
        price: order.price,
        confirm:false,
        paid: false,
        score: 0,
        comment: "",
        orderId: orderId
    };
    getOrderList().then(orders =>{
      orders = [
        newOrder,
        ...orders
      ];
      fs.writeFile('orderList-data.json', JSON.stringify(orders), err => {
          if (err) reject(err);
      });
      resolve(newOrder);
    });
  });
}
function getOrderList(userId){

  /*
  return new Promise((resolve,reject)=>{
    if(!fs.existsSync('orderList-data.json')){
      fs.writeFileSync('orderList-data.json','');
    }
    fs.readFile('orderList-data.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let orders = data ? JSON.parse(data) : [];
            if (orders.length > 0 && userId) {
                //console.log(userId)
                orders = orders.filter(p => {
                  //console.log(p.userId);
                    return p.userId==userId;

                });
            }
            resolve(orders);
        });

    });*/
}
function getStoreOrder(storeId){
  return new Promise((resolve,reject)=>{
    if(!fs.existsSync('orderList-data.json')){
      fs.writeFileSync('orderList-data.json','');
    }
    fs.readFile('orderList-data.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let orders = data ? JSON.parse(data) : [];
            if (orders.length > 0 && storeId) {
                console.log(storeId)
                orders = orders.filter(p => {
                  console.log(p.store);
                    return p.store==storeId;

                });
                resolve(orders);
            }
            resolve(null);
        });

    });
}
function confirmOrder(order){
  return new Promise((resolve,reject)=>{

    getOrderList().then(orders =>{
      orders = orders.filter(p => {
        console.log(p.orderId == order.orderId);
        console.log(p.userId != order.userId);
          return (p.userId != order.userId)||(p.userId == order.userId && p.orderId != order.orderId);

      });
      order.confirm = true;
      orders = [
        order,
        ...orders
      ];
      fs.writeFile('orderList-data.json', JSON.stringify(orders), err => {
          if (err) reject(err);
      });
      resolve();
    });
  });
}
module.exports = {
    setOrder,
    getOrderList,
    getStoreOrder,
    confirmOrder
};
