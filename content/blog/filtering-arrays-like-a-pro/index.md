---
title: Filtering Arrays Like A Pro
date: 2019-11-02 22:32:00 # YYYY-MM-DD - H:M:S
author: Anurag Hazra
tags: ['javascript', 'tricks', 'like a pro']
---

Filtering arrays is the most common thing you might do as a javascript developer, and I know it can be sometimes messy
when filtering out primitive data-types or removing arrays or objects from an array, but I will show you some cool
tricks which I found while experimenting with js, let's get started


To filter arrays like a **PRO** we will use [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method.

> let me tell you that these are just hacks I found, and I don't know if they are a good use case for production apps.

## Removing falsy values

Removing falsy values from an array is much simpler with this simple little trick.

```js
const arr = [undefined, null, 0, '', 'str', 2.5, 2, { a: 1 }, []];
arr.filter(Boolean);
// -> ["str", 2.5, 2, { a: 1 }, []]
```

## Filtering Numbers

Using the [isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) function, we can filter numbers from the array.

```js
const arr = [undefined, null, 'str', 0, 1, 1.5, -2, 5, {}, []];
arr.filter(isFinite);
// -> [null, 0, 1, 1.5, -2, 5]
```

Now here comes the *javascript's weirdness*, if you use the global isFinite method then the array contains the `null` value as well, but if you use `Number.isFinite` then it will exclude the null.

> Now you would say why this? can't we just do `filter(i => typeof i === 'number')`?  
YES! We can, but that's not the main reason you are here, you are here because you wanted to know some tricks, right?

## Filtering Safe Integers

By passing [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger), we can filter the safe integers from the array.

Note that, Number.isSafeInteger also removes `floating-point` numbers and numbers which are greater than
`Number.MAX_SAFE_INTEGER`

```js
const arr = [null, 's', {}, 0, 1, 1.5, -2, 1, Number.MAX_SAFE_INTEGER + 1];
arr.filter(Number.isSafeInteger);
// -> [0, 1, -2, 1]
```

## Filtering NaN

With `isNaN` function, we can filter out all the `Numbers` from the array, and we ended up only with other elements.

Note:
that `null` is a special case

```js
const arr = [undefined, null, 0, 's', 1.1, 50, { a: 'b' }, [1, 2]];
arr.filter(isNaN);
// -> [undefined, 's', { a: 'b' }, [1, 2]]
```

Since `isNaN([1])` is `false` doing like so:

```js
[[1], [2, 3]].filter(isNaN);
// -> [[2, 3]]
```

will return `[[2, 3]]`


Methods you can also try:

- parseFloat()
- parseInt()

## Filter Only Arrays

With [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) method, we can extract just the arrays from the array. (that's mouthful 😂)

```js
const arr = [undefined, null, 0, 'str', 1, { a: 'b' }, [5, 6], [{ a: 5 }]];
arr.filter(Array.isArray);
// -> [[5,6], [{a: 5}]]
```

## Filtering Objects, Arrays, Functions, Classes

This one is maybe a bit unique than other methods. The [Object.isExtensible()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) method determines if an object is
extensible (whether it can have new properties added to it).

And with this, we can filter elements like `Arrays, Objects, Functions, Classes` which are extensible.

```js
const MyFunc = () => {};
class MyClass {}

const arr = [null, 0, 'str', 1.5, 5, { a: 'b' }, [1], MyFunc, MyClass];
arr.filter(Object.isExtensible);
// -> [{a: "b"}, [1], () => {}, class MyClass]
```

Methods you can also try:  
- [Object.isFrozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
- [Object.isSealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)

------

And I'm going to wrap things up here. I hope you enjoyed these cool little filtering tricks and maybe learned a thing or two.

Now, as I said earlier, these are just tricks and hacks you can use to make your life easier as a developer, but I don't think it's a good idea to use them in a real-world situation where it (maybe) can break.

Whatever, hope you like this, and now you are also a **PRO** at filtering arrays! 😉.  

And Don't forget to comment down your favorite array tricks and tips and let me know your thought's about these tricks.