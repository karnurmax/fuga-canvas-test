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
 
let x1, y1, x2, y2, squareLineWidth = 1, step = 1; 
const intervalDuration = 10; 
 
const min = Math.min(canvas.width, canvas.height); 
squareFace = Math.floor(min / 2); 
if (squareFace % 2 == 1) squareFace--; 
const squareX = Math.floor(canvas.width / 2 - squareFace / 2); 
const squareY = Math.floor(canvas.height / 2 - squareFace / 2); 
x1 = squareX; 
y1 = squareY; 
// create squaer on center 
const createSquare = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = '#3a59d1'; 
    ctx.fillRect(squareX, squareY, squareFace, squareFace); 
 
    ctx.beginPath(); 
    ctx.lineWidth = squareLineWidth; 
    ctx.strokeStyle = "#000"; 
    ctx.rect(squareX, squareY, squareFace, squareFace); 
    ctx.stroke(); 
 
    ctx.beginPath(); 
    ctx.fillStyle = "yellow"; 
    ctx.fillRect(squareX, squareY, 1, 1); 
 
    ctx.beginPath(); 
    ctx.fillStyle = "yellow"; 
    ctx.fillRect(squareX + squareFace, squareY, 1, 1); 
 
} 
createSquare(); 
const tiles = []; 
 
 
let moveInterval; 
const drawPath = (...coords) => { 
    const arr = [...coords]; 
    ctx.beginPath(); 
    ctx.strokeStyle = line_color; 
    ctx.lineWidth = line_width; 
    ctx.moveTo(...arr[0]); 
    for (let i = 1; i < arr.length - 2; i++) 
        ctx.lineTo(...arr[i]); 
    ctx.lineTo(...arr.at(-1)); 
    ctx.stroke(); 
} 
const drawToRight = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = line_color; 
    drawPath([head.x - line_length, head.y], [head.x, head.y]); 
    // const arr = [head.x - line_length, head.y, line_length, +line_width]; 
    // ctx.fillRect(...arr); 
} 
const drawToBot = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = line_color; 
    const arr = [head.x - line_length, head.y, line_length, +line_width]; 
    ctx.fillRect(...arr); 
} 
const drawToLeft = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = line_color; 
    const arr = [head.x - line_length, head.y, line_length, +line_width]; 
    ctx.fillRect(...arr); 
} 
const drawToUp = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = line_color; 
    const arr = [head.x - line_length, head.y, line_length, +line_width]; 
    ctx.fillRect(...arr); 
} 
const drawToEnd = () => { 
    ctx.beginPath(); 
    ctx.fillStyle = line_color; 
    const arr = [head.x - line_length, head.y, line_length, +line_width]; 
    ctx.fillRect(...arr); 
} 
 
 
const drawByDir = { 
    'r': drawToRight, 
    'b': drawToBot, 
    'l': drawToLeft, 
    'u': drawToUp, 
    'e': drawToEnd 
} 
const drawLine = (dir) => { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    createSquare(); 
    drawByDir[dir](); 
} 
const head = { x: 0, y: Math.floor(y1 - line_width / 2 - squareLineWidth / 2) }; 
 
const move1 = () => moveInterval = setInterval(() => { 
    head.x += step; 
    if (head.x >= x1 + squareFace + line_width / 2 + squareLineWidth) { 
        clearInterval(moveInterval); 
        move2(); 
    } 
    drawLine('r'); 
 
}, intervalDuration); 
const move2 = () => moveInterval = setInterval(() => { 
    head.y += step; 
    if (head.y >= y1 + squareFace + +line_width) { 
        clearInterval(moveInterval); 
        // move3() 
    } 
    drawLine('b'); 
 
}, intervalDuration); 
move1();