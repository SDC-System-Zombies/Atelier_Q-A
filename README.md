# Atelier - Q-A
A multi-layered backend system for an online retail serrvice. The scope of this API is only for the Q-A portion of the front-end service.

## Features
* Server API that can query thousands of requests per second.
* Data queried will be in a preset format.
* Comes with a table template to create the PostgreSQL database tables.

## Technology
Atelier was written in Javascript for the server. Utilizes PostgreSQL or MongoDB for the database. The system database already contains  

## Getting a Copy of the Repo
If you haven't already, fork the repository on GitHub and clone your newly created repo down to your computer.
This project runs on PostgreSQL and MongoDB. Make sure download and install PostgreSQL and MongoDB onto your computer first before using this API.

## How to Run
PostgreSQL server API:
Navigate to the PostgreSQL directory, then install the required packages by running `npm install` in your terminal.
Create a config.js file in the PostgreSQL directory like so:
```
const auth = {
  auth: 'password_here'  // Password for PostgreSQL
};
exports.module = auth;
```
To 
Open up psql and run this command to create database
'CREATE DATABASE sdc WITH OWNER = 'your_user' ENCODING = 'UTF8';'

In terminal CLI, run this file with the command:
'psql -d SDC -a -f schema.sql'
to create the tables within that database


MongoDB server API:
Navigate to the MongoDB directory, then install the required packages by running `npm install` in your terminal.
