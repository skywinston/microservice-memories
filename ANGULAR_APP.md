# Microservice Memories - Building the Angular App

The Angular app has 2 routes:

- The root route `/` which shows the form and the list of all memories
- The `/years/:year` route which shows just the memories for the given year

In addition, it interacts with the 4 API endpoints of the Express app.

Here is a detailed guide on how to proceed.

## Objectives

By the end of this exercise you should be able to:

- Describe the process of setting up a static file server to Cloud Foundry using Nginx
- Describe what service discovery does in a microservices architecture

## Users should see a home page that lists memories

Set everything up

- Create an Angular app with a simple file structure
- Install and configure Angular
  - if you use `bower`, add setup instructions to the README
- Create a Github Repository
- Git commit and push to the GitHub repo

Build the app

- Setup the app to make an `$http` request to your api to get all memories
- Show those memories on the page

- Setup the routes to use HTML5 mode
- Setup the controllers to contact the service registry first, then used the returned URLs to find / post the data
- Consider using https://bootswatch.com/ if you haven't used it before
- Run locally with superstatic
- Deploy to divshot
