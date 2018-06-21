const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function setOrder (userId, order, lists) {
  const sql = `
    INSERT INTO orders(userId, store, locate, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const sql_getOrderNum = `
    SELECT * FROM orders
    WHERE userId = $1
    ORDER BY id
    LIMIT 1
  `;

  const sql_setList = `
    INSERT INTO lists(oid, item, number, price)
    VALUES ($1, $2, $3, $4)
  `;

  db.any(sql, [userId, order.store_name, order.store_locate, ""])
    .then(function() {
      db.any(sql_getOrderNum, [userId])
        .then(function(data) {
          for (var i = 0; i < lists.length; i++) {
            db.any(sql_setList, [data[0].id, lists[i].meal_name, lists[i].meal_num, lists[i].meal_price])
          }
      })
    })

}
function getOrderList(userId){
  const sql_getLists = `
    SELECT * FROM lists
    WHERE oid = (
      SELECT id FROM orders
      WHERE userId = $1
      ORDER BY id DESC
      LIMIT 1
    )                                                                                                                                                                                          LIMIT 1);
  `;

  return db.any(sql_getLists, [userId]);
}

function getStoreOrder(storeId){
  const where = ` Where store ILIKE '%$1:value%'`;
  const sql = `
      SELECT *
      FROM orders
      ${where}
  `;
  return db.any(sql,storeId);
}

function confirmOrder (orderID) {
  const sql = `
    UPDATE orders
    SET confirm = TRUE
    WHERE id = $1
  `;

  return db.any(sql, [orderID]);
}

function payOrder (orderID) {
  const sql = `
    UPDATE orders
    SET paid = TRUE
    WHERE id = $1
  `;

  return db.any(sql, [orderID]);
}

function checkOrder (orderID) {
    const sql = `
      SELECT *
      FROM orders
      WHERE id = $1
    `;

    return db.any(sql, [orderID]);
}

function getAllOrders (storeName) {
  const sql = `
    SELECT *
    FROM orders
    WHERE store = $1
  `;

  return db.any(sql, [storeName]);
}


module.exports = {
    setOrder,
    getOrderList,
    getStoreOrder,
    confirmOrder,
    getAllOrders,
    checkOrder,
    payOrder
};
