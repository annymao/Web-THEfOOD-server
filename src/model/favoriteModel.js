const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function addFavorite(userID, storeName, mealName, mealPrice) {
	const sql = `
		INSERT INTO favorites(userId, storename, mealname, mealprice)
		VALUES ($1, $2, $3, $4)
	`;

	return db.any(sql, [userID, storeName, mealName, mealPrice]);
}

function removeFavorite(userID, storeName, mealName, mealPrice) {
	const sql = `
		DELETE FROM favorites
		WHERE userId = $1 AND storename = $2 AND mealname = $3 AND mealprice = $4
	`;

	return db.any(sql, [userID, storeName, mealName, mealPrice]);
};

function getFavorite(userID) {
	const sql = `
		SELECT *
		FROM favorites
		WHERE userId = $1
	`;

	return db.any(sql, [userID]);
};

module.exports = {
    addFavorite,
		removeFavorite,
		getFavorite
};
