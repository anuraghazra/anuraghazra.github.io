---
title: Verly Range Slider
excerpt: Verly Range Slider is one of my fun projects which uses my Verly.js physics engine, it was also mentioned in CodepenSpark. verly range slider got viral on th net and got over 15K views on codepen.io. it uses Verlet physics to simulate those delighful dangly sliders.

iframe: //codepen.io/anuraghazra/embed/agKJEd/?default-tab=result&theme-id=light
demo: //anuraghazra.github.io/VerlyRangeSlider
src: //github.com/anuraghazra/VerlyRangeSlider

info:
  idea: the basic idea of the project is to achive and simulate biological creatures in a aquerium to see how they react  different scenarios
  tech: [Javascript, HTML5 Canvas]
  links:
    - [ CodingTrain Steering Behavior Playlist, https://www.youtube.com/watch?v=mhjuuHl6qHM&t=1978s ]
    - [ Craige Reynold’s Flocking Behavior, https://www.red3d.com/cwr/index.html ]
---

Range sliders with some verlet physics magic!

## Usage

Download

```bash
git clone https://github.com/anuraghazra/VerlyRangeSlider.git
```

OR

copy paste this code to your page header

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/anuraghazra/VerlyRangeSlider@v1.0.2/src/style.css" />
<script src="https://cdn.jsdelivr.net/gh/anuraghazra/Verly.js@v1.1.4/dist/verly.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/gh/anuraghazra/VerlyRangeSlider@v1.0.2/src/VerlyRange.js"></script>
```

basic markup

```html
<label class="slidecontainer">
  <span>My Slider</span>
  <input class="slider" id="my-slider" type="range" min="1" step="0.01" max="100" value="20" />
</label>
```

in your js file

```javascript
// id, color
VerlyRange('my-slider', '#655ecf');
```

---

Verly range slider is made with [Verly.js](https://github.com/anuraghazra/Verly.js)

Made with :heart: and Javascript by [Anurag Hazra](http://anuraghazra.github.io)