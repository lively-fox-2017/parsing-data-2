"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(id,fname,lname,email,phone,cd){

    //super(input)

    //this._input=input

    this._id=id
    this.f_name=fname
    this.l_name=lname
    this.email=email
    this.phone=phone
    this.c_date=cd

  }
}

class PersonParser {

  constructor(input) {
    this._input = input
    this._people = null
  }

  initFile(){
    let temp=[]
    let temp1=[]

    for(let i=0;i<this._input.length;i++){
      temp[i] = this._input[i].split(',')
    }

    for(let i=0;i<this._input.length;i++){
      temp1[i] = new Person(temp[i][0], temp[i][1], temp[i][2], temp[i][3], temp[i][4], temp[i][5])
    }

    this._people=temp1
    return this
  }

  get people() {
    console.log(this._people[this._people.length-1]._id)
    return this._people
  }

  addPerson(id, f_name, l_name, email, phone, cc) {

    let temp = new Person(id, f_name, l_name, email, phone, cc)
    this._people.push(temp)

    return this

  }

  save(){

    let temp='\n'+this._people[this._people.length-1]._id+','+this._people[this._people.length-1].f_name+','+this._people[this._people.length-1].l_name+','+this._people[this._people.length-1].email+','+this._people[this._people.length-1].phone+','+this._people[this._people.length-1].c_date

    var fs = require('fs')
    fs.appendFile('people.csv', temp, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }

  save_as_yaml(){

    var yaml = require('write-yaml')

    var data = {language: 'node_js', node_js: ['0.10', '0.11']};
    let temp={id: this._people[this._people.length-1]._id, f_name : this._people[this._people.length-1].f_name, l_name : this._people[this._people.length-1].l_name, email : this._people[this._people.length-1].email, phone : this._people[this._people.length-1].phone, date : this._people[this._people.length-1].c_date}
    yaml.sync('people1.yml', temp);
  }

  save_as_json(){

    var jsonfile = require('jsonfile')

    let temp=[{"id": this._people[this._people.length-1]._id, "f_name" : this._people[this._people.length-1].f_name, "l_name" : this._people[this._people.length-1].l_name, "email" : this._people[this._people.length-1].email, "phone" : this._people[this._people.length-1].phone, "date" : this._people[this._people.length-1].c_date}]

    let data = [{"nama": 'ahmadnizar'}]
    jsonfile.writeFile('people.json', temp, function (err) {
      //console.error(err)
    })
  }

}

var faker = require('faker');
var fs = require('fs')
var input = fs.readFileSync('people.csv').toString().split('\n')
//.toString().split("\n")


let parser = new PersonParser(input)
//console.log(parser)
parser.initFile()
parser.people

parser.addPerson(parseInt(parser._people[parser._people.length-1]._id)+1,faker.name.findName(),faker.name.findName(),faker.internet.email(),faker.phone.phoneNumberFormat(),faker.date.recent())
parser.save()
parser.addPerson(parseInt(parser._people[parser._people.length-1]._id)+1,faker.name.findName(),faker.name.findName(),faker.internet.email(),faker.phone.phoneNumberFormat(),faker.date.recent())
parser.save_as_yaml()

parser.addPerson(parseInt(parser._people[parser._people.length-1]._id)+1,faker.name.findName(),faker.name.findName(),faker.internet.email(),faker.phone.phoneNumberFormat(),faker.date.recent())
parser.save_as_json()

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
