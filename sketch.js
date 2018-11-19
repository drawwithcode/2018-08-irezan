var state = 0;
var rotated = false;
var shaken = false;
var shakeSound;
var refCount;
var myAnswer = '';
var answers = [ 'As I see it, yes',
                'It is certain',
                'It is decidedly so',
                'Most likely',
                'Outlook good',
                'Signs point to yes',
                'Without a doubt',
                'Yes',
                'Yes, definitely',
                'You may rely on it',
                'Reply hazy, try again',
                'Ask again later',
                'Better not tell you now',
                'Cannot predict now',
                'Ask again',
                'Do not count on it',
                'My reply is no',
                'My sources say no',
                'Outlook not so good',
                'Very doubtful',
                '\nImpossible',
                'No'
]

var d, x1, x2, x3, y1, y2, y3;


function preload() {
  shakeSound = loadSound('./assets/shake-sound.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  setShakeThreshold(60);
  textFont('Russo One');
}

function draw() {
  background(40);

  if (state == 0 && rotated == true) {
    state = 1;
  } else if (state == 1 && shaken == true) {
    state = 2;
  }

  if (state == 0) {
    drawStateZero();
  } else if (state == 1) {
    drawStateOne();
  } else if (state == 2) {
    drawStateTwo();
  } else if (state == 3) {
    drawStateThree();
  }

  // if (state != 0){
  //   pop();
  //   fill(255);
  //   var instruction = 'Ask something \n and shake your phone';
  //   textSize(20);
  //   text(instruction, windowWidth / 2, 4.3 * windowHeight / 5);
  //   push();
  // }
}

function deviceShaken() {
  if (state == 1) {
    shaken = true;
  } else if (state == 3 && frameCount - refCount > 60) {
    state = 2;
    shaken = true;
  }
}

function deviceTurned() {
  if (turnAxis === 'Z') {
    rotated = true;
  } else if (turnAxis === 'X') {
    rotated = true;
  } else if (turnAxis === 'Y') {
    rotated = true;
  }
}

// function mousePressed() {
//   if (state == 0) {
//     state = 1;
//  } else if(state==1 || state==3){
//     state=2;
//   }
// }

function drawStateZero() {
  rotated = false;
  
  fill(255);
  var d = windowWidth / 1.5;

  ellipse(windowWidth / 2, windowHeight / 2, d);

  var posTitle = 4.3 * windowHeight / 5;
  var title = 'The Magic Eight';
  textSize(30);
  text(title, windowWidth / 2, posTitle);

  var instruction = 'Turn your phone to begin';
  textSize(20);
  textFont('Montserrat');
  text(instruction, windowWidth / 2, posTitle + 30);

  fill(40);
  var eight = '8';
  textSize(100);
  textFont('Russo One');
  text(eight, windowWidth / 2, windowHeight / 2);
}

function drawStateOne() {
  fill(255);
  d = windowWidth / 1.5;
  x1 = windowWidth / 2;
  y1 = windowHeight / 2 - d / 2;
  x2 = (windowWidth + sqrt(3) * (d / 2)) / 2;
  y2 = (windowHeight + (d / 2)) / 2;
  x3 = (windowWidth - sqrt(3) * (d / 2)) / 2;
  y3 = (windowHeight + (d / 2)) / 2;
  triangle(x1, y1, x2, y2, x3, y3);

  pop();
  fill(255);
  var instruction = 'Ask something \n and shake your phone';
  textSize(20);
  text(instruction, windowWidth / 2, 4.3 * windowHeight / 5);
  push();
}

function drawStateTwo() {
  fill(255);
  triangle(x1, y1, x2, y2, x3, y3);

  fill(40);
  myAnswer = answers[Math.floor(Math.random() * 22)];

  refCount = frameCount;

  pop();
  fill(255);
  var instruction = 'Ask something \n and shake your phone';
  textSize(20);
  text(instruction, windowWidth / 2, 4.3 * windowHeight / 5);
  push();

  shakeSound.play();

  state = 3;
}

function drawStateThree() {

  fill(255);
  triangle(x1, y1, x2, y2, x3, y3);

  fill(40);
  textFont('Montserrat');
  var boxWidth = windowWidth / 3.5;
  var boxHeight = windowWidth / 3.5;
  var boxX = windowWidth / 2 - boxWidth / 2;
  var boxY = windowHeight / 2 - boxHeight / 2;

  text(myAnswer, boxX, boxY, boxWidth, boxHeight);

  pop();
  fill(255);
  var instruction = 'Ask something \n and shake your phone';
  textSize(20);
  text(instruction, windowWidth / 2, 4.3 * windowHeight / 5);
  push();
}
