---
title: "Cybertron 2.0"
slug: cybertron-2.0
workshop: "cybertron"
content-type: "collection"
published: "2025-01-21"
updated: "2025-01-21"
categories:
  - "functional programming"
  - "pure functions"
  - "function composition"
coverImage: ""
coverWidth: 16
coverHeight: 9
excerpt: "Cybertron 2.0 is a collection of exercises that will help you get a handle on the basics of function composition and writing functions in a 'functional' way"
---


## Cybertron? 

When I was learning to code functional programming was a concept that was introduced to us pretty early on. Full admission that at the time I didn't understand why it was a big deal or important. To be fair, when learning at that time in the condensed format of a bootcamp, code architecture/paradigms were hard to personally justify spending time on.

All of that to say, the founder of the bootcamp I went to, [Tom Wilson](https://github.com/twilson63), created a workshop called [Cybertron](https://github.com/twilson63/cybertron). This still lives on github. This is simply an updated UI for the workshop. 

I return to this workshop every now and then to work on functional concepts, skills, and patterns. 

## What's in the workshop?

The idea behind this workshop is to purely focus on reptition and getting practice with basic functional programming concepts.

You may find the ideas a bit basic but this is a feature. The idea is that you can come back to this workshop and work on the same exercise for a week or two and really get a handle on the concepts.

Each lesson has 4 exercises/challenges for you to complete. When Stackblitz starts up and loads as soon as you start working on an exercies it will watch the files and run tests. 

If you pass all the tests, you can move on to the next lesson. 

_Currently there is no saving of progress. Maybe in the future we will have a custom code implementation with Code Mirror and then have more robust saving of progress._

The first few exercises/lessons focus on using things like `map`, `filter`, `reduce`, and `compose` to solve problems.

The later exercises/lessons bring in a good many more functions for you to use and work with to solve problems.

The only thing that is being tested in the workshop is the answer to the problem you are presented with 

### Built with

The original workshop used: 

- [Ramdajs](https://ramdajs.com/) as the functional programming library
- [Tape](https://github.com/tape-testing/tape) for testing
- [Rollup](https://rollupjs.org/) for bundling
- Clone github repo and run locally

This '2.0' version uses: 

- [Ramdajs](https://ramdajs.com/) as the functional programming library
- [Vitest](https://vitest.dev/) for testing
- [Vite](https://vitejs.dev/) for bundling
- [Stackblitz](https://stackblitz.com/) for working on code in the browser




