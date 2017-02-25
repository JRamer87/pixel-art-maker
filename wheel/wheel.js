//rgb to 255 (red, green, blue)
console.log("this links")
//data

var numOfColors = 300;
//must be divisible by 3
var colorArry = [];
var greenArry = []
var blueArry = []
var redArry = []
var labels = []
var data = []
var green = '';
var blue = '';
var red = '';
var spaces = '';
var degrees = 360/numOfColors
var colorMax = 255;
var colorIterations = numOfColors / 3


for(let j=0; j<numOfColors; j++){
labels.push(spaces)
data.push(degrees)
}
console.log(labels)
console.log(data)
//must be divisible by 3!!
for (let i = 0; i < colorIterations; i++) {
    green = "rgb(" + 0 + "," + Math.floor((colorMax * ((colorIterations) - i) / colorIterations)) + "," + Math.floor((colorMax * (i / colorIterations))) + ")";
    greenArry.splice(i, 0, green);

    blue = "rgb(" + Math.floor((colorMax * (i / colorIterations))) + "," + 0 + "," + Math.floor((colorMax * ((colorIterations) - i) / colorIterations)) + ")";
    blueArry.splice((i), 0, blue);


    red = "rgb(" + Math.floor((colorMax * ((colorIterations) - i) / colorIterations)) + "," + Math.floor((colorMax * (i / colorIterations))) + "," + 0 + ")";

    redArry.splice(i, 0, red);


}
colors=greenArry.concat(blueArry).concat(redArry);

console.log(colors)
//draws each segment
function drawSegment(canvas, context, i) {
    //context.save??? what does this do?
    context.save();
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2);

    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius,
        startingAngle, endingAngle, false);
    context.closePath();

    context.fillStyle = colors[i];
    context.fill();

    context.restore();

    drawSegmentLabel(canvas, context, i);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
        sum += a[j];
    }
    return sum;
}

//draws labels
function drawSegmentLabel(canvas, context, i) {
    context.save();
    var x = Math.floor(canvas.width / 2);
    var y = Math.floor(canvas.height / 2);
    var angle = degreesToRadians(sumTo(data, i));

    context.translate(x, y);
    context.rotate(angle);
    var dx = Math.floor(canvas.width * 0.5) - 10;
    var dy = Math.floor(canvas.height * 0.05);

    context.textAlign = "right";
    var fontSize = Math.floor(canvas.height / 25);
    context.font = fontSize + "pt Helvetica";

    context.fillText(labels[i], dx, dy);

    context.restore();
}
//draws the chart

canvas = document.getElementById("piechart");
var context = canvas.getContext("2d");
for (var i = 0; i < data.length; i++) {
    drawSegment(canvas, context, i);
}

// <canvas id="piechart" width="400" height="400">
// </canvas>
