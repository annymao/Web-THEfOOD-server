
const bodyParser = require('body-parser')
const express = require('express');
const accRouter = require('./routers/router.js');
const errorHandler = require('./middleware/error-handler.js');
const app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('dist'));
app.use('/api',accRouter);
app.use(errorHandler);
const port = 8886;
app.listen(port, () => {
  console.log(`Server is running up at ${port}...`);
});
