---
title: Making a Verlet Physics Engine in Javascript
date: 2019-08-04 11:38:00
author: Anurag Hazra
tags: ['verlet', 'physics', 'javascript']
---

Have you ever wondered if you can make your own physics engine in JavaScript? If so, you have come to the right place. We are going to build a Physics engine from scratch in JavaScript.

Before we start, I should mention that this tutorial assumes you have a good understanding of Vectors.
Don’t worry if you do not yet have this understanding — Vectors are simple: get the Vector.js


## What Is Verlet Physics?

According to Wikipedia:
> Verlet integration is a numerical method used to integrate Newton’s equations of motion. It is frequently used to calculate trajectories of particles in molecular dynamics simulations and computer graphics. The algorithm was first used in 1791 by Delambre and has been rediscovered many times since then, most recently by Loup Verlet in the 1960s for use in molecular dynamics.

In simple terms, Verlet physics is just a system of connected dots.


### In a Verlet system, we have 2 main components:
1. Points (dots)
2. Constraints (sticks)

## Dots
The dots have very simple physics applied to them.
We have to keep track of the dots’ current and old positions to add the physics behavior to them — you'll see this when we actually implement it.

```js
class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x, y);
    this.friction = 0.97;
    this.groundFriction = 0.7;
    this.gravity = new Vector(0, 1);
    this.radius = 5;
    this.color = '#e62a4f';
    this.mass = 1;
  }
}
```

We have the basic setup, now let's render the dots and make them move.

```js
update() {
  let vel = Vector.sub(this.pos, this.oldpos);
  vel.mult(this.friction);
  // if the point touches the ground set groundFriction
  if (this.pos.y >= CANVAS_HEIGHT - this.radius && vel.magSq() > 0.000001) {
    var m = vel.mag();
    vel.x /= m;
    vel.y /= m;
    vel.mult(m * this.groundFriction);
  }
  this.oldpos.setXY(this.pos.x, this.pos.y);
  this.pos.add(vel);
  this.pos.add(this.gravity);
}
```