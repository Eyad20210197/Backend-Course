// A. Part 1: Coding Questions

/* 1.  Convert the string "123" to a number and add 7.
    • Output Example: 130
*/
// let num = Number("123");
// let result = num + 7;
// console.log(result);


/* 2. Check if the given variable is falsy and return "Invalid" if it is.
    • Input Example: 0
    •  Output Example: "Invalid"
*/
// let variable = 0;
// if (!variable) console.log("Invalid");
// else console.log(variable);


/* 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
    • Output Example:1, 3, 5, 7, 9
*/
// for (let i = 1; i <= 10; i++) {
//     if (i % 2 === 0) {
//         continue;
//     }
//     else console.log(i);
// }


/* 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
    • Input Example: [1, 2, 3, 4, 5]
    • Output Example: [2,4]
*/
// let numbers = [1, 2, 3, 4, 5];
// let evenNumbers = numbers.filter(num => num % 2 === 0);
// console.log(evenNumbers);


/* 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
    • Input Example: [1, 2, 3], [4, 5, 6]
    • Output Example: [1, 2, 3, 4, 5, 6]
*/
// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];
// let mergedArray = [...array1, ...array2];
// console.log(mergedArray);


/* 6. Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday). (0.5 Grade)
    • Input Example: 2
    • Output Example: “Monday”
*/
// let dayNumber = 2;
// switch (dayNumber) {
//     case 1:
//         console.log("Sunday");
//         break;
//     case 2:
//         console.log("Monday");
//         break;
//     case 3:
//         console.log("Tuesday");
//         break;
//     case 4:
//         console.log("Wednesday");
//         break;
//     case 5:
//         console.log("Thursday");
//         break;
//     case 6:
//         console.log("Friday");
//         break;
//     case 7:
//         console.log("Saturday");
//         break;

//     default:
//         console.log("Invalid day number");
// }


/* 7. Create an array of strings and return their lengths using map method (0.5 Grade)
    • Input: ["a", "ab", "abc"]
    • Output Example: [1, 2, 3]
*/
// let strings = ["a", "ab", "abc"];
// let lengths = strings.map(str => str.length);
// console.log(lengths);


/* 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
    • Input Example: 15
    • Output Example: “Divisible by both”
*/
// function checkDivisibility(num) {
//     if (num % 3 === 0 && num % 5 === 0) {
//         return "Divisible by both";
//     }
//     else {
//         return "Not divisible by both";
//     }
// }
// let result = checkDivisibility(15);
// console.log(result);


/* 9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
    • Input Example: 5
    • Output Example: 25
*/
// let square = num => num ** 2;
// let result = square(5);
// console.log(result);


/* 10. Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
    • Input Example: const person = {name: 'John', age: 25}
    • Output Example: 'John is 25 years old'
*/
// function formatPerson({ name, age }) {
//     return `${name} is ${age} years old`;
// }
// let person = { name: "John", age: 25 };
// let result = formatPerson(person);
// console.log(result);


/* 11. Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
• Input Example: 1, 2, 3, 4, 5
• Output Example: 15
*/
// let sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);
// let result = sum(1, 2, 3, 4, 5);
// console.log(result);


/* 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
    • Output Example: “Success”
*/
// let successPromise = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Success");
//         }, 3000);
//     });
// }
// let result = successPromise();
// result.then(message => console.log(message));


/* 13. Write a function to find the largest number in an array. (0.5 Grade)
    •  Input Example: [1, 3, 7, 2, 4]
    • Output Example: 7
*/
// let findLargestNumber = arr => Math.max(...arr);
// let result = findLargestNumber([1, 3, 7, 2, 4]);
// console.log(result);


/* 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
    •  Input Example: name: "John", age: 30}
    •  Output Example: ["name", "age"]
*/
// let getObjectKeys = obj => Object.keys(obj);
// let result = getObjectKeys({ name: "John", age: 30 });
// console.log(result);


/* 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
    • Input: "The quick brown fox"
    • Output: ["The", "quick", "brown", "fox"]
*/
// let splitStringIntoWords = str => str.split(" ");
// let result = splitStringIntoWords("The quick brown fox");
// console.log(result);


// B. Part 2: Essay Questions

/*  1. What is the difference between forEach and for...of? When would you use each? (0.5 Grade)
    Use forEach when you want to execute the same operation on every array element and don't need to stop the loop early.
    Use for...of when you need to break or skip iterations, use asynchronous operations (await), or require more control over the iteration.
    // forEach
    const numbers = [1, 2, 3];
    numbers.forEach(num => {
     console.log(num);
    });

    // for...of
    for (const num of numbers) {
    if (num === 2) break;
     console.log(num);
    }
*/

/* 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade)
    Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during compilation. This means you can use functions and variables before they are declared in the code.
    The Temporal Dead Zone (TDZ) is the time between the start of a block and the point where a variable is declared. During this time, accessing the variable will result in a ReferenceError.
*/

/* 3. What are the main differences between == and ===?
    '==' is loose equality which compares two values after converting them to a common type, while '===' is strict equality which compares both value and type without type conversion.
    For example, 5 == '5' would return true, but 5 === '5' would return false because they are of different types (number vs string).
*/

/* 4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)
    The try-catch statement allows you to handle exceptions in your code. You place the code that may throw an error inside the try block, and if an error occurs, control is transferred to the catch block where you can handle the error gracefully. 
    This is especially important in async operations because errors can occur at any time, and using try-catch ensures that your application can handle these errors without crashing.
*/

/* 5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade)
    conversion is when you convert a value from one type to another using a function or method, while coercion is when JavaScript automatically converts a value to a different type during an operation.
    For example, type conversion:
    let num = Number("123"); // converts string to number
    let str = String(123); // converts number to string
    Coercion example:
    let result = 5 + "5"; // JavaScript coerces the number 5 to a string, outputting "55"
    let result = "5" - 2; // JavaScript coerces the string "5" to a number, outputting 3
*/


// @ Eyad-Aboelftoh <3