//Part1:NodeInternals:

// 1. What is the Node.js Event Loop?
    // The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O operations while using a single JavaScript thread. It continuously checks whether there are asynchronous callbacks waiting to be executed. If the Call Stack is empty, the Event Loop moves callbacks from the Event Queue to the Call Stack for execution.
    // This enables Node.js to handle many concurrent requests efficiently without creating a new thread for each request.

// 2. What is Libuv and What Role Does It Play in Node.js?
// Libuv is a C library used by Node.js to provide asynchronous I/O operations and cross-platform support.
    // Its responsibilities include:
    // Managing the Event Loop.
    // Handling asynchronous file system operations.
    // Managing networking operations.
    // Providing a thread pool for expensive tasks.
    // Supporting timers, sockets, and DNS operations.
// Without Libuv, Node.js would not be able to perform asynchronous operations efficiently.

//3. How Does Node.js Handle Asynchronous Operations Under the Hood?
// When an asynchronous operation (such as reading a file or making a network request)
// is requested:
    // JavaScript sends the request to Node.js.
    // Node.js passes the task to Libuv.
    // Libuv either:
    // Uses the operating system for networking tasks, or
    // Uses its thread pool for operations like file system access.
    // While the operation is running, JavaScript continues executing other code.
    // When the task finishes, Libuv places its callback into the Event Queue.
    // The Event Loop moves the callback to the Call Stack when it becomes empty.
    // The callback executes.
// This is why Node.js can continue serving requests while waiting for slow operations.

//4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?

// | Component       | Description                                                                                                     |
// | --------------- | --------------------------------------------------------------------------------------------------------------- |
// | **Call Stack**  | Stores functions currently being executed. Functions are executed in Last In, First Out (LIFO) order.           |
// | **Event Queue** | Stores completed asynchronous callbacks waiting to execute.                                                     |
// | **Event Loop**  | Continuously checks whether the Call Stack is empty and moves callbacks from the Event Queue to the Call Stack. |

// console.log("Start");

// setTimeout(() => {
//     console.log("Timeout");
// }, 0);

// console.log("End");

//5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?

// The Thread Pool is a group of worker threads managed by Libuv.

// It is used for operations that cannot be handled asynchronously by the operating system, such as:

// File System (fs)
// Crypto
// Compression (zlib)
// DNS lookup

// The default thread pool size is 4 threads.

// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
// Blocking Code

// Blocking code stops the execution of the program until the operation finishes.

// Example:

// const fs = require("fs");

// const data = fs.readFileSync("users.json", "utf8");

// console.log(data);
// console.log("Done");

// The program waits for readFileSync() to complete before continuing.

// Non-Blocking Code

// Non-blocking code allows the program to continue executing while the operation runs in the background.

// Example:

// const fs = require("fs");

// fs.readFile("users.json", "utf8", (err, data) => {
//     console.log(data);
// });

// console.log("Done");


// Part2: Simple CRUD Operations Using Express.js:

//Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)
//Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved  
//from the URL
///Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade) 
//Note: Remember to delete the user from the file 
/*
const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;
const usersPath = "users.json";

app.use(express.json());

function loadUsers() {
    try {
        return JSON.parse(fs.readFileSync(usersPath, "utf8"));
    } catch {
        return [];
    }
}

// Add User
app.post("/user", (req, res) => {
    const users = loadUsers();
    const newUser = req.body;

    if (users.some(user => user.email === newUser.email)) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    users.push(newUser);

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});

// Update User
app.patch("/user/:id", (req, res) => {
    const users = loadUsers();

    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users[index] = {
        ...users[index],
        ...req.body
    };

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.json({
        message: "User updated successfully",
        user: users[index]
    });
});

// Delete User
app.delete("/user/:id", (req, res) => {
    const users = loadUsers();

    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.json({
        message: "User deleted successfully",
        user: deletedUser
    });
});

// Get All Users
app.get("/user", (req, res) => {
    const users = loadUsers();

    res.json(users);
});

// Get User By ID
app.get("/user/:id", (req, res) => {
    const users = loadUsers();

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Get User By Name
app.get("/user/getByName", (req, res) => {
    const users = loadUsers();

    const { name } = req.query;

    const user = users.find(
        user => user.name.toLowerCase() === name.toLowerCase()
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Filter By Age
app.get("/user/filter", (req, res) => {
    const users = loadUsers();

    const minAge = parseInt(req.query.minAge);

    const filteredUsers = users.filter(
        user => user.age >= minAge
    );

    if (filteredUsers.length === 0) {
        return res.status(404).json({
            message: "No users found"
        });
    }

    res.json(filteredUsers);
});

// Invalid Route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

*/