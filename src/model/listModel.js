const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function getList(userId) {
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

function getListbyOrderID (oID) {
  const sql = `
    SELECT * FROM lists
    WHERE oid = $1
  `;

  return db.any(sql, [oID]);
}

module.exports = {
    getList,
    getListbyOrderID
};
