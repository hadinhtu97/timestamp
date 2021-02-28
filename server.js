
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", function (req, res) {
  res.send('Backend API app! Read README to use API.');
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

app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});
