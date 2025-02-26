import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cookieParser())


const allowedOrigins = [
    'http://localhost:5173',
    'https://blogsfordev.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// to ensure that express understands json & to set limit for incoming json data.
app.use(express.json({ limit: "16kb" }))

// to ensure that express understands all the data coming through url's.
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// for storing static assets,files,images etc. in our server.
app.use(express.static("public"))

// user routes
import userRoutes from './routes/user.routes.js'
app.use('/api/v1/user', userRoutes)

import taskRoutes from './routes/task.routes.js'
app.use('/api/v1/task', taskRoutes)


export default app
