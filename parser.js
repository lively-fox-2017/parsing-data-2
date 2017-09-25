"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this.file = file
    this.people = []
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again.
    if (this.people)
      return this.people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here.  Save the
    // Array in the this.people instance variable.
  }

  save() {}

  save_as_yaml() {}

  save_as_json() {}
}

var parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
