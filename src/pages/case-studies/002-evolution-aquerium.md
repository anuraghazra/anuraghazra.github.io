---
title: Evolution Aquerium
excerpt: Evolution Aquerium is based on Craig Reynold's Steering Behaviors and Flocking System. It's also implements Genetic Algorithm and mutations. Daniel Shiffman showcased this on his Youtube Channel at TheCodingTrain. And i was very happy about the humble feedback sir Daniel Shiffman gave to me. it just boosted my confidence more and more. and motivated me to make this project better.

iframe: //www.youtube.com/embed/GKIhVrOsQCI/?modestbranding=1&showinfo=0&autohide=1&rel=0
demo: //anuraghazra.github.io/EvolutionAquerium
src: //github.com/anuraghazra/EvolutionAquerium

info:
  idea: the basic idea of the project is to achive and simulate biological creatures in a aquerium to see how they react  different scenarios
  tech: [Javascript, HTML5 Canvas]
  links:
    - [
        CodingTrain Steering Behavior Playlist,
        https://www.youtube.com/watch?v=mhjuuHl6qHM&t=1978s,
      ]
    - [Craige Reynold’s Flocking Behavior, https://www.red3d.com/cwr/index.html]
---

## How It Works?

These Creatures are based on [Craig Reynold's](https://www.red3d.com/cwr/index.html) Steering Behaviors and [Flocking System](https://www.red3d.com/cwr/boids/)

It's also implements Genetic Algorithm and mutations.

You can learn more about them on Daniel Shiffman's YouTube Channel [The Coding Train](https://www.youtube.com/user/shiffman)

- [Coding Challenge #69.1: Evolutionary Steering Behaviors](https://www.youtube.com/watch?v=flxOkx0yLrY&t=1223s)
- [Coding Challenge #124: Flocking Simulation](https://www.youtube.com/watch?v=mhjuuHl6qHM&t=1978s)
- [9. Genetic Algorithm playlist The Nature of Code](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV)

## BaseAgent Class

Firstly i need to create a BaseAgent so we can create more `creatures` extending that class this class includes and handles all the logical stuff. the basic idea is to give each and every `agent` some basic traits like `health`, `radius`, `maxSpeed`, `maxSpeed` etc etc.

see the full BaseAgent class's [code at github](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L15)

```js
class BaseAgent {
  constructor(x, y, radius, dna, color, builder) {
    // for flocking behaviour
    this.pos = new Vector(x, y);
    this.acc = new Vector(0, 0);
    this.vel = new Vector(0, -2);


    // i used builder pattern to create more variaty agents easily
    if (builder === undefined) builder = {};
    this.builder = builder;

    // traits
    this.age = 1;
    this.health = 1;
    this.radius = radius || 5;
    this.maxSpeed = builder.maxSpeed || 1.5;
    this.maxForce = builder.maxForce || 0.05;
    // amout of health will decrease over time
    this.healthDecrease = builder.healthDecrease || 0.003;
    // amount of health will increase after eating food
    this.goodFoodMultiplier = builder.goodFoodMultiplier || 0.5;
    // amount of health will decrease after eating poison
    this.badFoodMultiplier = builder.badFoodMultiplier || -0.4;
    this.color = color;
    this.hasReproduced = 0;
    // randomly choose male or female
    this.sex = (random(1) < 0.5) ? 'MALE' : 'FEMALE';
    // females will be a bit bigger than male
    this.maxRadius = builder.maxRadius || ((this.getGender() === 'FEMALE') ? 15 : 10);

    // more code in between...

    // colors based on their gender
    if (!this.color && this.getGender() === 'MALE') this.color = [0, 170, 0];
    if (!this.color && this.getGender() === 'FEMALE') this.color = [255, 39, 201];

  }
```

later on i also gave them names, haha yes

```js
...
let names_female = [
  'hanna', 'mona', 'cutie',
  'sweety', 'sofia', 'rose',
  'laisy', 'daisy', 'mia'
];
let names_male = [
  'joe', 'jim', 'kim',
  'keo', 'shaun', 'morgan',
  'jery', 'tom', 'anu',
  'brian', 'ninja', 'daniel'
];

// names based on gender
this.name = (this.getGender() === 'MALE') ? this.getRandomName(names_male) : this.getRandomName(names_female);
...

```

and now, i will be talking only about main meat of the code not any other uncessecary code.
so in the base class we have some methods

- [applyFlock()](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L235)

  applies the flocking behaviour

- [defineFear()](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L184)

  main function which defines the fear behaviour and we can also use this inversly

- [eat()](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L271)

  randomly returns a new Agent

- [Behaviour()](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L215)

  applies the force which returns from eat()

- [reproduce()](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/BaseAgent.js#L320)

  Reproduction System checks for male and female agents and if their radius is greater than 8 and they are close enough to each other, then they can reproduce with their specific DNA and creates a small Agent based on their DNA data and with some mutation.

## Flock Class

[Flock class](https://github.com/anuraghazra/EvolutionAquerium/blob/master/src/js/Flock.js) takes an agent hand handles all the flocking behaviours like `separate`, `align`, `cohesion`, `seek`.

## EcoSystem Class

EcoSystem class actually manages all the `agents` and `behaviors`, basically its like a state manager


it have some methods which are

- addEntities
- registerAgents
- initialPopulation
- addAgent
- addBehavior
- batchUpdateAgents
- update 
```js
class EcoSystem {
  constructor() {
    this.groups = {} // agents
    this.entities = {} // generic container (food, poison)
    this.agents = {} // agent classes
    this.behaviors = {} // calculated behaviors
  }
}
```
