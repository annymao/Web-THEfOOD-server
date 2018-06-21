require('../../config.js');

const pgp = require('pg-promise')();
db = pgp(process.env.DB_URL);

const schemaSql =`
  DROP TABLE IF EXISTS acc;
  DROP TABLE IF EXISTS favorites;
  DROP TABLE IF EXISTS lists;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS store;
  DROP TABLE IF EXISTS meals;

  CREATE TABLE acc(
    id              serial PRIMARY KEY NOT NULL,
    account         text NOT NULL,
    password        text NOT NULL,
    name            text NOT NULL,
    email           text NOT NULL,
    role            text NOT NULL
  );

  CREATE TABLE favorites (
    id              serial PRIMARY KEY NOT NULL,
    userId          integer NOT NULL,
    storename       text NOT NULL,
    mealname        text NOT NULL,
    mealprice       integer NOT NULL DEFAULT 0
  );


  CREATE TABLE orders(
    id              serial PRIMARY KEY NOT NULL,
    userId          integer NOT NULL,
    store           text NOT NULL,
    locate          text NOT NULL,
    confirm         boolean NOT NULL DEFAULT FALSE,
    paid            boolean NOT NULL DEFAULT FALSE,
    comment         text NOT NULL
  );

  CREATE TABLE lists(
    oid             integer references orders(id),
    item            text NOT NULL,
    number          integer NOT NULL DEFAULT 0,
    price           integer NOT NULL DEFAULT 0,
    score           integer
  );

  CREATE TABLE store(
    restaurant      text NOT NULL,
    storeId         serial PRIMARY KEY NOT NULL,
    name            text NOT NULL,
    description     text NOT NULL,
    background      text NOT NULL,
    grades          text NOT NULL,
    open            boolean NOT NULL DEFAULT TRUE
  );

  CREATE TABLE meals(
    storename      text NOT NULL,
    mealname       text NOT NULL,
    mealprice      integer NOT NULL DEFAULT 0
  );
`;
const dataSql = `
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'三代目牛肉麵','牛肉麵、乾麵系列','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c53.0.540.540/p180x540/29350736_2052704571411836_5353569300152057856_n.jpg?_nc_cat=0&oh=cbd9bd451dff2f2d1d2cb6d20ff036d3&oe=5B9432D0','4.5',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'三顧茅廬','麻辣滷味','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c90.0.540.540/p180x540/29599422_1696418267101781_7893933728638959616_n.jpg?_nc_cat=0&oh=5b2bfbc9b4257fc13d4faaf87562b2bc&oe=5B50F120','5.0',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'川億食堂','鐵板料理','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c90.0.540.540/p180x540/29350844_1698521323567874_7471028339319242752_n.jpg?_nc_cat=0&oh=95415a2683d132428ca55c3e858d92cf&oe=5B527F79','4.8',false);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'韓食料理','韓式料理','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c0.92.552.552/p552x414/29354133_2300617046618777_3033869614044938240_n.jpg?_nc_cat=0&oh=116190e349bb06ecabf70f55fae9c640&oe=5B8FE0E7','3.0',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'晨光早午餐','西式早午餐','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c13.0.540.540/p180x540/15085309_1206936556029283_2170271567651536896_n.jpg?_nc_cat=0&oh=39992fe3029b5913a9a0b8bfe9b831aa&oe=5B4FF6B0','4.0',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'弘謙食堂','炒飯、麵、小火鍋','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c17.0.540.540/p180x540/15085241_1273079829429442_2051673690814283776_n.jpg?_nc_cat=0&oh=a0f2bc3655dd82774bbf8060c9257143&oe=5B57FE91','1.0',false);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'和風風味屋','日式蛋包飯','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c40.0.540.540/p180x540/15085408_1421667921195716_2243706561996259328_n.jpg?_nc_cat=0&oh=aac894a463e7c80ce47d8df256b74070&oe=5B8FA2C3','4.3',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'八方雲集','鍋貼、水餃','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c27.0.540.540/p180x540/15085385_1142436209157465_1167677573421858816_n.jpg?_nc_cat=0&oh=c26e5ea099614412f1389749e7194491&oe=5B879BF9','3.5',true);
  INSERT INTO store(restaurant,name,description,background,grades,open)
  VALUES (1,'酷雞雞排','飯類、炸物、點心','https://scontent-tpe1-1.xx.fbcdn.net/v/t45.5328-0/c109.0.540.540/p180x540/15085380_1016450035144593_2436428582155714560_n.jpg?_nc_cat=0&oh=5327b54e2f29f81a860464c41251ba6d&oe=5B8A6657','5.0',false);


  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','原味牛肉拉麵',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','蒜味牛肉拉麵',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵1',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵2',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵3',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵4',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵5',100);
  INSERT INTO meals(storename,mealname,mealprice)
  VALUES ('三代目牛肉麵','牛肉拉麵5',100);
`;
db.none(schemaSql).then(()=>{
  console.log('Schema created');
  db.none(dataSql).then(()=>{
    console.log('data created');
  }).catch(err=>{
    console.log('DATA ERROR',err);
  });
}).catch(err=>{
  console.log('ERROR',err);
})
