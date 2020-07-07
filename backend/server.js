const express = require('express');
const { connectDB, syncModels } = require('./config/db');
const cors = require('cors');

const carsRouter = require('./routes/cars');
const authRouter = require('./routes/auth');

// app init
const app = express();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/cars', carsRouter);
app.use('/auth', authRouter);

// connect to db
connectDB();
// create models if not exists
syncModels();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
