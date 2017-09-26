"use strict"
const YAML = require('yamljs');
const fs=require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(){
  }
}

class PersonParser {

  constructor(file) {
    this.file = file
    this._people = this.readData(this.file)
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again.
    // if (this.people)
      return {size:this._people.length}

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here.  Save the
    // Array in the this.people instance variable.
  }
  readData(file){
    let arr=fs.readFileSync(file,'utf8').split(/\n/);
    var result = [];
    var headers=arr[0].split(",");

    for(var i=1;i<arr.length-1;i++){
  	  var obj = {};
  	  var currentline=arr[i].split(",");
  	  for(var j=0;j<headers.length;j++){
  		  obj[headers[j]] = currentline[j];
  	  }
  	  result.push(obj);
    }
    return result;
  }

  save() {}

  save_as_yaml() {
    // let yamlString = YAML.stringify(this._people, 4);
    // console.log(yamlString);
    fs.writeFile('people.YAML',YAML.stringify(this._people,4),(err)=>{
      if (!err){
        console.log('write file people.YAML success');
      }
    });
  }

  save_as_json() {
    fs.writeFile('people.JSON',JSON.stringify(this._people),(err)=>{
      if (!err){
        console.log('write file people.JSON success');
      }
    });
  }
}

var parser = new PersonParser('people.csv')
console.log(parser._people);
// console.log(parser.save_as_json());
parser.save_as_json();
parser.save_as_yaml();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
