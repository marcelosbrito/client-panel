const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');

require('dotenv').config();

const cpanel = express();
const port = process.env.PORT || 5000;

cpanel.use(cors());
cpanel.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

cpanel.use('/projects', projectsRouter);
cpanel.use('/clients', clientsRouter);

cpanel.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});