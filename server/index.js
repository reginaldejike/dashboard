require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const PORT = process.env.PORT || 5000;

connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/users', require('./routes/user'));
app.use('/login', require('./routes/auth'));

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 page not found' });
  } else {
    res.type('txt').send('404 not found ');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
