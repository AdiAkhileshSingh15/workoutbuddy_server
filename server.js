require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 4000

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Workout Buddy API',
    version: '1.0.0',
    description:
      'This is a REST API application for CodeStart',
  },
  servers: [
    {
      url: 'http://localhost:8000/api',
      description: 'Development server',
    },
  ],
  schemes: ['http'],
  authorization: {
    type: 'Bearer token',
    in: 'header',
    name: 'Authorization',
    description: 'Bearer token',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// express app
const app = express()

app.use(cors({
    origin: "*"
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(PORT, () => {
            console.log('listening for requests on port', PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 