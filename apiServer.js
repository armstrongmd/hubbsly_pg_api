const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type = application/json
app.use(bodyParser.json());

// parse requests of content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'Hello Hubbsly' }));

// connect to the db
const db = require('./app/models');
const { sequelize } = require('./app/models');
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established.');
  })
  .catch((err) => {
    console.error('Unable to connect to the databse:', err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Hubbsly API is running on port ${PORT}...`)
);
