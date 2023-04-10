#### Motivation

- A project after learning `express.js`, A continuation in my consistent learning of the `MERN (Mongo DB, Express.js, React.js, Node.js)` Shout out to my instructor 
- https://github.com/john-smilga

### Documentation && Live At:

https://job-api-01.onrender.com

### Database Mockup:
  


### Features
  User authentication and authorization
  User add new jobs they are tracking
  User update status of the job
  In general user perform `CRUD` operations on a given job
  Pagination is also handled
  Effective use of `middewares` & `error handling` & `express routers`
  
### Getting Started

### Prerequesites
  -`Node runtime environment 3.8 or later`
  -Used an online `MongoDB database`, You can also install MongoDB on your local machine

### Installation 
  Clone the github repository. Use this command on the terminal:
  `git clone https://github.com/fierylion/JOB-API.git`
  
  On the project root directory run then Command:
  `npm install && npm start`
  
  Project should be live at:
  `https://localhost:5000/`
  
  Look for the documentation provided
  
### Important Info

#### Routers

- auth.js
- jobs.js

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet  //sets various http headers to prevent numerous possible attacks
- cors   //ensures that our api is accessible from different domains, Otherwise it will be accessible to the same domain (cross origin resource sharing) Mechanism to allow or restrict requested resources from the server depending on where the http request was initiated
- xss-clean //sanitizes the user input in req.body, req.params,req.query thus protect from cross side scripting attacks
- express-rate-limit //limit the amount of request the user can make

  -Documentation provided with Swagger UI
