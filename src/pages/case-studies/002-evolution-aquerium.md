---
title: Evolution Aquerium
excerpt: Evolution Aquerium is based on Craig Reynold's Steering Behaviors and Flocking System. It's also implements Genetic Algorithm and mutations. My Mentor Daniel Shiffman showcased this on his Youtube Channel at TheCodingTrain. And i was very happy about the humble feedback sir Daniel Shiffman gave to me. it just boosted my confidence more and more. and motivated me to make this project better.

iframe: //www.youtube.com/embed/GKIhVrOsQCI/?modestbranding=1&showinfo=0&autohide=1&rel=0
demo: //anuraghazra.github.io/EvolutionAquerium
src: //github.com/anuraghazra/EvolutionAquerium

info:
  idea: the basic idea of the project is to achive and simulate biological creatures in a aquerium to see how they react  different scenarios
  tech: [Javascript, HTML5 Canvas]
  links:
    - [ CodingTrain Steering Behavior Playlist, https://www.youtube.com/watch?v=mhjuuHl6qHM&t=1978s ]
    - [ Craige Reynold’s Flocking Behavior, https://www.red3d.com/cwr/index.html ]
---

## How It Works?

Well that's an obvious question.

These Creatures are based on [Craig Reynold's](https://www.red3d.com/cwr/index.html) Steering Behaviors and [Flocking System](https://www.red3d.com/cwr/boids/)

It's also implements Genetic Algorithm and mutations.

You can learn more about them on Daniel Shiffman's YouTube Channel [The Coding Train](https://www.youtube.com/user/shiffman)

- [Coding Challenge #69.1: Evolutionary Steering Behaviors](https://www.youtube.com/watch?v=flxOkx0yLrY&t=1223s)

- [Coding Challenge #124: Flocking Simulation](https://www.youtube.com/watch?v=mhjuuHl6qHM&t=1978s)

- [9. Genetic Algorithm playlist The Nature of Code](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV)

## How My Code Works?

My code is actually pretty simple.

## Agent Class

I made a `Agent` class which handles all the Basic behavior like

- `flock()`
- `align()`
- `separate()`
- `cohesion()`

And added some basic parameters like

```javascript
this.radius = radius //size of the agent
this.health = 1 // health
this.healthDecrease = 0.003 // how much health will decrease over time
this.goodFoodDie = 0.5 // food increase the health by that amount
this.badFoodDie = -0.4 // poison decrease the health by that amount
```

I also added a `sex` variable for the agents and all of them also has unique names

```javascript
this.sex = Math.random() < 0.5 ? "male" : "female"
```

## Fear Behavior

And for the most important part, i added a **`defineFear()`** method which handles Fear behavior.

It's a robust function to define fear which can be also used inversly with negative values.

**`defineFear()`** function allows Agents to add Steering Forces simultaneously on each other

```javascript
// list, weight, perception, ?callback
creature.defineFear(predators, -4, 50)
```

## Reproduction System

Reproduction System checks for `male` and `female` agents and if their `radius` is greater than 8 and they are close enough to each other, then they can reproduce with their specific `DNA` and creates a small Agent based on their DNA data and with some mutation.

## Predator class

Predators are simple but deadly
they just has a `sex` property set to 'predator'

and i used **`defineFear()`** function inversely to attack the Creatures

And bigger they get slower they became.

## Avoider Class

Avoiders are very very very fast but they are very agile too.
they just has a `sex` property set to 'avoider'

and i used **`defineFear()`** function to avoid every poison and Predator.
