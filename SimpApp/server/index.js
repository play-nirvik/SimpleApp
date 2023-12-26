const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const datastore = require('./datastore');
const util = require('util');
const crypto = require('crypto');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const scrypt = util.promisify(crypto.scrypt);
// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;

// The body-parser middleware
// to parse form data
app.use(bodyParser.json({extended: true}));

// Enable CORS
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

// Main Code Here  //
// Generating JWT
const generateToken = userData => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(userData, jwtSecretKey);

  return token;
};

const getTokensFromDatastore = async () => {
  const records = await datastore.getAllRecords();

  const allTokens = records.map(tkn => tkn.deviceToken);
  console.log('Push triggered for devices -> ', allTokens);
  return allTokens || [];
};

const sendMessage = async () => {
  // Fetch the tokens from an external datastore (e.g. database)
  const tokens = await getTokensFromDatastore();

  if (!tokens) {
    return false;
  }

  // Send a message to devices with the registered tokens
  await admin.messaging().sendMulticast({
    tokens,
    data: {
      notifee: JSON.stringify({
        body: 'This message was sent via FCM!',
        android: {
          channelId: 'default',
          actions: [
            {
              title: 'Mark as Read',
              pressAction: {
                id: 'read',
              },
            },
          ],
        },
      }),
    },
  });

  return true;
};

// Send messages to our users
app.get('/sendpush', async (req, res) => {
  const status = await sendMessage();

  if (status) {
    res.send('Push message triggered');
  } else {
    res.status(404).json({msg: 'No devices registered'});
  }
});

// Verification of JWT
app.get('/user/validateToken', (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.status(200).send('Successfully Verified');
    } else {
      // Access Denied
      return res.status(401).send({msg: 'Access Denied'});
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

app.post('/register', async (req, res) => {
  const {country, username, email, password, deviceToken} = req.body;

  const record = await datastore.findOneBy({
    email: email,
  });

  // If record not found by given username
  if (record.email === email) {
    return res.status(400).send('User already exists.');
  }

  const addedRecord = await datastore.createNewRecord({
    country,
    username,
    email,
    password,
    deviceToken,
  });

  console.log(`Added Record :
    ${JSON.stringify(addedRecord, null, 4)}`);

  res.send('User created');
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const record = await datastore.findOneBy({
    username: username,
  });

  // If record not found by given username
  if (Object.keys(record).length === 0) {
    return res.status(404).json({message: 'User not found'});
  }

  // Hashed and salt of database password
  const [hashed, salt] = record.password.split('.');

  // Hashing raw password submitted by the user
  // to sign in third argument is the key length
  // that must be same when hashing the password
  // to store it into the database when user sign up
  const hashedBuff = await scrypt(password, salt, 64);
  console.log(hashed);
  console.log(hashedBuff.toString('hex'));

  // Compare saved hashed of database and
  // obtained hashed
  const isValid = hashed === hashedBuff.toString('hex');

  if (isValid) {
    const data = {
      time: Date(),
      email: record.email,
      username: record.username,
      country: record.country,
    };

    console.log(data);

    const jwtToken = generateToken(data);
    return res.json({
      username: record.username,
      country: record.country,
      email: record.email,
      token: jwtToken,
    });
  }

  return res.status(403).json({message: 'Invalid Password'});
});
