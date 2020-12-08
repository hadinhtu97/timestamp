
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const convertDate = (date) => {
  if (date === undefined) {
    return {
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    }
  } else {
    if (/\d{5,}/.test(date)) {
      return {
        unix: parseInt(date),
        utc: new Date(parseInt(date)).toUTCString()
      }
    } else {
      let dateObj = new Date(date);
      if (dateObj.toString() == "Invalid Date") {
        return {
          error: "Invalid Date"
        }
      } else {
        return {
          unix: dateObj.valueOf(),
          utc: dateObj.toUTCString()
        }
      }
    }
  }

}

app.get('/api/timestamp/:date?', (req, res) => {
  res.json(convertDate(req.params.date))
})

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
