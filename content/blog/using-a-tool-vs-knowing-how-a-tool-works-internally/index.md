---
title: Using a tool vs. knowing how a tool works internally
date: 2020-05-27 17:42:00
author: Anurag Hazra
tags: ["react", "javascript"]
---

My thoughts about using a tool vs. understanding how a tool works internally. 

Before we start let me tell you that this post isn't about which tool is better vue or react, my intentions are to express my thoughts about "Using a tool vs knowing how it works" & "If the tool is easier to work with, does that means it's easier to understand how it works?" 
Also note that i'm not an Vuejs expert.

Here's an important thing, 

People say react is hard but it's not, they think it's hard because they don't know how it works. 

People say redux is hard but it's not, they think it's hard because they don't know how it works, 

People say Vue is amazing and easy to use (of course it is) but most people don't know how it works internally, but still they love it and find it easier than react. 
 
------

The point to be noted here is that Vuejs is magic, and Reactjs is JavaScript just plain simple JavaScript. 

Most people find react hard because they lack the fundamental understanding of the language (js). 

But they don't find vuejs hard because vue does magical stuff to abstract away all the things which you have to do in order to get the app running.

**Now if I ask someone**  
"How does vuejs works"  
"How vuejs handles the template"  
"How v-if v-for works?"  

Well Vuejs parses the template in 3 stages. 
1. Compilation stage. 
2. Optimization stage. 
3. CodeGen stage.

Vuejs firstly parses the template and creates an AST representation of the template and parses all the directives, elements, tags, childrens, and then it runs the second stage of optimization stage where it sets a "static" flag on the nodes which are not gonna be dynamic, and then finally it generates a render function (an hierarchical representation of VirtualDOM). 

Vue needs to hide these implementations away from the end users in order to make it a breeze to work with. (which is in my opinion is amazing)

But knowing how vuejs internally works requires knowledge of AST, compilation, optimization, codegen etc etc. which in my opinion is not an easy task. 
And we haven't even talk about Reactivity in vuejs.

**Now, let's talk about React.**

**If I ask someone**  
"How react works?"  
"How conditional rendering works?"  

Well in case of react, the internals are far far more simpler than Vuejs. 
and yes modern react uses `JSX compilation` but you need to know how React.createElement works not how `compilation` works in order to understand how react works.

React has a `React.createElement` method which takes 3 parameters (tagName, props, childrens) in order to create a virtual dom node. 

basically ->
```jsx
<p>hello</p> 
// converts to
React.createElement("p", null, "hello");
```

Now with this simple factory function we can compose the whole virtual dom tree like this

```jsx
React.createElement(
  'div', 
  null,
  React.createElement('p', null, "hello")
)
```

After composing the dom tree ReactDOM.render will recursively mount the vdom to the actual dom.

And that's basically it. and the cool thing is because Reactjs is just plain simple javascript it answers all the questions like

- How conditional rendering works.  
- How loops will be handled.  

Because React.createElement is just a function call you can just pass an array of childrens

```jsx
let arr = ['one','two', 'three'];

React.createElement(
  'div',
  null,
  arr.map(v => React.createElement('p', null, v))
)
```

------

In my opinion for an average person to understand "How React works" is far easier than "How Vue works"

Because in case of vue you need to know about compilers, AST, optimizers, codegeneration. 
but to understand React you just need to understand how vdom (for vue too) works and how recursion works.


Now i know some people might disagree but its just my personal opinions.

1. React is javascript.
2. Vue is magic (not magic, CS actually).
3. Vue is **easier to work with.**
4. React is **easier to understand.**

People like Vuejs because of its simplicity.
I heard from lot of Vuejs devs that React is hard, and they say that because vuejs is easier to work with and does all the magic as i said earlier. 

But React is much more simpler to understand.

-----------

The point of this whole post is not about "React is better" or "Vue is better" it's about as a developer we should know how our tools works because knowing that is beneficial. 

**"Don't just use it, understand how it works"**
