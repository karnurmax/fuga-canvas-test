// for test demo only 
if (!document.location.search.includes('line_width'))
    document.location.replace('?line_width=1&line_color=blue&line_length=60&fade_back=20&fade_front=0&time=4&fps=30');

// load settings from URL 
let {
    line_width,
    line_color,
    line_length,
    fade_back,
    fade_front,
    time,
    fps
} = Object.fromEntries(
    new URLSearchParams(window.location.search)
)
//convert to numbers 
line_color = line_color;
line_length = line_length;
line_width = line_width;
time = +time;
fps = +fps;

//create canvas 
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//set canvas size fullscreen 
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const squareLineWidth = 1;
const min = Math.min(canvas.width, canvas.height);
let squareFace = Math.floor(min / 2);

const totalPathLength = canvas.width + squareFace * 4 + line_length * 2;

const intervalDuration = 4;
const step = totalPathLength / (1000 / intervalDuration) / time;

//fix collision
if (squareFace % 2 == 1) squareFace--;

line_length = Math.min(squareFace, line_length);
line_length = Math.max(squareFace / 2, line_length);
const x1 = Math.floor(canvas.width / 2 - squareFace / 2);
const y1 = Math.floor(canvas.height / 2 - squareFace / 2);

const x0 = 0;
const y0 = y1;

const x2 = x1 + squareFace;
const y2 = y1;

const x3 = x2;
const y3 = y2 + squareFace;

const x4 = x1;
const y4 = y3;

const head = { x: x0, y: y0 };
// create squaer on center 
const createSquare = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rectX = x1 + line_width / 2;
    const rectY = y1 + line_width / 2;
    ctx.beginPath();
    ctx.fillStyle = '#3a59d1';
    ctx.fillRect(rectX, rectY, squareFace - line_width, squareFace - line_width);

    ctx.beginPath();
    ctx.lineWidth = squareLineWidth;
    ctx.strokeStyle = "#000";
    ctx.rect(rectX, rectY, squareFace - line_width, squareFace - line_width);
    ctx.stroke();

}
createSquare();
const tiles = [];


let moveInterval;
const drawPath = (...coords) => {
    createSquare();
    const arr = [...coords];
    ctx.beginPath();
    ctx.strokeStyle = line_color;
    ctx.lineWidth = line_width;
    ctx.moveTo(...arr[0]);
    if (arr.length == 3)
        ctx.lineTo(...arr[1]);
    ctx.lineTo(...arr.at(-1));
    ctx.stroke();
}

const moveByDirection = {
    'right': () => {
        head.x += step;
        if (head.x >= x2) {
            head.x = x2;
            movingFunction = moveByDirection['bottom'];
            return;
        }
        drawPath([head.x - squareFace, head.y], [head.x, head.y]);

    },
    'bottom': () => {
        head.y += step;
        if (head.y >= y3) {
            head.y = y3;
            movingFunction = moveByDirection['left'];
            return;
        }
        const tail = [x2 - (squareFace - (head.y - y2)), y2]
        drawPath(tail, [x2, y2], [head.x, head.y]);
    },
    'left': () => {
        head.x -= step;
        if (head.x <= x4) {
            head.x = x4;
            movingFunction = moveByDirection['top'];
            return;
        }
        const tail = [x2, y3 - (squareFace - (x3 - head.x))];
        drawPath(tail, [x3, y3], [head.x, head.y])
    },
    'top': () => {
        head.y -= step;
        if (head.y <= y1) {
            head.y = y1;
            movingFunction = moveByDirection['lastRight'];
            return;
        }
        const tail = [x4 + (squareFace - (y4 - head.y)), y4];
        drawPath(tail, [x4, y4], [head.x, head.y]);
    },
    'lastRight': () => {
        head.x += step;

        const tail = [x1, y1 + (squareFace - (head.x - x1))];
        if (tail[1] <= y1) {
            movingFunction = moveByDirection['end'];
            return;
        }
        drawPath(tail, [x1, y1], [head.x, head.y]);
    },
    'end': () => {
        head.x += step;
        const tail = [head.x - squareFace, y1]
        if (tail[0] >= canvas.width) {
            createSquare();
            clearInterval(moveInterval);
            console.timeEnd();
            console.log(time);
            return;
        }
        drawPath(tail, [head.x, head.y]);
    }
}
let movingFunction = moveByDirection['right'];
const move = () => {
    moveInterval = setInterval(() => {
        movingFunction();
    }, intervalDuration);
}
console.time();
move();