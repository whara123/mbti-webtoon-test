var express = require('express');
var router = express.Router();

const app = express();
const port = process.env.PORT || 5000;
app.listen(port);

let getCrawler = require('../crawler');

app.use('/getData', async function (req, res) {
  let result;

  if (req.query.name) {
    result = await getCrawler.crawler(req.query.name);
  } else {
    result = await getCrawler.crawler('all');
  }
  console.log(JSON.stringify(result));
  res.send(result);
});

module.exports = router;
