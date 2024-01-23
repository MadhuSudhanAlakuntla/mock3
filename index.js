const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { connection } = require("./db");
const app = express();

app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/appointments', appointmentRoutes);

app.listen( 8000, async () => {
  try {
    await connection;
    console.log("Connected to DataBase(MongoDB)");
  } catch (err) {
    console.log(err);
    console.log("error while connecting to DataBase(MongoDB)");
  }
  console.log(`App is running on port 8000`);
});
