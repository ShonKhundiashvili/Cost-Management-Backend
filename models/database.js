// Shon Khundiashvili 332326305
// Netanel Yomtovian 207498700
// Chen Bello 315129015

const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();
mongoose.set('strictQuery', true);

//Connecting to the database
try {
  const password = process.env.PASSWORD;
  const userName = process.env.USER_NAME;
  const connectionString = `mongodb+srv://${userName}:${password}@serverside.djqrb8k.mongodb.net/Server-Side-Project?retryWrites=true&w=majority`;
  mongoose.connect(connectionString, { useNewUrlParser: true });
  const db = mongoose.connection;

  //Once the database is opened this event listener will be executed
  db.once('open', () => {
    console.log('connected!');
  });

  //Creating the user schema and cost schema
  const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    birthday: Date,
  });

  const costSchema = new mongoose.Schema({
    user_id: Number,
    day: {
      type: Number,
      required: false,
      validate: [validatorDayOfMonth, 'Allowed session values are 1 to 31'],
    },
    month: {
      type: Number,
      required: false,
      validate: [validatorMonths, 'Allowed session values are 1 to 12'],
    },
    year: {
      type: Number,
      required: false,
      validate: [validatorYear, 'Allowed session values are 1900 - 2023'],
    },
    id: {
      type: String,
      index: true,
      required: true,
      unique: true,
      default: () => crypto.randomUUID(),
    },
    description: String,
    category: {
      type: String,
      enum: [
        'food',
        'sport',
        'health',
        'housing',
        'education',
        'transportation',
        'other',
      ],
    },
    sum: Number,
  });

  const reportSchema = new mongoose.Schema({
    report: {
      type: JSON,
      required: true,
      default: {
        food: [],
        health: [],
        housing: [],
        other: [],
        education: [],
        sport: [],
        transportation: [],
      },
    },
    user_id: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  });

  //Define user cost and report models
  const User = mongoose.model('User', userSchema);
  const Cost = mongoose.model('Cost', costSchema);
  const Report = mongoose.model('Report', reportSchema);

  //The functions for validation
  function validatorDayOfMonth(v) {
    return v >= 1 && v <= 31;
  }

  function validatorMonths(v) {
    return v >= 1 && v <= 12;
  }

  function validatorYear(v) {
    return v >= 1900 && v <= 2023;
  }

  //Creating a single document of a user Moshe Israeli
  const user = new User({
    id: '123123',
    first_name: 'Moshe',
    last_name: 'Israeli',
    birthday: new Date(1990, 0, 11),
  });

  async function createUserIfNotExists(user) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ id: user.id });
      if (existingUser) {
        console.log(`User already exists ${user}, not creating`);
        return existingUser;
      }

      // Create new user
      const newUser = await User.create(user);
      console.log(`User created: ${newUser}`);
      return newUser;
    } catch (err) {
      console.error(err);
    }
  }

  createUserIfNotExists(user).catch(console.error);

  module.exports = { Cost, User, Report };
} catch (error) {
  console.log(error);
}
