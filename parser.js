"use strict"
var YAML = require('yamljs');
var fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(firstName, lastName, email, phone, createdAt) {
    this._id = 0;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get phone() {
    return this._phone;
  }

  set phone(phone) {
    this._phone = phone;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again.
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here.  Save the
    // Array in the this.people instance variable.
  }
  fillData() {
    var data = fs.readFileSync(this._file).toString().split('\n');
    for (var i = 1; i < data.length - 1; i++) {
      var personData = data[i].split(',');
      var obj = new Person();
      obj.id = personData[0];
      obj.firstName = personData[1];
      obj.lastName = personData[2];
      obj.email = personData[3];
      obj.phone = personData[4]
      obj.createdAt = new Date(personData[5]);
      this._people.push(obj);
    }
  }

  save() {}

  save_as_yaml() {
    // parse YAML string
    var text = "";
    for (var i = 0; i < this.people.length; i++) {
      var yamlString = YAML.stringify(this.people[i], 4);
      text += yamlString;
    }
    fs.writeFile('tes.yml', text, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    // Generate YAML
  }

  save_as_json() {
    var text = "";
    for (var i = 0; i < this.people.length; i++) {
      text += JSON.stringify(this.people[i]);
      text += "\n"
    }
    fs.writeFile('tes.json', text, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
  load() {
    var nativeObject = YAML.load('tes.yml');
    console.log(nativeObject);
  }
}

var parser = new PersonParser('people.csv')
parser.fillData();
// parser.save_as_yaml();
parser.save_as_json();
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
