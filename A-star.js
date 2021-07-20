var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start, end;
var w, h;

var path = [];
var attempts = 0;

var sButton;
var begin = false;
var changeEnd = false;
var clicked = false;

var rButton;
var dButton;

var spButton;

var slider;

endX = rows - 1;
endY = cols - 1;

function setup() {
  createCanvas(400, 500);
  w = width/cols;
  h = (height-100)/rows;

  for (let i = 0; i < cols; i++)
    grid[i] = new Array(rows);

  slider = createSlider(0, 100, 30);
  slider.position(200, 440);
  slider.style('width', '80px');

  randomize();

  reStart();

  sButton = createButton('Start');
  sButton.position(10, 440);
  sButton.mousePressed(run);

  rButton = createButton('Randomize');
  rButton.position(110, 440);
  rButton.mousePressed(randomize);

  spButton = createButton('Stop');
  spButton.position(60, 440);
  spButton.mousePressed(stop);

  dButton = createButton('Change Endpoint');
  dButton.position(10, 470);
  dButton.mousePressed(changeEndpoint);
}

function distance(a, b) {
  return dist(a.i, a.j, b.i, b.j);
  // return d = abs(a.i - b.i) + abs(a.j - b.j);
}

function newPath() {
  let current = 0;
  if (openSet.length > 0) {
    let winner = 0;

    for (let i = 0; i < openSet.length; i++)
      if (openSet[i].f < openSet[winner].f)
        winner = i;

    current = openSet[winner];

    if (current === end) {
      begin = false;
      console.log("DONE");
    }

    for (let i = openSet.length - 1; i >= 0; i--)
      if (openSet[i] == current)
        openSet.splice(i, 1);

    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        let possible_g = current.g + distance(neighbour, current);

        let new_path = false;
        if (openSet.includes(neighbour)) {
          if (possible_g < neighbour.g) {
            neighbour.g = possible_g;
            new_path = true;
            attempts++;
          }
        } else {
          neighbour.g = possible_g;
          new_path = true;
          openSet.push(neighbour);
        }

        if (new_path) {
          neighbour.h = distance(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  } else {
    console.log("no solution");
    begin=false;
    return;
  }

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
}

function draw() {
  if (begin)
    newPath();

  background(220);


  for (let i = 0; i < closedSet.length; i++)
    closedSet[i].show(color(255, 0, 0));

  for (let i = 0; i < openSet.length; i++)
    openSet[i].show(color(0, 255, 0));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (changeEnd && i === round((mouseX-w/2)/w) && j === round((mouseY-h/2)/h)) {
        grid[i][j].show(color(255,50,255));
      }
      else if (grid[i][j] === start)
        grid[i][j].show(color(20, 20, 255));
      else if (grid[i][j] === end)
        grid[i][j].show(color(20, 20, 255));
      else
        grid[i][j].show();
    }
  }

  noFill();
  stroke(0,0,0);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
 endShape();

//   menu

  line(0, 405, 400, 405);
  push();
  noStroke();
  fill(0);
  text("% of grid in obstacles", 180, 435);
  text("0%            100%", 200, 470);

  text("Attempts:", 320, 450);
  textSize(15);
  text(attempts, 335, 470);
  pop();

  clicked = false;
}

function run() {
  reStart();
  begin = true;
  attempts = 1;
}

function randomize() {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j] = new Node(i, j, slider.value()/100);

  reStart();
}

function reStart() {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j].addNeighbours(grid);

  path = [];
  openSet = [];
  closedSet = [];

  start = grid[25][25];
  end = grid[endY][endX];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
  attempts = 0;
  begin = false;
}

function stop() {
  begin = false;
}

function changeEndpoint() {
  reStart();
  changeEnd = true;
  clicked = true;
}

function mousePressed() {
  if (changeEnd && !clicked) {
    endY = round((mouseX-w/2)/w);
    endX = round((mouseY-h/2)/h);
    changeEnd = false;
    reStart();
  }
}
