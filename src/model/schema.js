require('../../config.js');
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
const schemaSql =`
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS acc;
  DROP TABLE IF EXISTS store;


  CREATE TABLE orders(
    id              serial PRIMARY KEY NOT NULL,
    userId          text NOT NULL,
    item            text NOT NULL,
    store           text NOT NULL,
    number          integer NOT NULL DEFAULT 0,
    price           integer NOT NULL DEFAULT 0,
    confirm         boolean NOT NULL DEFAULT FALSE,
    paid            boolean NOT NULL DEFAULT FALSE,
    score           integer NOT NULL DEFAULT 0,
    comment         text NOT NULL
  );
  CREATE TABLE acc(
    account         text NOT NULL,
    password        text NOT NULL,
    role            text NOT NULL
  );
  CREATE TABLE store(
    restaurant      integer NOT NULL DEFAULT 1,
    name            text NOT NULL,
    description     text NOT NULL,
    background      text NOT NULL
  );

`;

db.none(schemaSql).then(()=>{
  console.log('Schema created');

}).catch(err=>{
  console.log('ERROR',err);
})
