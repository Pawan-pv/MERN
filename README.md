# MERN 

 1. to make testing we need to have the the testing db to first we have to coonect 
2. db in which all the tests data in it 

3. so we make file in SERVER FOLDER .env.e2e.test file file for # enviroment variable

4.then make forlder tests folder && run the commond npm init playwright@latest


# AUTOMATION TESTING
END TO END TESTING
**Add to package-json file
 "e2e": "cross-env DOTENV_CONFIG_PATH=.env.env nodemon"

npm init playwright@latest

extension

#Diployment
to diploying code this  thing which must to do

1) Go to the tsConfig.json---frontend
add -->  "outDir": "./dist"

2) Go to the package.json in ---Backend
add script-->  "build": "npm install && npm tsc",
