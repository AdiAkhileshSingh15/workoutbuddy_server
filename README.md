# Workoutbuddy_server
Nodejs and Express based backend server api, deployed on render.

Base URL: https://workoutapi-fjcr.onrender.com/api

Swagger: https://workoutapi-fjcr.onrender.com/api-docs

## Method
Endpoint | ExampleBodyJSON | AuthHeader | ExampleResponse
## POST
/user/login | { "email":"EddyXing@gmail.com", "password":"EddyXing@123" } | NA | { "email": "EddyXing@gmail.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTEzMThmNDhkNzc5YmZiMmIwNTIzMGMiLCJpYXQiOjE2OTU3NTIyMjAsImV4cCI6MTY5NjAxMTQyMH0.-13O0bt2oTlycsuBBfJ1f4X0rvR_hLSZ1-y9obYrf44" }
## POST
/user/signup | { "email":"EddyXing@gmail.com", "password":"EddyXing@123" } | NA | { "email": "EddyXing@gmail.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTEzMThmNDhkNzc5YmZiMmIwNTIzMGMiLCJpYXQiOjE2OTU3NTIyMjAsImV4cCI6MTY5NjAxMTQyMH0.-13O0bt2oTlycsuBBfJ1f4X0rvR_hLSZ1-y9obYrf44" }
## GET
/workouts | NA | "Authorization" : "Bearer {token}" | array(...UserWorkoutObjects)
## GET
/workouts/:id | NA | "Authorization" : "Bearer {token}" | {RequestedWorkoutObj} 
## POST
/workouts | { "title":"Barbell Curl", "load":20, "reps":15 } | "Authorization" : "Bearer {token}" | {CreatedWorkoutObj}
## PATCH
/workouts/:id | { "load":25, "reps":20 } | "Authorization" : "Bearer {token}" | {UpdatedWorkoutObj}
## DELETE
/workouts/:id | NA | "Authorization" : "Bearer {token}" | {WorkoutObj}

### ExampleWorkoutObject
{
  "_id": "65132470bfb0d195cdebe61f",
  "title": "Barbell Curl",
  "reps": 15,
  "load": 20,
  "user_id": "651318f48d779bfb2b05230c",
  "createdAt": "2023-09-26T18:35:28.585Z",
  "updatedAt": "2023-09-26T18:37:36.091Z",
  "__v": 0
}
#### Note
Password Requirements- MinLength=8, MinUppercase=1, MinLowercase=1, MinNumbers=1, MinSymbols=1
