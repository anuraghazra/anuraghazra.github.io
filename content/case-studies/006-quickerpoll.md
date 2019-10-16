---
title: QuickerPoll
excerpt: QuickerPoll is a crowd-sourced real-time polling app created with React and Nodejs. QuickerPoll lets you create, edit, update, delete public polls and vote on them publicly. This project is just an example of using react, nodejs and restfull apis all together

iframe: //www.youtube.com/embed/10sL4z9BHNE/?modestbranding=1&showinfo=0&autohide=1&rel=0
demo: //quickerpoll.herokuapp.com
src: //github.com/anuraghazra/QuickerPoll

info:
  idea: The basic idea of this project is to create a MERN stack app with basic CRUD operations, but not to make a todo app
  tech: [Nodejs, AntDesign, React, MongoDB]
  links:
    - [Mongoose, https://https://mongoosejs.com/]
    - [Nodejs, http://nodejs.org]
---

## About QuickerPoll

QuickerPoll is a crowd-sourced real-time polling app created with React and Nodejs. QuickerPoll lets you create, edit, update, delete public polls and vote on them publicly. This project is just an example of using react, nodejs and restfull apis all together

> please do not create any violating contents here as is this database is publicly visible and i'm not responsibe for any violating content

## Tools used

`chart.js` `react-color` `styled-components` `socket.io`

- React

  React is a JavaScript library that aims to simplify development of visual interfaces.

- Ant Design

  A design system with values of Nature and Determinacy for better user experience of enterprise applications

- Express

  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile

- Axios

  Promise based HTTP client for the browser and node.js.

- Mongoosejs

  Mongoose provides a straight-forward, schema-based solution to model your application data.

- mLab

  Database-as-a-Service for MongoDB. Now part of the MongoDB family, powering over 1 million deployments worldwide.

---

**Planning**

The first thing in fullstack apps is Setting up the backend server

----

**Setting up nodejs**

I used nodejs to setup the backend for this app, because nodejs is scalable, fast and easy to create realtime apps

----

**Express, Mongoose, mLab**

In third step i setup Express Server, Mongoose Schemas/Models and connected our app with mLab database which will act as a DBaaS (Database as a service)

----

**Planing API Structure**

RESTfull API should be consisten and easy to integrate with our Front-end app thats why planning the API models is neccesary for example our polls API looks like this /api/polls

----

**Creating API Endpoints**

basically we are creating a CRUD (Create, Read, Update, Delete) API which can be done easily with mongoose queries.

----

**Front-End**

since we are done with backend we are going to add client side code, we will use create-react-app boilerplate to make our life easy. to connect our front-end with back-end we are going to use concurrently NPM package to start both our servers at the same time. and to talk with our api endpoint we have to set a proxy to our client side package.json "proxy": "http://localhost:5000"

----

**UI**

we have to let users interact with our backend database through an elegant UI. so i decided to use Ant Design to scaffold the UIs. antd provides all the sleek UI components which can be used easily integrated with our app for example Menu, List, Input, Card, Popover, Icon

----

**Making it real-time**

After setting up our UI for our client-side CRUD operations i used socket.io to make our app real-time and i used ReactContextAPI to manage Global state of the app

----

**Deployment**

i'm gonna use Heroku to deploy our app online, heroku lets us depoly nodejs apps for free it uses something called Dynos to deploy nodejs apps. finnaly to depoly our app i'm gonna build our client side React code and make an optimized production build.
