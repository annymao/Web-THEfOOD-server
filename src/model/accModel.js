const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

require('../../config.js');

if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
};

// Account Model Method
// CREATE - setAccount
// DUPLICATE - getAccount
// VALIDATE - confirmAccount

function getAccount(account=' ') {

    const where = ` Where account LIKE '$1:value'`;
    const sql = `
        SELECT *
        FROM acc
        ${where}
    `;

    return db.any(sql, account);

}

function setAccount(account, password, role, name, email) {

  const sql = `
    INSERT INTO acc(account, password, name, email, role)
    SELECT $<account>, $<password>, $<name>, $<email> ,$<role>
    WHERE NOT EXISTS (SELECT 1 FROM acc WHERE account=$<account>)
    RETURNING *
  `;

   return db.any(sql, {account, password, role, name, email});
}

function confirmAccount(account, password, role){

  const where = ` WHERE account = '$1:value' AND password = '$2:value' AND role = '$3:value'`;

  const sql = `
      SELECT *
      FROM acc
      ${where}
  `;

  console.log("IN accModel - confirmAccount sql : ", sql);

  return db.any(sql, [account, password, role]);
}

function modifyAccount(account, password, role, newPassword) {

  const sql = `
    UPDATE acc
    SET password = $1
    WHERE account = $2 AND password = $3 AND role = $4
  `;

  return db.any(sql, [newPassword, account, password, role]);

}

module.exports = {
    setAccount,
    getAccount,
    confirmAccount,
    modifyAccount
};
