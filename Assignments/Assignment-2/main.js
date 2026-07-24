const http = require('http');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const console = require('console');
eventEmitter = new EventEmitter();
const source = './big.txt'
const dest = './dest.txt'
const port = process.env.PORT || 3000;
const usersPath = path.join(__dirname, "users.json");
const readstream = fs.createReadStream(source, { highWaterMark: 5000 });
const writestream = fs.createWriteStream(dest)

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
    • Input Example: "./createfolder"
    • Output Example: true
*/
// function isDirectoryExists(dirPath) {
//     const fullPath = path.resolve(dirPath)
//     if (!fs.existsSync(dirPath)) {
//         console.log("This is not a Path");
//         return false;
//     }
//     else {
//         const stats = fs.statSync(dirPath);
//         console.log("This Path Exist and is a Dir");
//         return stats.isDirectory();
//     }
// }
// console.log(isDirectoryExists('./createfolder'));
// console.log(isDirectoryExists('www.youtube.com'));
// console.log(isDirectoryExists('./bonus.js'));

/* 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
    • Output Example: {Platform: “win32”, Arch: “x64”}
*/
// function getOSInfo() {
//     const platform = process.platform;
//     const arch = process.arch;
//     return { Platform: platform, Arch: arch };
// }
// console.log(getOSInfo());

/* 18.Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
    • Input Example: "./big.txt"
    • Output Example: log each chunk
*/
// readstream.on('data', (chunk) => {
//     console.log("=================")
//     console.log(chunk.toString());
//     console.log("=================")

// });

/* 19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
    • Input Example: "./source.txt", "./dest.txt"
    • Output Example: File copied using streams
*/
// readstream.on("data", (chunk) => {
//     writestream.write(chunk);
// });

// readstream.on("end", () => {
//     writestream.end();
// });

// writestream.on("finish", () => {
//     console.log("File copied using streams");
// });

/* 20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
    • Input Example: "./data.txt", "./data.txt.gz"
*/

// Part2: Simple CRUD Operations Using HTTP (5 Grades)
//  • For all the following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).
//  • Do not store or manage data using arrays

/* 1)Create an API that adds a new user to your users stored in a JSON file  (1 Grade)
                (ensure that the email of the new user doesn’t exist before)
    o URL: POST /user
*/
/* 2)Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved
    from the URL (1 Grade)
    Note: Remember to update the corresponding values in the JSON file
    o URL: PATCH /user/id
 */

/* 3)Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
    Note: Remember to delete the user from the file
    o URL: DELETE /user/id
*/

function sendResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

function readUsers(callback) {
    fs.readFile(usersPath, "utf8", (error, data) => {
        if (error) {
            callback(error);
            return;
        }

        callback(null, JSON.parse(data || "[]"));
    });
}

function writeUsers(users, callback) {
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), callback);
}

function getRequestBody(req, callback) {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            callback(null, body ? JSON.parse(body) : {});
        } catch (error) {
            callback(error);
        }
    });
}

const httpServer = http.createServer((req, res) => {
    const { url, method } = req;
    const id = Number(url.split("/")[2]);

    if (url === "/user" && method === "POST") {
        getRequestBody(req, (error, newUser) => {
            if (error) {
                sendResponse(res, 400, { message: "Invalid JSON body" });
                return;
            }

            readUsers((error, users) => {
                if (error) {
                    sendResponse(res, 500, { message: "Fail to read users.json" });
                    return;
                }

                const match = users.find((user) => user.email === newUser.email);

                if (match) {
                    sendResponse(res, 409, { message: "Email already exists" });
                    return;
                }

                const newId = users.length === 0 ? 1 : users[users.length - 1].id + 1;
                const user = {
                    id: newId,
                    ...newUser
                };

                users.push(user);

                writeUsers(users, (error) => {
                    if (error) {
                        sendResponse(res, 500, { message: "Fail to save user" });
                        return;
                    }

                    sendResponse(res, 201, {
                        message: "Signup successfully",
                        user: user
                    });
                });
            });
        });
    } else if (url === "/user" && method === "GET") {
        readUsers((error, users) => {
            if (error) {
                sendResponse(res, 500, { message: "Fail to read users.json" });
                return;
            }

            sendResponse(res, 200, users);
        });
    } else if (url.startsWith("/user/") && method === "GET") {
        readUsers((error, users) => {
            if (error) {
                sendResponse(res, 500, { message: "Fail to read users.json" });
                return;
            }

            const user = users.find((user) => user.id === id);

            if (!user) {
                sendResponse(res, 404, { message: "User not found" });
                return;
            }

            sendResponse(res, 200, user);
        });
    } else if (url.startsWith("/user/") && method === "PATCH") {
        getRequestBody(req, (error, updatedData) => {
            if (error) {
                sendResponse(res, 400, { message: "Invalid JSON body" });
                return;
            }

            readUsers((error, users) => {
                if (error) {
                    sendResponse(res, 500, { message: "Fail to read users.json" });
                    return;
                }

                const userIndex = users.findIndex((user) => user.id === id);

                if (userIndex === -1) {
                    sendResponse(res, 404, { message: "User not found" });
                    return;
                }

                if (updatedData.email) {
                    const emailExists = users.some((user) => {
                        return user.email === updatedData.email && user.id !== id;
                    });

                    if (emailExists) {
                        sendResponse(res, 409, { message: "Email already exists" });
                        return;
                    }
                }

                users[userIndex] = {
                    ...users[userIndex],
                    ...updatedData,
                    id: users[userIndex].id
                };

                writeUsers(users, (error) => {
                    if (error) {
                        sendResponse(res, 500, { message: "Fail to save user" });
                        return;
                    }

                    sendResponse(res, 200, {
                        message: "User updated successfully",
                        user: users[userIndex]
                    });
                });
            });
        });
    } else if (url.startsWith("/user/") && method === "DELETE") {
        readUsers((error, users) => {
            if (error) {
                sendResponse(res, 500, { message: "Fail to read users.json" });
                return;
            }

            const userIndex = users.findIndex((user) => user.id === id);

            if (userIndex === -1) {
                sendResponse(res, 404, { message: "User not found" });
                return;
            }

            const deletedUser = users.splice(userIndex, 1)[0];

            writeUsers(users, (error) => {
                if (error) {
                    sendResponse(res, 500, { message: "Fail to save user" });
                    return;
                }

                sendResponse(res, 200, {
                    message: "User deleted successfully",
                    user: deletedUser
                });
            });
        });
    } else {
        sendResponse(res, 404, { message: "Not found" });
    }
});

httpServer.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
/*
*/
// @ Eyad-Aboelftoh <3
