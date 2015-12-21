var Snake = function() {
    this.tails = [];

    this.addHead = function() {
        var snakeHead = new Tail(20, 20, 60, 60, false);
        snakeHead.color = "#ffab40";
        snakeHead.initialize();
        this.tails.push(snakeHead);
    };

    this.addTail = function() {
        var tail_length = this.tails.length;
        var x_pos = this.tails[0].x_pos;
        var y_pos = this.tails[0].y_pos + this.tails[0].height;

        if( tail_length ) {
            var lastTail = this.tails[tail_length - 1];
                x_pos = lastTail.x_pos;
                y_pos = lastTail.y_pos + this.tails[0].height;
        }

        var snakeTail = new Tail(this.tails[0].width, this.tails[0].height, x_pos, y_pos, true);
        snakeTail.initialize();
        this.tails.push(snakeTail);
    };
};