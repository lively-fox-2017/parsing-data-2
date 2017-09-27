"use strict"

const fs = require("fs");
const faker = require("faker");
const yaml = require("node-yaml");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(first_name, last_name, email, phone){
	this.first_name = first_name;
	this.last_name = last_name;
	this.email = email;
	this.phone = phone;
	this.created_at = new Date();
  }
}

class PersonParser {

  constructor(file) {
    this.file = file;
    this._people = null;
	this._add = null;
  }

  setPeople() {
	let arrPeople = [];
	for (let i = 1; i < this.file.length; i++){
		let peoplePecah = this.file[i].split(",");
		arrPeople.push({id:peoplePecah[0], first_name:peoplePecah[1], last_name:peoplePecah[2], email:peoplePecah[3], phone:peoplePecah[4], created_at:peoplePecah[5]});
	}
	
	this._people = arrPeople;
  }
  
  get people() {
    // If we've already parsed the CSV file, don't parse it again.
    if (this._people !== null)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here.  Save the
    // Array in the this.people instance variable.
  }
  
  addPerson(personBaru){
	let id = this._people.length + 1;
	let sebaris = id + "," + personBaru.first_name + "," + personBaru.last_name + "," + personBaru.email + "," + personBaru.phone + "," + personBaru.created_at.toISOString();
	
	this._add = sebaris;
	
	let kata = this._add.split(",");
	this._people.push({id:kata[0], first_name:kata[1], last_name:kata[2], email:kata[3], phone:kata[4], created_at:kata[5]});
	
	return this._add;
  }

  save() {
	let addFile = fs.appendFileSync('people.csv', "\n"+this._add);
  }

  save_as_yaml() {
	let addFile = yaml.writeSync('people.yaml', this._people);
  }

  save_as_json() {
	let addFile = fs.writeFileSync('people.json', JSON.stringify(this._people, null, 2))
  }
}

let isiFile = fs.readFileSync('people.csv').toString().split("\n");

var parser = new PersonParser(isiFile);
parser.setPeople();
parser.addPerson(new Person(faker.name.findName(), faker.name.findName(), faker.internet.email(), faker.phone.phoneNumberFormat()));
parser.save();
parser.save_as_yaml();
parser.save_as_json();

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);