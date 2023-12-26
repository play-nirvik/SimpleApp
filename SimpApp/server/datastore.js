// Importing node.js file system module
const fs = require('fs');
const util = require('util');
const crypto = require('crypto');

// Convert callback based scrypt method
// to promise based method
const scrypt = util.promisify(crypto.scrypt);

class DataStore {
  constructor(filename) {
    // Filename where datas are going to store
    if (!filename) {
      throw new Error('Filename is required to create a datastore!');
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      // If file not exist
      // it is created with empty array
      fs.writeFileSync(this.filename, '[]');
    }
  }

  // Method to fetch all records
  async getAllRecords() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      }),
    );
  }

  // Logic to add data
  async createNewRecord(attributes) {
    const records = await this.getAllRecords();
    const {password} = attributes;

    // SALT
    const salt = crypto.randomBytes(8).toString('hex');

    // HASHED buffer
    const hashedBuff = await scrypt(password, salt, 64);

    // HASHED and SALTED password
    const hashedSaltPassword = `${hashedBuff.toString('hex')}.${salt}`;

    // Create new record with hashed and
    // salted password instead of raw password
    const record = {
      ...attributes,
      password: hashedSaltPassword,
    };

    records.push(record);

    // Write all records to the database
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2),
    );

    return record;
  }

  async findOneBy(attrs) {
    // Read all file contents of
    // the datastore
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    // Parsing json records in javascript
    // object type records
    const records = JSON.parse(jsonRecords);

    // Iterating through each record
    for (let record of records) {
      let found = true;

      // Iterate through each given
      // propert for each record
      for (let key in attrs) {
        // If any given property not
        // matches with record record
        // is discarded
        if (record[key] !== attrs[key]) {
          found = false;
        }
      }
      // If 'found' remains true after
      // iterating through each given
      // property that means record found
      if (found) {
        return record;
      }
    }

    // If record not found
    return {};
  }
}

// The 'datastore.json' file created at
// runtime and all the information
// provided via signup form store in
// this file in JSON format.
module.exports = new DataStore('datastore.json');
