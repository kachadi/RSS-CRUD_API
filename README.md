# RSS-CRUD_API
Repository for CRUD API task in NodeJS course 2022 Q4 at Rolling Scope School.  


## Task
Implementation simple CRUD API using in-memory database underneath. Application written by TypeScript with Node.js.  
[Task description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Prepare 
1. Install Node.js
2. Fork this repository: https://github.com/kachadi/RSS-CRUD_API
3. Clone your newly created repo: `https://github.com/<%your_github_username%>/RSS-CRUD_API/`
4. Go to folder `RSS-CRUD_API`
5. To install all dependencies use `npm install`

## How to run 🚀
* Run the application in development mode:  
```
npm run start:dev
```
* Run the application in production mode:
```
npm run start:prod 
```
* Run tests scenarios for API:  
```
`npm test`  
```
## User
Required fields and data types of User:

```
{
  username: string,
  age: number,
  hobbies: string[]
}
```
After creation, each user is assigned a unique id (in uuid format).

## API
By default, the port for localhost is taken from .env (you can find the `example.env` file in the root of the project. Remove the `example` prefix and you can use this file)  
  
Implemented endpoint: `api/users`.


`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create record about new user and store it in database

`PUT api/users/${userId}` - to update existing user (**all fields required**)

`DELETE api/users/${userId}` - to delete existing user from database
