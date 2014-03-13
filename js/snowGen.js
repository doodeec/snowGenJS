(function () {
    var canvas = document.getElementById('c'),
        context = canvas.getContext('2d'),
        color = { r: 255, g: 255, b: 255 },
        points = [],
        sizeX = 0,
        sizeY = 0,
        gravity = 0.4,
        pastTime = null;

    //set canvas width/height properties to fill document
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sizeX = canvas.width;
    sizeY = canvas.height;

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    /**
     * Snowflake constructor
     * @param x
     * @param y
     * @param distance
     * @returns {Point}
     * @constructor
     */
    function Point(x, y, distance) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.radius = 3 * distance;
        this.velocity = distance * (0.5 + Math.random()) * (0.5 + Math.random()) * (0.5 + Math.random());
        this.opacity = 1 - this.distance / 10;

        return this;
    }

    /**
     * draws snowflake into canvas
     */
    Point.prototype.draw = function () {
        // just helper not to write it three times
        var fillColorHelper = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',';

        var _radgrad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        _radgrad.addColorStop(0, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(0.1, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(1, fillColorHelper + '0)');

        context.fillStyle = _radgrad;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    };

    function loop(data) {
        clearCanvas();
        var pointsArray = [],
            j = 0, len = points.length, point, distance;

        for (; j < len, point = points[j]; j++) {
            distance = pastTime ? point.velocity * gravity * (data - pastTime) / 10 : point.velocity * gravity;

            if (point.y + distance < sizeY + 20) {
                point.draw();
                point.y += distance;
                pointsArray.push(point);
            } else {
                pointsArray.push(new Point(Math.random() * sizeX, -20, point.distance));
            }
        }

        pastTime = data;
        points = pointsArray;
        requestAnimationFrame(loop);
    }

    function clearCanvas() {
        context.clearRect(0, 0, sizeX, sizeY);
    }

    // generate some amount of small snowflakes
    for (var k = 0; k < 100; k++) {
        //big flakes
        points.push(new Point(Math.random() * sizeX, Math.random() * sizeY, 7 + Math.random() * 3));
        //small flakes
        points.push(new Point(Math.random() * sizeX, Math.random() * sizeY, 1 + Math.random() * 2));
        //tiny flakes
        points.push(new Point(Math.random() * sizeX, Math.random() * sizeY, 1 + Math.random() * 2));
    }

    requestAnimationFrame(loop);

    // generate new snowflake when clicked
    /*
     $(document).on('click', function click(e){
     var p = new Point(e.offsetX, e.offsetY, 2 + Math.random()*8);
     points.push(p);
     });*/
})(this);