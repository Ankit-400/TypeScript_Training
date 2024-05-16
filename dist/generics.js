"use strict";
const colors = ['red', 'yellow', 'green'];
const colors1 = ['red', 'yellow', 'green'];
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Max', hobbies: ['Sports', 'Reading'] }, { age: 30 });
console.log(mergeObj);
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ name: 'first', age: 4 }, 'name'));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        const itemIndex = this.data.indexOf(item);
        if (itemIndex === -1)
            return;
        this.data.splice(itemIndex, 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['Maxi', 'Mini'];
//# sourceMappingURL=generics.js.map