"use strict";
function add_numbers(n1, n2) {
    return n1 + n2;
}
console.log(add_numbers(10, 20));
const str = 'string';
const obj = {
    name: 'AbCd',
    age: 30,
    favItem: ['item1', 'item2', 'item3', 'item4'],
    fixedTuple: [10, 'Hii']
};
for (const item of obj.favItem) {
    console.log(item);
}
var Role;
(function (Role) {
    Role["ADMIN"] = "first role";
    Role[Role["AUTHOR"] = 30] = "AUTHOR";
    Role[Role["CLIENT"] = 9] = "CLIENT";
    Role[Role["TRAINEE"] = 10] = "TRAINEE";
})(Role || (Role = {}));
;
const data = 'anything';
let x = 20;
const obj2 = {
    input1: 300,
    someArray: ['heyy']
};
function fun1(n1, n2) {
    console.log('Result is : ', 2 * n1 - n2);
    return 2 * n1 - n2;
}
console.log(fun1(7, 20));
let funCopy;
funCopy = fun1;
function mul(n1, n2, addPayload) {
    let count = n1 * n2;
    addPayload(count);
}
mul(10, 8, (result) => {
    console.log(result + 100);
    return 10;
});
let y;
y = 'hii';
y = 20;
let main;
if (typeof y === 'string')
    main = y;
//# sourceMappingURL=demo.js.map