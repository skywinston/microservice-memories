# Microservice Memories

The Express App must have 4 routes:

- GET /api/v1/memories - returns all memories
- POST /api/v1/memories - inserts a new memory into the database
- GET /api/v1/memories/:year - returns all memories for a given year
- GET /api/v1/memories/years - returns a unique, sorted list of all of the years in the memories database

Here is a detailed guide on how to proceed.

## Users can see API documentation for the API

- Create an express app (it doesn't matter what templating language because you won't use it)
- Create an associated Github repo and push your initial commit
- Install https://github.com/swagger-api/swagger-ui (copy everything in the `dist` folder to your public folder)
- Copy the `swagger.yml` document from this repo into your public directory
- configure the app to use your local copy of `public/swagger.yml`
  - `url = "/swagger.yml";`
- Deploy to Cloud Foundry

**Deploying to Cloud Foundry**

First you have to choose an app name.  Your app name should be ":cohort-:first-:last-memories".  So for Lynn Smith, who is in cohort g76, the `app-name` should be:

> g76-lynn-smith-memories

Replace `[app-name]` with your service name.

```
cf push [app-name] -m 128m
```

Visit the URL to see your documentation live.

## Users can create a new memory

```
When a user issues a POST request to /api/v1/memories
And sends valid JSON data in the request body
Then the user should see a success response
```

See the swagger docs you just deployed to get examples of the correct input / output.

This will involve:

- Add the `dotenv` package and make sure it's properly configured (be sure to use `--save`)
- Add the `pg` package (be sure to use `--save`)
- Write a `migrations/01_create_memories.up.sql` file that creates a memories table with the following fields:
  - id serial primary key
  - old_days text
  - these_days text
  - year numeric
- Write an Express route that insert a row into the table.  Use Postman to test your requests.
- Deploy to Cloud Foundry

**Deploying to Cloud Foundry**

In order to deploy to Cloud Foundry you will need to:

- Create a database server and bind it to your app
- Run your SQL file on that database server

Create a new database server and bind it to your app.  Your service name should be in the format ":cohort-:first-:last-:memoriesdb".  So for Zoe Rothchild, who is in cohort g43, the `service-name` should be:

> g43-zoe-rothchild-memoriesdb

Replace `[service-name]` with your service name and `[app-name]` with the app name from above.

```
cf create-service elephantsql turtle [service-name]
cf bind-service [app-name] [service-name]
cf restage [app-name]
```

Now you need to run your SQL file on that remote database.  

- Run: `cf env [app-name]`
- Look for the postgres connection string
- Run your `migrations/01_create_memories.up.sql` file like so:
  ```
  psql [connection-string] < migrations/01_create_memories.up.sql
  ```

Now you should be able to visit your API documentation and run the "Try it out!" section of the `POST`.

Git commit and push.

NOTE: make sure that your output matches the format that the API docs specify.

## Users should be able to see all memories

- Build an express route for `GET /api/v1/memories`
- Return the data in the format specified by the API docs
- Git commit and push
- Deploy to Cloud Foundry with `cf push [app-name]`

## Users should be able to see all memories for a given year

- Build an express route for `GET /api/v1/memories/:year`
- Return the data in the format specified by the API docs
- Git commit and push
- Deploy to Cloud Foundry with `cf push [app-name]`

## Users should be able to see a unique list of years

- Build an express route for `GET /api/v1/memories/years`
- Return the data in the format specified by the API docs
- Git commit and push
- Deploy to Cloud Foundry with `cf push [app-name]`

## Users should be able to access your API via CORS

- Add and configure the `cors` package
- Deploy to Cloud Foundry and test
- Git commit and push

## Users should be able to see your app in the registry

- Go to http://galvanize-service-registry.cfapps.io
- Check out the docs
- Either make the request right there on the page, or make requests using Postman
  - The **cohort** should be the 3 or 4-letter short-code for your cohort, such as "g23"
  - The **app** should be "kids-these-days"
  - The **url** should be your Cloud Foundry URL, with no trailing slash (`/`)
  - The **description** should contain your name
- Make a `GET` request to verify that your app was properly registered
