Dashboard 
==========
This a video management web app and mobile app for your favourite videos.
The admin uploads favourite videos to the server and then users can subscribe to the particular category to watch them in the mobile app[iOS, Android].

## Technology Stack
  * JS, React, ES6
  * Node, Express
  * React Native
  * HTML5, CSS3, Sass
  * Mongo DB, MySql

## Structure of the repo
This application has 6 different sub applications. You may choose three to run the application successfully.
The different sub applications gives the versatility and choice of technology to be used.
  1. Two mobile apps - mobile / mobile-expo : It is the mobile app in React Native, one is dispatched version from expo.
  2. Two backend servers - node / server : node is written in node js while server is in PHP (Yii2 microservices)
  3. Two databases support - MangoDB / MySQL 
  4. 

This is node , express server for the application. It provides RESTFul Services.

### Installations

#### Migrations
  * Create migrations by: `db-migrate create create_table_tablename --config ./config/dev.json`.
  * Run migrations by: `db-migrate up --config ./config/dev.json`.
  
#### Run app
  * Change credentials in _file server.js.
  * Run app like (inside node) : `npm start`.

    
### Requirements

   * You many need to install the following.
     1. node >= 10.16.0
     2. npm >= 6.9.0
     3. PHP 7
     4. Apache 2 or Nginx Web server
     5. MySQL >= 5.7
