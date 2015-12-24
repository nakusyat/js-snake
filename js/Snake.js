var Snake = function(x_pos, y_pos, width, height, head_color, tail_color) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.head_color = head_color;
    this.tail_color = tail_color;
    this.tails = [];

    this.addHead = function() {
        var snakeHead = new Tail(this.x_pos, this.y_pos, this.width, this.height, this.head_color, false);
        snakeHead.initialize();
        this.tails.push(snakeHead);
    };

    this.addTail = function() {
        var tail_length = this.tails.length;
        if( tail_length ) {
            var x_pos;
            var y_pos;

            if( tail_length >= 2 ) {
                var preLastTail = this.tails[tail_length - 2];
                var lastTail = this.tails[tail_length - 1];
                if(preLastTail.x_pos === lastTail.x_pos) {
                    x_pos = lastTail.x_pos;
                    if( preLastTail.y_pos > lastTail.y_pos ) {
                        y_pos = lastTail.y_pos - this.height;
                    } else {
                        y_pos = lastTail.y_pos + this.height;
                    }
                } else if(preLastTail.y_pos === lastTail.y_pos) {
                    y_pos = lastTail.y_pos;
                    if(preLastTail.x_pos > lastTail.x_pos) {
                        y_pos = lastTail.x_pos - this.height;
                    } else {
                        y_pos = lastTail.x_pos - this.height;
                    }
                }

            } else {
                x_pos = this.x_pos;
                y_pos = this.y_pos + this.height;

            }

            var snakeTail = new Tail(x_pos, y_pos, this.width, this.height, this.tail_color, true);
            snakeTail.initialize();
            this.tails.push(snakeTail);
        }

    };
};