---
title: Verlet Drawing
excerpt: Verlet Drawing is a physics-based drawing app. made with verlet.js as a showcase of its capabilities.

iframe: //www.youtube.com/embed/OCZXO8C4zTA/?modestbranding=1&showinfo=0&autohide=1&rel=0
demo: //anuraghazra.github.io/VerletDrawing
src: //github.com/anuraghazra/VerletDrawing

info:
  idea: Verlet Drawing is a physics-based drawing app. made with verlet.js as a showcase of its capabilities.
  tech: [Javascript, HTML5 Canvas, VerletPhysics]
  links:
    - ["Verlet.js [Outdated]", http://github.com/anuraghazra/verlet.js]
---

Verlet Drawing is one of my ambitious javascript project. 
I admit that it is also one of my poorly written project ever although i learned many things about javascript, code smells, and refactoring after finishing this project.

I implemented many features in Verlet drawing, including `Undo Redo with CTRL+Z and Y` drawing each and every point and sticks individually and also even `saving a JSON` file, which will actually save all the `points` and `constraints's` positions.

Verlet Drawing is built by using my 1st verlet physics engine called `Verlet.js`, don't confuse it with `Verly.js`. Verly.js is more robust and way much better than verlet.js.

well I'm not going to go deep into the codebase and explaining step by step how everything works here is just a basic overview

## How It Works?

If you had read my blog post about [Making a Verlet Physics Engine in Javascript](/blog/making-a-verlet-physics-engine-in-javascript) then you will know that every verlet physics simulation has two main components - `dots` and `sticks`, so you can basically add points and create sticks with the mouse.client positions and save them in an array and update the simulation accordingly in real-time. 

## What did I learned from this project?

When I started this project, I was not that good in javascript, and I also did not know how all the modern cool syntactic sugar works and what even OOP means. so basically I just jumped into this project and started working, and after finishing this project I realized my mistakes, and I tried to fix my mistakes with my later projects and progression on my javascript knowledge, things that I learned from this projects are

- Writing clean code is necessary 
- Modularizing and refactoring is mandatory
- Learning & applying design patterns is always a good idea 
- There's no coding knowledge barrier for doing an ambitious project

> fin!