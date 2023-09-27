const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

//require auth for all workout routes
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

/**
 * @swagger
 *  components:
 *      schemas:
 *          Workout:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: Workout ID
 *                      example: 65132470bfb0d195cdebe61f
 *                  title:
 *                      type: string
 *                      description: Workout title
 *                      example: Barbell Curl
 *                  reps:
 *                      type: number
 *                      description: Number of reps
 *                      example: 15
 *                  load:
 *                      type: number
 *                      description: Load
 *                      example: 20
 *                  user_id:
 *                      type: string
 *                      description: User ID
 *                      example: 651318f48d779bfb2b05230c
 *                  createdAt:
 *                      type: string
 *                      description: Workout creation date
 *                      example: 2023-09-26T18:35:28.585Z
 *                  updatedAt:
 *                      type: string
 *                      description: Workout last update date
 *                      example: 2023-09-26T18:37:36.091Z
 *                  __v:
 *                      type: number
 *                      description: Version
 *                      example: 0
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *              description: JWT bearer token
 *              in: header
 *              name: Authorization
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *      responses:
 *          UnauthorizedError:
 *              description: Access token is missing or invalid
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: Error message
 *                                  example: Request is not authorized
 *  
 */

// GET all workouts
/**
 * @swagger
 *  /workouts:
 *      get:
 *          summary: Get all workouts
 *          description: Get all workouts
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              200:
 *                  description: All workouts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Workout'
 */
router.get('/', getWorkouts)

// GET a single workout
/**
 * @swagger
 *  /workouts/{id}:
 *      get:
 *          summary: Get a single workout
 *          description: Get a single workout
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Workout ID
 *                schema:
 *                  type: string
 *                  example: 65132470bfb0d195cdebe61f
 *          responses:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  description: No such workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: No such workout
 *              200:
 *                  description: Workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Workout'
 */
router.get('/:id', getWorkout)

// POST a new workout
/**
 * @swagger
 *  /workouts:
 *      post:
 *          summary: Create a new workout
 *          description: Create a new workout
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: Workout title
 *                                  example: Barbell Curl
 *                              load:
 *                                  type: number
 *                                  description: Load
 *                                  example: 20
 *                              reps:
 *                                  type: number
 *                                  description: Number of reps
 *                                  example: 15
 *          responses:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              400:
 *                  description: Please fill in all fields
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: Please fill in all fields
 *              200:
 *                  description: Workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Workout'
 */
router.post('/', createWorkout)

// DELETE a workout
/**
 * @swagger
 *  /workouts/{id}:
 *      delete:
 *          summary: Delete a workout
 *          description: Delete a workout
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Workout ID
 *                schema:
 *                  type: string
 *                  example: 65132470bfb0d195cdebe61f
 *          responses:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  description: No such workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: No such workout
 *              200:
 *                  description: Workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Workout'
 */
router.delete('/:id', deleteWorkout)

// UPDATE a workout
/**
 * @swagger
 *  /workouts/{id}:
 *      patch:
 *          summary: Update a workout
 *          description: Update a workout
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Workout ID
 *                schema:
 *                  type: string
 *                  example: 65132470bfb0d195cdebe61f
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              load:
 *                                  type: number
 *                                  description: Load
 *                                  example: 20
 *                                  required: false
 *                              reps:
 *                                  type: number
 *                                  description: Number of reps
 *                                  example: 15
 *                                  required: false
 *          responses:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  description: No such workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: No such workout
 *              400:
 *                  description: Please fill in all fields
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: Please fill in all fields
 *              200:
 *                  description: Workout
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Workout'
 */
router.patch('/:id', updateWorkout)

module.exports = router