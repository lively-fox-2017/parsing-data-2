"use strict"

const fs = require('fs');
const yaml = require('node-yaml')
// const jsonexport = require('jsonexport');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []


    let arr = fs.readFileSync(file).toString().split("\n");

    for (let r = 1; r < arr.length - 1; r++) {
      let arrRow = arr[r].split(',')
      let person = new Person(Number(arrRow[0]), arrRow[1], arrRow[2], arrRow[3], arrRow[4], arrRow[5])
      this._people.push(person)
    }
  }

  get people() {
    return this._people
  }

  get size() {
    return this._people.length
  }

  get file() {
    return this._file
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
  }

  save_as_yaml(newFile) {
    yaml.writeSync(newFile, this.people)
  }

  save_as_json(newFile) {

    let myJSON = JSON.stringify(this.people);
    fs.writeFileSync(newFile, myJSON)

  }
}

var parser = new PersonParser('people.csv')

parser.save_as_yaml('people.yml')
parser.save_as_json('people.json')
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
