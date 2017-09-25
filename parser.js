"use strict"
const fs = require('fs');
const yaml = require('js-yaml');

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
}

class PersonParser {

    constructor(file) {
        this._file = file;
        this._people = [];
    }

    readInput() {
        const input = fs
                        .readFileSync(this._file)
                        .toString()
                        .split('\n')
                        .map(person => person.split(','));

        this._header = input.splice(0, 1)[0];

        input.forEach(person => {
            let personObj = {};
            for (let i = 0; i < this._header.length; i++) {
                personObj[this._header[i]] = person[i];
            }
            this._people.push(personObj);
        });
    }

    get people() {
        // If we've already parsed the CSV file, don't parse it again.
        if (this._people) return this._people;

        // We've never called people before, now parse the CSV file
        // and return an Array of Person objects here.  Save the
        // Array in the this.people instance variable.
    }

    save() {
        const formattedHeader = this._header.join(',') + '\n';
        const formattedPeople = this._people
                                            .map(person => person.join(','))
                                            .join('\n');
        
        const formatted = formattedHeader + formattedPeople;
        fs.writeFileSync(this._file, formatted);
    }

    save_as_yaml() {
        let formatted = {};
        this._people.forEach(person => {
            formatted[person.first_name + ' ' + person.last_name] = person;
        })
        formatted = yaml.dump(formatted, {
            indent: 4
        });
        fs.writeFileSync('people.yaml', formatted);
    }

    save_as_json() {
        // 4 spaces rock!
        const formatted = JSON.stringify(this._people, null, '    ');
        fs.writeFileSync('people.json', formatted);
    }
}

var parser = new PersonParser('people.csv')
parser.readInput();
parser.save_as_json();
parser.save_as_yaml();
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
