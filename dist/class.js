"use strict";
class Department {
    constructor(n, age) {
        this.name = n;
        this.age = age;
    }
    describe() {
        console.log('Department : ' + this.name);
    }
}
const accounting = new Department('Accounting', 20);
accounting.describe();
const accountingCopy = { describe: accounting.describe, name: 'First time', age: 39 };
accountingCopy.describe();
const data1 = {
    name: 'Amit',
    age: 30,
    greet(text) {
        console.log("Hello, " + text);
    }
};
console.log('age' in data1);
console.log(data1 instanceof Department);
console.log(accounting instanceof Department);
const a = {
    name: 'ketan',
    age: 30
};
console.log(a);
const userinput = document.getElementById('user-input');
const userinput1 = document.getElementById('user-input');
const userinput2 = document.getElementById('user-input');
const errBag1 = {
    2: '10',
    new: {
        joint: 'Hii'
    }
};
console.log(errBag1.new);
const z = a || 'Default';
const v = a !== null && a !== void 0 ? a : 'Only when a is null or undefined';
//# sourceMappingURL=class.js.map