"use strict"
const fs = require('fs');
const yaml = require('node-yaml');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  parseFile() {
    let fileParsed = fs.readFileSync(this._file).toString().split('\r\n');
    fileParsed.forEach((value, key) => {
      if (key !== 0) {
        let person = new Person(...value.split(','));
        this._people.push(person);
      }
    })
  }

  // parseFile() {
  //   let buffer = this._people;
  //   this.readContent(function (err, data){
  //     let fileParsed = data.toString().split('\r\n');
  //     fileParsed.forEach((value, key) => {
  //       if (key !== 0) {
  //         let person = new Person(...value.split(','));
  //         // console.log(person);
  //         buffer.push(person);
  //       }
  //     });
  //   });
  // }
  //
  // readContent(callback) {
  //   fs.readFile(this._file, function read(err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     callback(null, data);
  //   });
  // }

  get people() {
    return this._people;
  }

  addPerson(person) {
    person.id = parseInt(this._people[this._people.length - 1].id) + 1;
    this._people.push(person);
  }

  save() {
    let str = '';
    this._people.forEach((obj) => {
      for (var key in obj) {
        if (key == 'created_at')
          str += obj[key].toISOString();
        else
          str += obj[key];
        str += ',';
      }
      str = str.slice(0, -1);
      str += '\r\n';
    });
    str = str.slice(0, -4);
    fs.writeFileSync(this._file, str);
  }

  save_as_yaml() {
    yaml.writeSync('people.yaml', this.people, "utf8");
  }

  save_as_json() {
    fs.writeFileSync('people.json', JSON.stringify(this.people, null, 4))
  }
}

var parser = new PersonParser('people.csv')
parser.parseFile();
parser.save_as_json();
// console.log(require('util').inspect(parser.people, {
//   maxArrayLength: null
// }));

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
