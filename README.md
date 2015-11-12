# Microservice Memories

## Architecture

This is a collaborative application that will involve you and your classmates and the instructors.  It involves 3 components:

- A series of Angular apps all deployed to Cloud Foundry in such a way that the server supports URL rewriting (for `html5Mode(true)`)
- A series of Express API apps all deployed to Cloud Foundry
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

## Details on setting up the apps

- [Building the Express API](./EXPRESS_API.md)
- [Building the Angular APP](./ANGULAR_APP.md)
