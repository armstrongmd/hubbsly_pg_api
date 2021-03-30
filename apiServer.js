const startupDebugger = require('debug')('app:startup')
const morgan = require('morgan')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...')
}

// CORS
var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type = application/json
app.use(bodyParser.json());

// parse requests of content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.json({ message: 'Hello, welcome to the Hubbsly API' })
);

require('./app/routes/toDoItems.routes')(app);

// connect to the db
const db = require('./app/models');
const { sequelize, Sequelize } = require('./app/models');
//const toDoItemModel = require('./app/models/toDoItem.model');
//const ToDoItem = db.toDoItems;

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
  initial();
});

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established.');
  })
  .catch((err) => {
    console.error('Unable to connect to the databse:', err);
  });

// Temp User - tie to user service later
const User = sequelize.define(
  'user',
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    address: {
      type: Sequelize.JSONB
    }
  },
  {
    // options
  }
);

//User.sync({ force: true });

// Temp ToDo Item
const ToDoItem = sequelize.define('toDoItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Hubbsly API is running on port ${PORT}...`)
);

function initial() {
  User.create({
    id: 1,
    firstName: 'Fred',
    lastName: 'Flinstone',
    address: {
      address1: '345 Cave Stone Road',
      city: 'Bedrock',
      state: 'Stone Age America',
      zipCode: '88888',
      county: 'Cobblestone County'
    }
  });
  User.create({
    id: 2,
    firstName: 'Wilma',
    lastName: 'Flinstone',
    address: {
      address1: '345 Cave Stone Road',
      city: 'Bedrock',
      state: 'Stone Age America',
      zipCode: '88888',
      county: 'Cobblestone County'
    }
  });
  User.create({
    id: 3,
    firstName: 'Barney',
    lastName: 'Rubble',
    address: {
      address1: '347 Cave Stone Road',
      city: 'Bedrock',
      state: 'Stone Age America',
      zipCode: '88888',
      county: 'Cobblestone County'
    }
  });
  User.create({
    id: 4,
    firstName: 'Betty',
    lastName: 'Rubble',
    address: {
      address1: '347 Cave Stone Road',
      city: 'Bedrock',
      state: 'Stone Age America',
      zipCode: '88888',
      county: 'Cobblestone County'
    }
  });

  ToDoItem.create({
    id: 1,
    name: 'Walk the Dog',
    description: 'Walk the dog for 30 min.',
    isActive: true
  });

  ToDoItem.create({
    id: 2,
    name: 'Pack up the bedroom',
    description: 'Pack up the bedroom so that we can move on Friday.',
    isActive: false
  });

  ToDoItem.create({
    id: 3,
    name: 'Run to the grocery store',
    description: 'kentucky Bourbon Barrel Ale',
    isActive: false
  });
}
