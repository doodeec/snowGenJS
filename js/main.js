$(document).ready(function (){

    var canvas = document.getElementById('c'),
        context = canvas.getContext('2d'),
        doc = $(document),
        color = { r: 0, g: 0, b: 0 },
        points = [],
        sizeX = canvas.width,
        sizeY = canvas.height,
        gravity = 0.4;

    //set canvas width/height properties to fill document
    canvas.width = doc.width();
    canvas.height = doc.height();


    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    function Point(x,y,distance){
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.radius = 3*distance;
        this.velocity = distance*(1+Math.random());

        this.opacity = 1 - this.distance/10;

        return this;
    }

    Point.prototype.draw = function (){
        // just helper not to write it three times
        var fillColorHelper = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',';

        var _radgrad = context.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
        _radgrad.addColorStop(0, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(0.1, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(1, fillColorHelper + '0)');

        context.fillStyle = _radgrad;
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.closePath();
        context.fill();
    };

    var loop = function loop(data){
        clearCanvas();
        var pointsArray = [];

        for (var j= 0, length = points.length; j < length; j++) {
            var point = points[j];

            if (point.y + point.velocity < sizeY + 20) {
                point.draw();
                point.y += point.velocity*gravity;
                pointsArray.push(point);
            } else {
                var p = new Point(Math.random()*sizeX, -20, point.distance);
                pointsArray.push(p);
            }
        }

        points = pointsArray;

        requestAnimationFrame(loop);
    };

    // generate some amount of small snowflakes
    for (var k=0; k < 100; k++) {
        var p_big = new Point(Math.random()*sizeX, Math.random()*sizeY, 7 + Math.random()*3);
        points.push(p_big);

        var p_small = new Point(Math.random()*sizeX, Math.random()*sizeY, 1 + Math.random()*2);
        points.push(p_small);

        var p_tiny = new Point(Math.random()*sizeX, Math.random()*sizeY, 1 + Math.random()*2);
        points.push(p_tiny);
    }

    requestAnimationFrame(loop);

    // generate new snowflake when clicked
    /*
    $(document).on('click', function click(e){
        var p = new Point(e.offsetX, e.offsetY, 2 + Math.random()*8);
        points.push(p);
    });*/

    var clearCanvas = function clearCanvas(){
        context.clearRect(0,0,sizeX,sizeY);
    }
});