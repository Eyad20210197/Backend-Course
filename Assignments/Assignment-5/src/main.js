import express from 'express';
import { connectDB } from './db/connection.js';
import { SERVER_PORT } from './config.js';
import { globalErrorHandling } from './common/middleware/index.js';

import {userController, postsController, commentsController} from './modules/index.js'

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Assignment 5 API" });
});

app.use("/users",userController)
app.use("/user",userController)
app.use("/posts",postsController)
app.use("/comments",commentsController)

app.use((req,res)=>{
    res.status(404).send({
        success: false,
        message: "Invalid Application Routing" 
    })
})

app.use(globalErrorHandling);

export const bootStrap = async () => {
    await connectDB();
    return app.listen(SERVER_PORT, () => {
        console.log(`Server is running on port ${SERVER_PORT}`);
    });
};

if (process.argv[1]?.endsWith("src\\main.js") || process.argv[1]?.endsWith("src/main.js")) {
    bootStrap().catch(() => {
        process.exitCode = 1;
    });
}
