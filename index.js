const express = require("express");
const port = 3000;
const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log("Application is running in port: " + port);
})