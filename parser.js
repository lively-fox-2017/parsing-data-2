"use strict"
const yamlParser = require('js-yaml');
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = this._stringToDate(created_at);
  }

  _stringToDate (dateString) {
    //2012-04-21T01:57:17-07:00
    //console.log(dateString);
    let date = new Date(dateString);
    //console.log(Date.parse(dateString));
    return date;
    console.log(date.toISOString());
  }

  toString(){
    //1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00
    let result = '';
    result += `${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`;
    return result;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this._arrayOfStringToArrOfObj();
  }

  _filePeopleToArray () {
    let tampunganExistingData = fs.readFileSync(this._file, 'utf8');
    let arr = tampunganExistingData.split('\n')
    arr.shift();
    return arr;
  }

  _arrayOfStringToArrOfObj (){
    let arr = this._filePeopleToArray();
    let tempArr = [];
    let result = [];
    let person = new Person();
    let id, first_name, last_name, email, phone, created_at;
    for (let str of arr) {
      //dari string , split per ','
      tempArr = str.split(',');
      id = tempArr[0];
      first_name = tempArr[1];
      last_name = tempArr[2];
      email = tempArr[3];
      phone = tempArr[4];
      created_at = tempArr[5];
      person = new Person(id, first_name, last_name, email, phone, created_at)
      result.push(person);

    }
    result.pop();
    return result;
  }

  _arrayOfObjectToYaml() {
    let result = yamlParser.dump(this._people);
    return result;
  }

  _yamlToArrayOfObject() {
    let result = yamlParser.dump(this._people);
    return result;
  }

  _stringToJson() {
    let result = '{';
    for (let i = 0;i<this._people.length;i++){
      result+=JSON.stringify(this._people[i])+',\n'
    }
    result+='}'
    return result;
  }

  get people() {
    return this._people
  }

  addPerson(person) {
    person.id = this._people.length;
    this._people.push(person);
  }

  save(){
    let result = 'id,first_name,last_name,email,phone,created_at\n'
    for (let person in this._people) {
      result+=this._people[person].id+',';
      result+=this._people[person].first_name+',';
      result+=this._people[person].last_name+',';
      result+=this._people[person].email+',';
      result+=this._people[person].phone+',';
      result+=this._people[person].created_at.toISOString()+'\n';
    }
    //result +=  this._people.join('\n')
    fs.writeFileSync(this._file, result);
  }

  save_as_yaml() {
    fs.writeFileSync(this._file, this._arrayOfObjectToYaml());
  }

  save_as_json() {
    fs.writeFileSync(this._file, this._stringToJson());
  }
}

var parser = new PersonParser('people.csv')
//parser.save_as_yaml();
//parser.save_as_json();
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
