# MERN 

## Dependencies
- `bcryptjs`: Library for hashing passwords.
- `cookie-parser`: Middleware for parsing cookies.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `cross-env`: Utility for setting environment variables across platforms.
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web framework for Node.js.
- `express-validator`: Middleware for validating and sanitizing request data.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens.
- `mongodb`: Official MongoDB driver for Node.js.
- `mongoose`: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Dev-dependencies
1. `@types/bcryptjs`: TypeScript type definitions for bcryptjs.
2. `@types/cookie-parser`: TypeScript type definitions for cookie-parser.
3. `@types/cors`: TypeScript type definitions for cors.
4. `@types/express`: TypeScript type definitions for express.
5. `@types/jsonwebtoken`: TypeScript type definitions for jsonwebtoken.
6. `@types/node`: TypeScript type definitions for Node.js.
7. `nodemon`: Utility that monitors for changes in your source and automatically restarts your server.
8. `ts-node`: TypeScript execution environment for Node.js.
9. `typescript`: TypeScript language compiler.


## Testing =>
 1. to make testing we need to have the the testing db to first we have to coonect 
2. db in which all the tests data in it 

3. so we make file in SERVER FOLDER .env.e2e.test file file for # enviroment variable

4.then make forlder tests folder && run the commond npm init playwright@latest


## AUTOMATION TESTING
END TO END TESTING
**Add to package-json file
 "e2e": "cross-env DOTENV_CONFIG_PATH=.env.env nodemon"

npm init playwright@latest

extension

## Diployment
to diploying code this  thing which must to do

1) Go to the tsConfig.json---frontend
add -->  "outDir": "./dist"

2) Go to the package.json in ---Backend
add script-->  "build": "npm install && npm tsc",


## add hotels [ feature ]

frontend --- ManageHotelForms

backend --->  Post / api / my-hotels

node backend ---> 
## cloudinary  => 
[ one of top service that host the images ]  we write code in node Backend we uplod imges to cloudinary and it retured URLs with all associate properties all we store in mongodb DATABSE..

![My Image](imgs\cloudinary.png)


![My Image](imgs\auth/register.png)
## multer =>

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

$ npm install --save multer

