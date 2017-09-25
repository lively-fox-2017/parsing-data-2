"use strict"

// require FileSystem
let fs = require('fs');

// require js-yaml
let yaml = require('js-yaml');

class Person {

  constructor (id, firstName, lastName, email, phone, createdAt) {

    this.id        = id;
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;

  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {

    if (this._people.length)
      return this._people

    let readFromCSV = fs.readFileSync(this._file).toString().split('\n');

    for (let i = 1; i < readFromCSV.length; i++) {

      let record = readFromCSV[i].split(',');

      this._people.push(new Person(

        // id
        parseInt(record[0]),
        // firstName
        record[1],
        // lastName
        record[2],
        // email
        record[3],
        // phone
        record[4],
        // createdAt
        record[5]

      ));

    }

    return this._people;

  }

  save_as_yaml() {

    let yamlFormatting = {};

    let fetchWithoutId = function ({firstName, lastName, email, phone, createdAt}) {

      return {firstName, lastName, email, phone, createdAt};

    };

    // Fetch objects and add it to yamlFormatting for dumping yaml
    for (let i = 0; i < this._people.length; i++) {

      yamlFormatting[this._people[i].id] = fetchWithoutId(this._people[i]);

    }

    // Generate new yaml file
    fs.writeFileSync('people.yaml', yaml.dump(yamlFormatting));

    console.log('Saved as yaml!');

  }

  save_as_json() {

    fs.writeFileSync('people.json', JSON.stringify(this._people, null, '\t'));

    console.log('Saved as JSON!');

  }
}

var parser = new PersonParser('people.csv');

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// Read from CSV
parser.people;

// Save as yaml
parser.save_as_yaml();

// Save as json
parser.save_as_json();
