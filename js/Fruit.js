var Fruit = function(width_s, height_s, x_pos, y_pos, src) {
    this.width = width_s;
    this.height = height_s;
    this.x_pos = x_pos;
    this.y_pos = y_pos;

    this.imgEl = document.createElement('img');

    this.initialize = function() {
        this.imgEl.src = src;
        this.imgEl.width = this.width;
        this.imgEl.style.position = "absolute";
        this.imgEl.style.left = this.x_pos + 'px';
        this.imgEl.style.top = this.y_pos + 'px';
        //this.imgEl.style.border = "1px solid #FFFFFF";
        document.getElementById('court').appendChild(this.imgEl);
    };

    this.set_y_pos = function(y_pos) {
        this.y_pos = y_pos;
        this.imgEl.style.top = this.y_pos + 'px';
    };

    this.set_x_pos = function(x_pos) {
        this.x_pos = x_pos;
        this.imgEl.style.left = this.x_pos + 'px';
    };
};