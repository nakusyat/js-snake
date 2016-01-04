var Tail = function(x_pos, y_pos, width_s, height_s, color, tail_type){
    this.tail_type = tail_type;
    this.width = width_s;
    this.height = height_s;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.color = color;
    this.divEl = document.createElement('div');

    this.initialize = function() {
        this.divEl.style.position = "absolute";
        this.divEl.style.left = this.x_pos + 'px';
        this.divEl.style.top = this.y_pos + 'px';
        this.divEl.style.width = this.width + 'px';
        this.divEl.style.height = this.height + 'px';
        this.divEl.style.background = this.color;
        this.divEl.style.border = "1px solid #FFFFFF";
        document.getElementById('court').appendChild(this.divEl);
    };

    this.set_y_pos = function(y_pos) {
        this.y_pos = y_pos;
        this.divEl.style.top = this.y_pos + 'px';
    };

    this.set_x_pos = function(x_pos) {
        this.x_pos = x_pos;
        this.divEl.style.left = this.x_pos + 'px';
    };

    this.initialize();
};