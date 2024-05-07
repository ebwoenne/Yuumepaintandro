const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = '#000000';
let brushSize = 5;

resizeCanvas(); // Set initial canvas size

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', drawTouch);

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
}

function draw(e) {
    if (!isDrawing) return;
    drawLine(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function drawTouch(e) {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent default touch actions like scrolling
    const touch = e.touches[0];
    drawLine(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}

function drawLine(x, y) {
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

function useBrush() {
    canvas.removeEventListener('touchstart', fillBucket);
    canvas.addEventListener('touchmove', drawTouch);
}

function useBucket() {
    canvas.removeEventListener('touchmove', drawTouch);
    canvas.addEventListener('touchstart', fillBucket);
}

function fillBucket(e) {
    // Fill bucket functionality for touch events
}

document.getElementById('colorPicker').addEventListener('change', (e) => {
    color = e.target.value;
});

document.getElementById('brushSize').addEventListener('change', (e) => {
    brushSize = parseInt(e.target.value);
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function exportImage() {
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = 'my_drawing.png';
    a.click();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; // Adjust for controls height
}
