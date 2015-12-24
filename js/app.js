var direction = '38';
var snake;
var fruits = [];
var snake_tail_width = 20;
var snake_tail_height = 20;
var court_width = 500;
var court_height = 500;
var snake_x_pos = 60;
var snake_y_pos = 60;
var control = true;
var snakeSpeed = 500;
var last_pos_x = 0;
var last_pos_y = 0;
var fruit_eat_point = 0;
var level = 1;
var level_score = 10;
var fruits_src = ['image/banana.png', 'image/apple.png', 'image/strawberry.png', 'image/cherry.png'];

var app = angular.module('store', [ ]);
    app.controller('CourtController', function($scope) {
        $scope.fruit_point = 0;
        $scope.snake_level = 1;

        this.initCourt = function() {
            SetCourtWidthHeight(court_width, court_height);
        };

        this.initFruit = function() {
          CreateFruit();
        };

        this.initSnake = function() {
            snake = new Snake(snake_x_pos, snake_y_pos, snake_tail_width, snake_tail_height, '#ffab40', '#aaaaaa');
            snake.addHead();
            snake.addTail();
        };
        
        this.initSnakeMove = function () {
            myTimer = setInterval(function() { if(control) {
               ChangeSnakeDirection($scope);
            } }, snakeSpeed);
        };


        document.onkeydown = setDirection;

    });

function setDirection(e) {
    e = e || window.event;
    direction = e.keyCode;
}
function ChangeSnakeDirection($scope) {

    if (direction == '38') {
        //up
        if(snake.tails.length > 1 && snake.tails[0].y_pos < snake.tails[1].y_pos || snake.tails[0].y_pos === snake.tails[1].y_pos ) {
            MoveSnakeByDirection(0, -1 * snake_tail_height, $scope);
        }else{
            direction = '40';
        }
    }
    else if (direction == '40') {
        //down
        if(snake.tails.length > 1 && snake.tails[0].y_pos > snake.tails[1].y_pos || snake.tails[0].y_pos === snake.tails[1].y_pos) {
            MoveSnakeByDirection(0, snake_tail_height, $scope);
        }else{
            direction = "38";
        }
    }
    else if (direction == '37') {
        //left
        if(snake.tails.length > 1 && snake.tails[0].x_pos < snake.tails[1].x_pos || snake.tails[0].x_pos === snake.tails[1].x_pos ) {
            MoveSnakeByDirection(-1*snake_tail_width, 0, $scope);
        }else{
            direction = "39";
        }
    }
    else if (direction == '39') {
        //right
        if(snake.tails.length > 1 && snake.tails[0].x_pos > snake.tails[1].x_pos || snake.tails[0].x_pos === snake.tails[1].x_pos ) {
            MoveSnakeByDirection(snake_tail_width, 0, $scope);
        }else{
            direction = "37";
        }
    }
}

function MoveSnakeByDirection(snake_x_pos, snake_y_pos, $scope) {
    if(snake.tails[0].x_pos + snake_x_pos < 0 || snake.tails[0].x_pos + snake_x_pos >= court_width || snake.tails[0].y_pos + snake_y_pos < 0 || snake.tails[0].y_pos + snake_y_pos >= court_height) {
        control = false;
        playSound("sound/boo.wav");
    } else {
        for( var i=0; i<snake.tails.length; i++){
            if(!snake.tails[i].tail_type) {
                last_pos_x = snake.tails[i].x_pos;
                last_pos_y = snake.tails[i].y_pos;
                if(snake_x_pos) {
                    snake.tails[i].set_x_pos(snake.tails[i].x_pos + snake_x_pos);
                    if(snake.tails[i].y_pos === fruits[0].y_pos && snake.tails[i].x_pos === fruits[0].x_pos) {
                        snake.addTail();
                        CreateFruit();
                        IncrementFruitEatPoint($scope);
                    }
                }

                if(snake_y_pos) {
                    snake.tails[i].set_y_pos(snake.tails[i].y_pos + snake_y_pos);
                    if (snake.tails[i].y_pos === fruits[0].y_pos && snake.tails[i].x_pos === fruits[0].x_pos) {
                        snake.addTail();
                        CreateFruit();
                        IncrementFruitEatPoint($scope);
                    }
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
    }
}

function IncrementFruitEatPoint($scope) {
    fruit_eat_point += 1;

    $scope.$apply(function(){
       $scope.fruit_point += 1;
    });

    if(fruit_eat_point === level_score) {
        level += 1;
        snakeSpeed -= 100;
        level_score *= level;
        
        clearInterval( myTimer );
        myTimer = setInterval(function() { if(control) {
            ChangeSnakeDirection($scope);
        } }, snakeSpeed);

        $scope.$apply(function(){
            $scope.snake_level += level;
        });
    }
}

function playSound(sound){
    var snd = new Audio(sound);
    snd.play();
}

function SetCourtWidthHeight(width, height, $scope) {
    var courtEl = document.getElementById('court');
        courtEl.style.width = width + 'px';
        courtEl.style.height = height + 'px';
}
function CreateFruit() {
    var fruit_pos_x = Math.floor((Math.random() * court_width) + 1);
    var fruit_pos_y = Math.floor((Math.random() * court_height) + 1);
        fruit_pos_x = parseInt(fruit_pos_x / snake_tail_width) * snake_tail_width;
        fruit_pos_y = parseInt(fruit_pos_y / snake_tail_height) * snake_tail_height;
    if( fruit_pos_x === court_width || fruit_pos_y === court_height) {
        fruit_pos_x -= snake_tail_width;
        fruit_pos_y -= snake_tail_height;
    }
    var num_fruit = Math.floor( Math.random() * ( 1 + 4 - 1 ) ) + 1;
    var fruit = new Fruit(snake_tail_width, snake_tail_height, fruit_pos_x, fruit_pos_y, fruits_src[num_fruit - 1]);
        fruit.initialize();
    if( fruits.length >= 1) {
        fruits[0].imgEl.parentNode.removeChild(fruits[0].imgEl);
        fruits.pop();
    }
    fruits.push(fruit);
}