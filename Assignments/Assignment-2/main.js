const path = require('path');
const fs = require('fs');


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

// @ Eyad-Aboelftoh <3
// Not Finished Yet, I will complete it later.