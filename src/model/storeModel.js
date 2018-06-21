const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');
// restaurant => location
function getStoreName(restaurant) {

  const where = restaurant ? ` Where restaurant ILIKE '%$1:value%'` : '';
  const sql = `
      SELECT *
      FROM store
      ${where}
  `;

  return db.any(sql, restaurant);
}

function getMealName(store) {

  const getStoreName = `
      SELECT name, restaurant
      FROM store
      WHERE storeid = $1
  `;

  return db.any(getStoreName, parseInt(store));
}

function getAllMealName(store) {

  const where = `Where storename ILIKE '%${store}%'`;
  const sql = `
      SELECT *
      FROM meals
      ${where}
  `;

  return db.any(sql, store);
}


module.exports = {
  getStoreName,
  getMealName,
  getAllMealName
};
