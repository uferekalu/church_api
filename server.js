const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js')
const cors = require('cors')
const church = require("./routes/users.js");
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api", church);

app.listen(process.env.PORT, () => {
    console.log(`The API is running on port ${process.env.PORT}`)
})