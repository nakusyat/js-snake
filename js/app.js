
var Tail = function(width_s, height_s, x_pos, y_pos, tail_type){
    this.tail_type = tail_type;
    this.width = width_s;
    this.height = height_s;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.color = "#8d6e63";
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
};

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

var app = angular.module('store', [ ]);
    app.controller('CourtController', function($scope) {
        var direction = '38';
        var last_pos_x = 0;
        var last_pos_y = 0;
        var x_pos = 0;
        var y_pos = 0;
        var wall_width = document.getElementById('court').offsetWidth;
        var wall_height = document.getElementById('court').offsetHeight;
        var control = true;
        var snake = new Snake();
        var fruits = [];

        document.onkeydown = setDirection;
        function setDirection(e) {
             e = e || window.event;
             direction = e.keyCode;
         };

        this.initFruit = function() {
          CreateFruit();
        };

        this.initSnake = function() {
            $scope.eaten_point = 0;
            snake.addHead();
            snake.addTail();
        };

        this.reloadGame = function(){
            location.reload();
        };

        this.restart = false;

        this.initSnakeMove = function() {
            setInterval(function() { if(control) {
               if (direction == '38') {
                    //up
                    y_pos = -1 * snake.tails[0].height;
                    if(snake.tails.length > 1 && snake.tails[0].y_pos < snake.tails[1].y_pos || snake.tails[0].y_pos === snake.tails[1].y_pos ) {
                        moveSnakeUpDown(y_pos);
                    }else{
                        direction = '40';
                    }
               }
               else if (direction == '40') {
                    //down
                    y_pos = snake.tails[0].height;
                    if(snake.tails.length > 1 && snake.tails[0].y_pos > snake.tails[1].y_pos || snake.tails[0].y_pos === snake.tails[1].y_pos) {
                        moveSnakeUpDown(y_pos);
                    }else{
                        direction = "38";
                    }
               }
               else if (direction == '37') {
                    //left
                    x_pos = -1*snake.tails[0].width;
                    if(snake.tails.length > 1 && snake.tails[0].x_pos < snake.tails[1].x_pos || snake.tails[0].x_pos === snake.tails[1].x_pos ) {
                        moveSnakeLeftRight(x_pos);
                    }else{
                        direction = "39";
                    }
               }
                else if (direction == '39') {
                    //right
                    x_pos = snake.tails[0].width;;
                    if(snake.tails.length > 1 && snake.tails[0].x_pos > snake.tails[1].x_pos || snake.tails[0].x_pos === snake.tails[1].x_pos ) {
                        moveSnakeLeftRight(x_pos);
                    }else{
                        direction = "37";
                    }
               }
            } }, 500);

            function moveSnakeLeftRight(x_pos){
                for( var i=0; i<snake.tails.length; i++){
                    if(!snake.tails[i].tail_type) {
                        last_pos_x = snake.tails[i].x_pos;
                        last_pos_y = snake.tails[i].y_pos;
                        snake.tails[i].set_x_pos(snake.tails[i].x_pos + x_pos);
                        if(snake.tails[i].y_pos === fruits[0].y_pos && snake.tails[i].x_pos === fruits[0].x_pos) {
                            playSound("sound/bite.wav");
                            snake.addTail();
                            CreateFruit();
                            $scope.$apply(function() {
                                $scope.eaten_point += 1;
                            });
                        }
                        if(snake.tails[i].x_pos < 0 || snake.tails[i].x_pos >= wall_width) {
                            control = false;
                            playSound("sound/boo.wav");
                            $scope.$apply(function() {
                                $scope.court.restart = true;
                            });
                        }
                    } else {
                        var temp_last_pos_x = snake.tails[i].x_pos;
                        var temp_last_pos_y = snake.tails[i].y_pos;
                        snake.tails[i].set_y_pos(last_pos_y);
                        snake.tails[i].set_x_pos(last_pos_x);
                        last_pos_x = temp_last_pos_x;
                        last_pos_y = temp_last_pos_y;
                    }
                }
            };
            function moveSnakeUpDown(y_pos){
                 for( var i=0; i<snake.tails.length; i++){
                    if(!snake.tails[i].tail_type) {
                        last_pos_x = snake.tails[i].x_pos;
                        last_pos_y = snake.tails[i].y_pos;
                        snake.tails[i].set_y_pos(snake.tails[i].y_pos + y_pos);
                        if(snake.tails[i].y_pos === fruits[0].y_pos && snake.tails[i].x_pos === fruits[0].x_pos) {
                            playSound("sound/bite.wav");
                            snake.addTail();
                            CreateFruit();
                            $scope.$apply(function() {
                                $scope.eaten_point += 1;
                            });
                        }
                        if(snake.tails[i].y_pos < 0 || snake.tails[i].y_pos >= wall_height) {
                            control = false;
                            playSound("sound/boo.wav");
                             $scope.$apply(function() {
                                $scope.court.restart = true;
                            });
                        }
                    } else {
                        var temp_last_pos_x = snake.tails[i].x_pos;
                        var temp_last_pos_y = snake.tails[i].y_pos;
                        snake.tails[i].set_y_pos(last_pos_y);
                        snake.tails[i].set_x_pos(last_pos_x);
                        last_pos_x = temp_last_pos_x;
                        last_pos_y = temp_last_pos_y;
                    }
                }

            };

            function playSound(sound){
                var snd = new Audio(sound); // buffers automatically when created
                snd.play();
            };
        };
        this.extendSnake = function() {
            snake.addTail();
        };

        function CreateFruit(){
            var fruits_src = ['image/banana.png', 'image/apple.png', 'image/strawberry.png', 'image/cherry.png'];
            var num_x = Math.floor((Math.random() * document.getElementById('court').offsetWidth) + 1);
            var num_y = Math.floor((Math.random() * document.getElementById('court').offsetHeight) + 1);
            num_x = parseInt(num_x / snake.tails[0].width) * snake.tails[0].width;
            num_y = parseInt(num_y / snake.tails[0].height) * snake.tails[0].height;
            var num_fruit = Math.floor( Math.random() * ( 1 + 4 - 1 ) ) + 1;
            var fruit = new Fruit(snake.tails[0].width, snake.tails[0].height, num_x, num_y, fruits_src[num_fruit - 1]);
            fruit.initialize();
            if( fruits.length >= 1) {
                fruits[0].imgEl.parentNode.removeChild(fruits[0].imgEl);
                fruits.pop();
            }
            fruits.push(fruit);
        };

    });