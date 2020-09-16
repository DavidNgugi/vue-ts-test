## NoMore 2020 Vue / JS developer code test
### Introduction
The test centers around a small simple Vue application. The app is very simple and in many ways poorly written. And your job is to improve the quality of the code base.

### About the app
The appplciation is a very simple tool - a form of mixture between a "news generator" and a "to-do list" app. The functionality is very limited:
- The app has to database or persistence layer
- It allows the user to randomly generate a news source
- It gives the ability to go to the given site 
- And the ability to mark a source as "read"

### How the app is written
The app is written in plain Vue.js 2 and can be "run" by simply running: 

`npm run serve`

### What was done
- Added TypeScript and converted vue files to use it
- Created ArticleCard component
- Created Article Service to handle fetching of articles
- Setup interfaces to ensure types are adhered to
- Created config file for all environment configurations
