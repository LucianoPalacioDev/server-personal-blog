require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
