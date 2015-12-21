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
        var snakeSpeed = 500;
        var level = 1;
        var levelScore = 2;
        var myTimer;

        this.restart = false;

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

        this.initSnakeMove = function() {

            myTimer = setInterval(function() { if(control) {
               changeSnakeDirection();
            } }, snakeSpeed);

            function changeSnakeDirection(){
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
            }
            function moveSnakeLeftRight(x_pos){
                if(snake.tails[0].x_pos + x_pos < 0 || snake.tails[0].x_pos + x_pos >= wall_width) {
                            control = false;
                            playSound("sound/boo.wav");
                            $scope.$apply(function() {
                                $scope.court.restart = true;
                            });
                } else {
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
                                    if($scope.eaten_point === levelScore) {
                                        level += 1;
                                        snakeSpeed -= 100;
                                        levelScore = 2 * level;
                                        clearInterval( myTimer );
                                        myTimer = setInterval(function() { if(control) {
                                            changeSnakeDirection();
                                        } }, snakeSpeed);
                                    }
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
                }
            };
            function moveSnakeUpDown(y_pos){
                if(snake.tails[0].y_pos + y_pos < 0 || snake.tails[0].y_pos + y_pos >= wall_height) {
                    control = false;
                    playSound("sound/boo.wav");
                     $scope.$apply(function() {
                        $scope.court.restart = true;
                    });
                } else {
                    for (var i = 0; i < snake.tails.length; i++) {
                        if (!snake.tails[i].tail_type) {
                            last_pos_x = snake.tails[i].x_pos;
                            last_pos_y = snake.tails[i].y_pos;

                            snake.tails[i].set_y_pos(snake.tails[i].y_pos + y_pos);
                            if (snake.tails[i].y_pos === fruits[0].y_pos && snake.tails[i].x_pos === fruits[0].x_pos) {
                                playSound("sound/bite.wav");
                                snake.addTail();
                                CreateFruit();
                                $scope.$apply(function () {
                                    $scope.eaten_point += 1;
                                    if($scope.eaten_point === levelScore) {
                                        level += 1;
                                        snakeSpeed -= 100;
                                        levelScore = 2 * level;
                                        clearInterval( myTimer );
                                        myTimer = setInterval(function() { if(control) {
                                            changeSnakeDirection();
                                        } }, snakeSpeed);
                                    }
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

        document.onkeydown = setDirection;
        function setDirection(e) {
             e = e || window.event;
             direction = e.keyCode;
         };

        function CreateFruit(){
            var fruits_src = ['image/banana.png', 'image/apple.png', 'image/strawberry.png', 'image/cherry.png'];
            var num_x = Math.floor((Math.random() * document.getElementById('court').offsetWidth) + 1);
            var num_y = Math.floor((Math.random() * document.getElementById('court').offsetHeight) + 1);
            num_x = parseInt(num_x / snake.tails[0].width) * snake.tails[0].width;
            num_y = parseInt(num_y / snake.tails[0].height) * snake.tails[0].height;
            if( num_x === document.getElementById('court').offsetWidth || num_y === document.getElementById('court').offsetHeight) {
                num_x -= snake.tails[0].width;
                num_y -= snake.tails[0].height;
            }
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