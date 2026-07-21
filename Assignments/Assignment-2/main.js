const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
eventEmitter = new EventEmitter();

/*1.Write a function that logs the current file path and directory. (0.5 Grade)
    • Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}
*/
// function logCurrentFilePathAndDir() {
//     const filePath = __filename;
//     const dirPath = __dirname;
//     console.log({ File: filePath, Dir: dirPath });
// }
// logCurrentFilePathAndDir();

/*2.Write a function that takes a file path and returns its file name. (0.5 Grade)
    • Input Example: /user/files/report.pdf
    • Output Example: "report.pdf "
*/
// function getFileName(filePath){
//     return path.basename(filePath);
// }

// console.log(getFileName('/user/files/report.pdf'));

/*3.Write a function that builds a path from an object (0.5 Grade)
    • Input Example: { dir: "/folder", name: "app", ext: ".js"}
    • Output Example: “/folder/app.js”
 */
// function buildPathFromObject({ dir, name, ext }) {
//     return path.join(dir, name + ext);
// }
// console.log(buildPathFromObject({ dir: "/folder", name: "app", ext: ".js" }));

/*4. Write a function that returns the file extension from a given file path. (0.5 Grade)
    • Input Example: /docs/readme.md"
    • Output Example: “.md”
*/
// function getFileExtension(filePath) {
//     return path.extname(filePath);
// }
// console.log(getFileExtension('/docs/readme.md'))

/*5.Write a function that parses a given path and returns its name and ext. (0.5 Grade)
    • Input Example: /home/app/main.js
    • Output Example: { Name: “main”, Ext: “.js” }
*/
// function parsePath(filePath) {
//     const parsedPath = path.parse(filePath);
//     return { Name: parsedPath.name, Ext: parsedPath.ext };
// }
// console.log(parsePath('/home/app/main.js'));

/*6.Write a function that checks whether a given path is absolute. (0.5 Grade)
    • Input Example: /home/user/file.txt
    • Output Example: true
*/
// function isAbsolutePath(filePath) {
//     return path.isAbsolute(filePath);
// }
// console.log(isAbsolutePath('/home/user/file.txt')); // true
// console.log(isAbsolutePath('user/file.txt')); // false

/*7.Write a function that joins multiple segments (0.5 Grade)
    • Input: "src", "components", "App.js"
    • Output Example: src/components/App.js
*/
// function joinPathSegments(...segments) {
//     return path.join(...segments);
// }
// console.log(joinPathSegments("src", "components", "App.js"));

/*8.Write a function that resolves a relative path to an absolute one. (0.5 Grade)
    • Input Example: ./index.js
    • Output Example: /home/user/project/src/index.js
*/
// function pathResolver () {
//     console.log(path.resolve("./index.js"));
// }
// pathResolver();

/*9.Write a function that joins two paths. (0.5 Grade)
    • Input Example: /folder1, folder2/file.txt
    • Output Example: /folder1/folder2/file.txt
*/
// function joinTwoPaths(path1, path2) {
//     return path.join(path1, path2);
// }
// console.log(joinTwoPaths('/folder1', 'folder2/file.txt'));

/*10. Write a function that deletes a file asynchronously. (0.5 Grade)
    • Input Example: /path/to/file.txt
    • Output Example: The file.txt is deleted.
*/
// function deleteFileAsync(filePath) {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(`The file ${filePath} is deleted.`);
//         }
//     });
// }
// deleteFileAsync('C:\\Users\\Eyad Aboelftoh\\Documents\\Backend Course\\Assignments\\Assignment-2\\deleteMe.txt');

/* 11. Write a function that creates a folder synchronously. (1 Grade)
    • Output Example: “Success”
*/
// function createFolderSync(folderPath) {
//     try {
//         fs.mkdirSync(folderPath);
//         console.log('Success');
//     } catch (err) {
//         console.error(err);
//     }
// }

// createFolderSync("C:\\Users\\Eyad Aboelftoh\\Documents\\Backend Course\\Assignments\\Assignment-2\\createfolder")

/* 12.  Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
    • Output Example: Welcome event triggered!
*/
// eventEmitter.on("Start", () => {
//     console.log("Welvome event triggered!");
// });

// eventEmitter.emit("Start");

/* 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
    • Input Example: "Ahmed"
    • Output Example: “User logged in: Ahmed”
*/
// eventEmitter.on("login", (username) => {
//     console.log(`User logged in: ${username}`);
// });

// eventEmitter.emit("login", "Ahmed");

/* 14. Read a file synchronously and log its contents. (1 Grade)
    • Input Example: "./notes.txt"
    • Output Example: the file content => “This is a note.”
*/
// function readFileSync(filePath) {
//     try {
//         const data = fs.readFileSync(filePath, 'utf8');
//         console.log(`the file content => ${data}`);
//         return data;
//     } catch (err) {
//         console.error(err);
//     }
// }

// readFileSync('./notes.txt');

/* 15. Write asynchronously to a file. (1 Grade)
    • Input: path: "./async.txt", content: "Async save"
*/
// fs.writeFile('./async.txt', 'Async save', (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Async save');
//     }
// });

/* 16.Check if a directory exists. (0.5 Grade)
    • Input Example: "./notes.txt"
    • Output Example: true
*/
// function exists(path) {
//     return fs.existsSync(path);
// }

// console.log(exists('./notes.txt'));

/* 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
    • Output Example: {Platform: “win32”, Arch: “x64”}
*/
// function getOSInfo() {
//     const platform = process.platform;
//     const arch = process.arch;
//     return { Platform: platform, Arch: arch };
// }
// console.log(getOSInfo());
/*
*/

// @ Eyad-Aboelftoh <3