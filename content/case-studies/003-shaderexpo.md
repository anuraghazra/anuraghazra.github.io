---
title: ShaderExpo
excerpt: ShaderExpo is a purely dependency-free shader editor made in Raw WebGL API. Experiment with basic WebGL shaders on the fly. ShaderExpo Includes rich features like Inline Error Logs, AutoCompletion, Live Editing, Example Shaders, etc. ShaderExpo is also mentioned in Awesome-Webgl.

iframe: //www.youtube.com/embed/rtPhA041U4U/?modestbranding=1&showinfo=0&autohide=1&rel=0
demo: //anuraghazra.github.io/ShaderExpo
src: //github.com/anuraghazra/ShaderExpo

info:
  idea: The basic idea of the project was to create a real-time WebGL shader editor with linting and on the fly updates.
  tech: [Javascript, HTML5 Canvas, WebGL]
  links:
    - [GLSL Sandbox, https://glslsandbox.com]
    - [
        ShaderExpo on AwesomeWebGL,
        https://github.com/sjfricke/awesome-webgl#glsl-editors,
      ]
    - [
        Jonas Wagner on Github from where i found some snippets,
        https://github.com/jwagner,
      ]
---

WebGL Shader Playground.

## Features

- Rich CodeEditor
- Simple CodeEditor
- AutoCompletion
- Live Editing
- Basic Debugging

I made shader expo because I wanted to learn WebGL Shaders quickly and to understand how WebGL handles shaders at the runtime.
The most critical part of Webgl is setting up the boilerplate for all the code.

## Shader Class

I created this modular shader class to handle, update, compile the Fragment, and Vertex shaders.
It holds the `WebGL Program`, fragmentShader and VertexShader source String and shaders itself, and `Errors` of each shader.

```js
class Shader {
  constructor(gl, vShader, fShader) {
    this.gl = gl
    this.vShader = vShader
    this.fShader = fShader

    this.vertexShader = null
    this.fragmentShader = null

    this.uniforms = {}
    this.attribs = {}

    this.program = null

    this.isVertexShaderError = false
    this.isFragmentShaderError = false
    this.fragmentShaderErrors = []
    this.vertexShaderErrors = []
  }
}
```

### Init Shaders

> [init code on github](https://github.com/anuraghazra/ShaderExpo/blob/master/js/Shader.js#L23) 

Then I added a init method which initializes the shaders from its source and creates the program with `this.createProgram` method.
If we encounter any errors, then we will not create the program and terminate the function. We also have `this.createShader()` method, which creates and initialize the shader.
```js
init() {
  this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vShader);
  this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fShader);

  if (this.isFragmentShaderError) return;
  if (this.isVertexShaderError) return;
  this.createProgram();
}
```

### createShader

> [createShader code on github](https://github.com/anuraghazra/ShaderExpo/blob/master/js/Shader.js#L101) 

createShader method creates the WebGL shader from the source, compiles it, and checks for errors. and if we encounter any errors while compiling we set the `isVertexShaderError` and `isFragmentShaderError` to `true` and also sets the `vertexShaderErrors`, `fragmentShaderErrors` with the error message.
```js
createShader(type, source) {
  const shader = this.gl.createShader(type);
  this.gl.shaderSource(shader, source);
  this.gl.compileShader(shader);
  // Check For Shader Errors
  let error = this.getShaderError(shader, source);
  let name = (type == this.gl.VERTEX_SHADER) ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER';

  if (error) {
    error.type = name;
    if (error.type === 'VERTEX_SHADER') {
      this.vertexShaderErrors = error;
      this.isVertexShaderError = true;
    } else {
      this.fragmentShaderErrors = error;
      this.isFragmentShaderError = true;
    }
    return null;
  }

  return shader;
}
```

### createProgram
> [createProgram code on github](https://github.com/anuraghazra/ShaderExpo/blob/master/js/Shader.js#L36) 

The `createProgram` function creates the program, attaches the shaders, links the program, and also throws errors if we encounter any Errors.
And finally returns the program. 
```js
createProgram() {
  this.program = this.gl.createProgram();
  this.gl.attachShader(this.program, this.vertexShader);
  this.gl.attachShader(this.program, this.fragmentShader);
  this.gl.linkProgram(this.program);

  if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
    console.warn('Unable to initialize program ' + this.gl.getProgramInfoLog(this.program));
    return null;
  }
  return this.program;
}
```

### getShaderError
> [getShaderError code on github](https://github.com/anuraghazra/ShaderExpo/blob/master/js/Shader.js#L75) 
We also have `getShaderError` method which is a helper method to get specific error message for specific shader, it also shows where the error happend in the source code with line number.
```js
getShaderError(shader, shaderString) {
  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    let lines = [];
    let reg = /ERROR:\s\d+:(\d+):/img;
    let errorMsg = this.gl.getShaderInfoLog(shader);

    errorMsg.replace(reg, function (match, g1, g2) {
      lines.push((+g1));
    });
    let message = this.gl.getShaderInfoLog(shader);
    message = message.split('\n');
    message.pop();

    return {
      msg: message,
      line: lines
    };
  }
}
```

## Other Classes
`Shader` class was the most important for this project. We also have `Camera`, `RawModel`, `Mesh` classes, which handle different parts of the WebGL context.
> [see all the classes on Github](https://github.com/anuraghazra/ShaderExpo/tree/master/js)


## Setup
In the end, I also used [Ace](https://ace.c9.io/) library to get my code editor up and running. (which was easy)

> [see index.js setup](https://github.com/anuraghazra/ShaderExpo/blob/master/index.js)

I also used some different shaders from [GLSL Sandbox](https://glslsandbox.com) to check things out and see the capabilities of ShaderExpo.