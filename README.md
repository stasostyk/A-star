# <p align="center">A* Algorithm: Efficient Pathfinding </p>

This is my go at the A* algorithm, heavily inspired by Daniel Shiffman's tutorial on the base algorithm with the addition of interactivity.

#<p align="center">![A-star Demo](demo.png?raw=true "A-star")</p>
## Check it out at https://editor.p5js.org/stasostyk/present/Pwu8JFF3Z

## What is A*?
A* is a pathfinding algorithm which attempts to find the shortest path between two points on a grid in the least amount of time. It's complexity in big O notation is O(b^d), where b is the branching factor (the average number of successors per node).

At its core, the algorithm assesses an 'f' score to each node along the path it takes which meassures its distance from startpoint and distance to endpoint, f(n) = g(n) + h(n). It then travels across the nodes with lowest 'f' scores to find its optimal path. It will always first try to go towards the endpoint, and then branch out.

## What can it do?

[x] Start, freeze, and restart the algorithm.
[x] Modify the obstacle probability, and randomize the location of obstacles.
[x] Choose a custom endpoint for the algorithm to look for.
