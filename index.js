const express = require("express");
const port = 3000;
const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))
app.use(express.static(__dirname + '/public'));

const convertDate = (date) => {
  if (date === undefined) {
    return {
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    }
  } else {
    if (/\d{5,}/.test(date)) {
      return {
        unix : date,
        utc: new Date(parseInt(date)).toUTCString()
      }
    }else {
      let dateObj = new Date(date);
      if (dateObj.toString() == "Invalid Date") {
        return {
          error: "Invalid Date"
        }
      } else {
        return {
          unix: dateObj.getTime(),
          utc: dateObj.toUTCString()
        }
      }
    }
  }

}

app.get('/api/timestamp/:date?', (req, res) => {
  res.json(convertDate(req.params.date))
})

app.listen(port, () => {
  console.log("Application is running in port: " + port);
})