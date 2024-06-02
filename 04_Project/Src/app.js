import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

// Enable CORS with specific origin and credentials support
app.use(cors({
    origin: process.env.CORS_ORIGIN,// Allows only the specified origin (set in the environment variable CORS_ORIGIN) to access the server.
    credentials: true// Allows cookies and other credentials to be included in requests to the server.
}))
// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }))

// Parse incoming URL-encoded requests with a size limit of 16kb
app.use(express.urlencoded({
    extended: true//allows for rich objects and arrays to be encoded into the URL-encoded format.
    , limit: "16kb"
}))
app.use(express.static("public"))//Serves static files (like HTML, CSS, JS, images) from the public directory.

app.use(cookieParser());//Parses cookies attached to client requests and makes them accessible via req.cookies.


//routes import
import userRouter from './routes/user.routes.js'

//routes decleration
app.use("/api/v1/users", userRouter);

//http://localhost:800/api/v1/users/register



export { app }