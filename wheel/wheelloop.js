var numOfColors = 9;
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
