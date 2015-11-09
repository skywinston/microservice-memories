# Microservice Memories

## Architecture

This is a collaborative application that will involve you and your classmates and the instructors.  It involves 3 components:

- A series of Angular apps all deployed to some static host that supports URL rewriting (like Divshot)
- A series of Express API apps all deployed to some host such as Heroku or Cloud Foundry
- A Service Registry app

![](wireframes/microservice-memories/microservice-memories.001.png)

You'll write an Angular app and also and Express app.  

- Your Angular app will contact the Service Registry
- The Service Registry will hand your Angular app a list of URLs
- Your Angular app will choose one, and use _it_ as the backend service for that session

![](wireframes/microservice-memories/microservice-memories.002.png)

NOTE: Every time you refresh a page, you'll get a new server.  In this exercise, that means that users will see different data every time they refresh the page.  This is not a normal flow - in real life, all those app servers would talk to the same database (or cluster of databases), and users would have a consistent experience.

## Angular App

The Angular app consists of two routes:

### The Home Page

- Users can add a memory
- Users can see all memories
- Users can see a list of unique years

![](wireframes/microservice-memories-index.png)

### The Year Page

- Users can see all memories from a certain year
- Users can see a link back to the home page

![](wireframes/microservice-memories.png)

### Setting up the Angular App

- Build an Angular app
- Setup the routes to use HTML5 mode
- Setup the controllers to contact the service registry first, then used the returned URLs to find / post the data
- Consider using https://bootswatch.com/ if you haven't used it before
- Run locally with superstatic
- Deploy to divshot

## Express App

The Express App must have 4 routes:

- GET /api/v1/memories - returns all memories
- POST /api/v1/memories - inserts a new memory into the database
- GET /api/v1/memories/:year - returns all memories for a given year
- GET /api/v1/memories/years - returns a unique, sorted list of all of the years in the memories database

### Setting up the Express App

- Create an express app
- Install https://github.com/swagger-api/swagger-ui (download everything in the `dist` folder to your public folder)
- Copy the `swagger.yml` document from this repo into your public directory
- configure the app to use your local copy of `public/swagger.yml`
  - `url = "/swagger.yml";`
- Add the `pg` package and the `dotenv` package
- Add and configure the `cors` package
- Create a local database
- Write a SQL script to create a table with the following fields:
  - id serial primary key
  - old_days text
  - these_days text
  - year numeric
- Configure your `pg` connection to connect to the `DATABASE_URL` environment variable.  Your `database.json` should look like this:
  ```
  {
    "dev": {"ENV": "DATABASE_URL"}
  }
  ```
- Build the app's endpoints
- Deploy to heroku
- Add the postgres addon with `heroku addons:add heroku-postgresql:hobby-dev`
- Use `pg:psql` and re-run the exact same sql file you wrote like so:
  ```
  heroku pg:psql < myscript.sql
  ```
- When you visit your URL, you should see your interactive Swagger docs

## Registering the App

- Go to https://galvanize-service-discovery.herokuapp.com/
- Check out the docs
- Either make the request right there on the page, or make requests using Postman
