const express = require('express')

//controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()


/**
 * @swagger
 *  /user/login:
 *      post:
 *          summary: Login a user
 *          description: Login a user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: User email
 *                                  example: testuser@email.com
 *                              password:
 *                                  type: string
 *                                  description: User password. Must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number and one special character.
 *                                  example: Password1!
 *          responses:
 *              200:
 *                  description: User authentication successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                      description: User email
 *                                      example: testuser@email.com
 *                                  token:
 *                                      type: string
 *                                      description: JWT bearer token
 *                                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *              400:
 *                  description: User authentication unsuccessful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: Invalid email or password
 */
router.post('/login', loginUser)

/**
 * @swagger
 *  /user/signup:
 *      post:
 *          summary: Register a user
 *          description: Register a user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: User email
 *                                  example: testuser@email.com
 *                              password:
 *                                  type: string
 *                                  description: User password. Must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number and one special character.
 *                                  example: Password1!
 *          responses:
 *              200:
 *                  description: User authentication successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                      description: User email
 *                                      example: testuser@email.com
 *                                  token:
 *                                      type: string
 *                                      description: JWT bearer token
 *                                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *              400:
 *                  description: User authentication unsuccessful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: Invalid email or password
 */
router.post('/signup', signupUser)

module.exports = router