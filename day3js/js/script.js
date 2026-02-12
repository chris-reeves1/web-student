// vars

// primitives:

// String "" ''
// Number 
// BigInt
// Boolean true false  
// null
// undefined

// Reference types:

// Object - key value pair Data. {}
// Arrays - ordered list of values. []
// function - block of code you can repeat.

// let score = 10;
// score = 5;
// console.log(score)

// const PI = 3.1425976689
// console.log(PI)

// const age = 10;
// age = 20;

// naming convention
// camelCase
// no numbers to start
// no reserved words
// be consistant and descriptive. 

//let totalPrice;

// parsing

// let value = "100";
// let num = Number(value);
// console.log(num);

// let f = parseFloat("3.14");
// console.log();

// let age1 = 30;
// let text = String(age1);
// console.log(text);

// let x = 10;
// console.log(typeof x); // number


// objects/arrays
// conditionals
// loops
// functions

// OBJECTS:
// - like a folder/dictionary keeping track of State.

// const user = { 
//     name: "John",
//     age: 30,
//     isAdmin: true, // use camelCase
// };
// console.log(user);
// // accessing values
// console.log(user.name);
// console.log(user["age"]) // John

// //updating user
// user.name = "Jane";
// user["age"] = 25;
// console.log(user);

// user.email = "test@test.com";
// console.log(user);

// array
// const fruits = ["apple", "banana", "orange"];
// console.log(fruits);
// console.log(fruits[0]); // apple

// fruits[1] = "grape";
// fruits.push("kiwi");
// console.log(fruits);

// fruits.pop();
// console.log(fruits);

// for (let i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }

// loops

// //for loops use for anything iterable (arrays/objects)
// for (let i = 0; i < 5; i++) {   
//     console.log("count: ",i);
// }

// const numbers = [1, 2, 3, 4, 5];

// for (const num of numbers){
//     console.log(num);
// }

// // while loops:

// let counter = 0;
// while (counter < 5) {
//     console.log("counter: ", counter);
//     counter++;
// }

// conditionals

// isAdmin = false;
// isVerified = true;
// onHoliday = true;
                        
// if ((isAdmin || isVerified) && !onHoliday){
//     console.log("Access granted");
// } else {
//     console.log("Access denied");
// }


// else if

// const score = 85;

// if (score >= 90) {
//     console.log("Grade: A");}
// else if (score >= 80) {
//     console.log("Grade: B");}
// else if (score >= 70) {
//     console.log("Grade: C");
// } else { 
//     console.log("Grade: F");
// }

// let op = "+";
// switch (op) {
//     case "+":
//         console.log("Addition");
//         break;
//     case "-":
//         console.log("Subtraction");
//         break;
//     case "*":
//         console.log("Multiplication");
//         break;
//     case "/":
//         console.log("Division");
//        break;
//     default:
//         console.log("Invalid operator");
//}  

// functions

// function greet() {
//     console.log("Hello")
// } // () = params. 

// greet();

// function sayHello(name) { console.log("Hello, " + name); }

// sayHello();

// function add(a, b) {return a + b; }

// let result = add(5, 3);
// console.log(result);

// const multiply = (x, y) => x * y; // arrow function
// // () needed if no args or 2+ agrs.
// // () not needed for single arg.

// console.log(multiply(4, 5));

// const square = (x) => x * x;
// console.log(square(6));



