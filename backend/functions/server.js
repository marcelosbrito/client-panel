const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config({path: __dirname + '/.env'});
const app = express();
// LOCALHOST PORT
//const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

/* LOCALHOST CONNECTION
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/
exports.app = functions.https.onRequest(app);