# react-gsap

> React components for GSAP

[![NPM](https://img.shields.io/npm/v/react-gsap.svg)](https://www.npmjs.com/package/react-gsap)
![npm type definitions](https://img.shields.io/npm/types/react-gsap)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-gsap)

# Introduction

`react-gsap` lets you use the GreenSock Animation Platform (GSAP) in React in a fully declarative way.
It abstracts away the direct use of the GSAP [Tween](https://greensock.com/docs/v3/GSAP/Tween) and [Timeline](https://greensock.com/docs/v3/GSAP/Timeline) functions.

If you need the full control it's possible by getting low level access to the underlying objects.

In addition to that it has it's own SVG drawing Plugin and some useful helper components.

From version 2 on it's build for GSAP 3 and only has `gsap` as a peer dependency. In this way you can update `gsap` separately from `react-gsap`.

It's built with TypeScript and ships the types directly in the package.

## Installation

```bash
npm install gsap, react-gsap
```

## About GSAP

GreenSock Animation Platform (GSAP) is a set of some JavaScript functions which let you tween a value/attribute/css property over time and insert these tweens into a timeline for more complex animations.

`react-gsap` just adds some React wrapper components for these functions, so also read the official GreenSock documentation to know how to do things:

[GreenSock Docs](https://greensock.com/docs/)


## License

MIT © [bitworking](https://github.com/bitworking)
