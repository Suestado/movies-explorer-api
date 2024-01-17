# Intro

The repository for the diploma project application for the Front-end developer course, including the front-end on React and the backend on Node.js parts with the following features:
- basic landing
- user authorization and registration
- search and filtering of cards
- saving cards in the user profile

___
# How to start

### To run the application locally, you need to download 2 repositories:
- Front-end - https://github.com/Suestado/movies-explorer-frontend
- Backend - https://github.com/Suestado/movies-explorer-api

### Start Back-end server locally.
Server should start on port 4000 automatically.
<br>You should have Mongo.db installed on your PC.
```angular2html
npm start
```
Positive result:
```angular2html
Сервер запущен на порту 4000
Подключение к базе данных установлено
```

### Start Front-end locally.
To avoid CORS errors an App have to be opened on PORT 3000 (http://localhost:300/)
```angular2html
npm start
```
Positive result:
```angular2html
You can now view movies-explorer-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://######

```
___
# Used technologies:
* Frontend
  * React
    * React
    * React-router
    * React-hook-form
  * HTML5
  * CSS
  * Grid/flex layout
  * Semantic

* Backend
  * Node.js
  * Express.js
  * Mongo
  * nginx
