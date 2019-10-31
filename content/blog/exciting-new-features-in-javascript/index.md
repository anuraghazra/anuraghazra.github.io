---
title: Exciting New Features In Javascript
date: 2019-08-07 14:08:00
author: Anurag Hazra
tags: ["javascript"]
---

Javascript community is going very well with the TC39 (Technical Committee 39), and it's proposal system. And javascript is now evolving fast, and we can expect some amazing features. I will talk about some of the most useful and exciting features which will make our life easy.


## 1. Optional Chaining ?

I'm sure you faced an error like this.

`cannot read property 'amazing' of undefined.`

and these errors are pervasive when accessing dynamic object with deep nesting, we can combat this in javascript by using the `&&` operator to check, but it can get quite messy sometimes, here's the old and new way

```js
const js = {
  can: {
    do: "anything",
    will: "do anything",
  },
}

// old way
const canDoAnything = js && js.can && js.can.do

// new way
const canDoAnythingNew = js?.can?.do
```

## 3. Private fields _#_

> Partially Available in Chrome & NodeJS 12

Finally, we can avoid \_underscore naming conventions and use actual private variables in classes. Yes, the syntax is a bit weird and controversial at first, but hey, first time for everything! the new version of chrome supports class `#fields` only, but the class `#methods()` is coming soon

> Check the [TC39 proposal for class fields](https://github.com/tc39/proposal-class-fields)

> Check the [TC39 proposal for private methods](https://github.com/tc39/proposal-private-methods)

here's how it looks

```js
// private fields must start with '#'
// and they arent accessible outside the class block

class Ship {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  // private methods are comming soon
  #boost() {
    this.#x++;
    this.#y++;
  }
}

const ship = new Ship(1, 1);
console.log(ship.#x); // -> Error

```

## 4. Top Level await

This one is interesting because `top level await` allows you to use "await" without an outer async function, which means you don't have to wrap an anonymous async function for every async operation.

"Top Level await' is very handy while debugging async stuff (like fetch) in console without wrapping it in an async function.

> Check the [TC39 proposal for Top Level Await](https://github.com/tc39/proposal-top-level-await)

and there are many [use cases](https://github.com/tc39/proposal-top-level-await#use-cases) which are mentioned in the tc39 repo

```js
// top level window
await fetch("https://somesite.com/api/data") // -> Response {..}
```

## 5. BigInt

> Available in Chrome & NodeJS 12

Javascript always has been tribble at Math because we cannot reliably store numbers larger than 2 ^ 53, which limits its capabilities in many regions, for example, graphics and data processing. 

> Check the [TC39 proposal for BigInt](https://github.com/tc39/proposal-bigint)

here's how the syntax looks

```js
// can define BigInt by appending 'n' to a number literal
const theBiggestInt = 9997199254748991n

// using the constructor with a literal
const alsoHuge = BigInt(9997199254748991n)

// or with a string
const hugeButString = BigInt("9997199254748991n")
```

You can also do the same `+, -, /, *, %` operations on BigInt as you would expect from regular numbers, but you can't mix BigInt with numbers in most operations. Comparing Number and BigInt works, but not adding them.

## 6. globalThis

I know this one might not be too much exciting for you, but trust me `globalThis` is essential for standardizing the `global object` in javascript.

let's say we need to get the `globalObject` for browser, node, all other alien stuff.

> Check the [TC39 proposal for globalThis](https://github.com/tc39/proposal-global)

Before `globalThis`, the only reliable cross-platform way to get the global object for an environment was `Function('return this')()`. However, this causes CSP violations in some settings, so es6-shim uses a check like this, for example:

```js
var getGlobal = function() {
  // in node, it's named 'global'. If we're in a shell, 'this' might work.
  // some times also self. and in browsers its window
  if (typeof self !== "undefined") {
    return self
  }
  if (typeof window !== "undefined") {
    return window
  }
  if (typeof global !== "undefined") {
    return global
  }
  throw new Error("unable to locate global object")
}
```

Now, this can get quite messy because we have to check for every environment and find the actual `global`. You might think that its not a big issue, but it is a massive issue because the problem here is about standardization.

And for that reason, `globalThis` is introduced. the new syntax will look like this

```js
// taken from mdn
function canMakeHTTPRequest() {
  return typeof globalThis.XMLHttpRequest === "function"
}

console.log(canMakeHTTPRequest())
// expected output (in a browser): true
```

---

That's all, folks!

Now, some of them are supported in the latest browsers and nodejs 12, but some of them are `stage 3`, so maybe we can see some changes.

if you have any questions or if I missed some cool features, comment down below. <3
