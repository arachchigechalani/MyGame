$(function () {
    var container = $('#container');
    var car = $('#car');

    var balloon1 = $('#balloon1');
    var balloon2 = $('#balloon2');
    var balloon3 = $('#balloon3');
    var balloon4 = $('#balloon4');
    var balloon5 = $('#balloon5');
    var bomb1 = $('#bomb1');
    var score = $('#score');

    var game_over = false;
    var move_left = false;
    var move_right = false;

    var animationId;
    animationId = requestAnimationFrame(repeat);

    var containerWidth = parseInt(container.width());
    var containerHeight = parseInt(container.height());
    var carWidth = parseInt(car.width());
    var carHeight = parseInt(car.height());

    var balloonSpeed = 1;
    var bombSpeed = 1;
    var countScore = 1;

    var gameOverDiv = $('#gameOverDiv');
    var gameOverBtn = $('#gameOver');

    $(document).on('keydown', function (e) {
        if (game_over == false){
            var key = e.keyCode;
            if(key == 37 && move_left === false){
                move_left = requestAnimationFrame(left);
            }else if (key == 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (game_over == false){
            var key = e.keyCode;
            if (key == 37){
                cancelAnimationFrame(move_left);
                move_left = false;
            }else if (key == 39){
                cancelAnimationFrame(move_right);
                move_right = false;
            }
        }
    });

    function left() {
        if (game_over == false && parseInt(car.css('left')) > 10){
            car.css('left',parseInt(car.css('left')) -4);
            move_left = requestAnimationFrame(left);
        }
    }
    function right() {
        if (game_over == false && parseInt(car.css('left')) < containerWidth - (carWidth+10)){
            car.css('left', parseInt(car.css('left')) +4);
            move_right = requestAnimationFrame(right);
        }
    }

    function balloonDown(balloon){
        var balloonTop = parseInt(balloon.css('top'));
        if (balloonTop > containerHeight){
            balloonTop = -160;
            var carLeft = parseInt(Math.round(Math.random()*(containerWidth - (carWidth+10))));
            balloon.css('left',carLeft);
        }
        balloon.css('top', balloonTop + balloonSpeed);
    }
    function bombDown(bomb){
        var bombTop = parseInt(bomb.css('top'));
        if (bombTop > containerHeight){
            bombTop = -160;
            var carLeft = parseInt(Math.round(Math.random()*(containerWidth - (carWidth+10))));
            bomb.css('left',carLeft);
        }
        bomb.css('top', bombTop + bombSpeed);
    }

    function repeat() {
        if (game_over == false){
            if (face(car,balloon1) | face(car, balloon2) | face(car, balloon3) | face(car, balloon4) | face(car, balloon5) ) {
                countScore++;
            }
            if (face(car, bomb1 )){
                stopGame();
            }if (countScore % 1000 == 0){
                balloonSpeed++;
                countScore++;
            }

            balloonDown(balloon1);
            balloonDown(balloon2);
            balloonDown(balloon3);
            balloonDown(balloon4);
            balloonDown(balloon5);
            bombDown(bomb1);
            animationId = requestAnimationFrame(repeat);
        }
    }
    function stopGame() {
        game_over = true;
        cancelAnimationFrame(animationId);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_right);
        gameOverDiv.slideDown();
        gameOverBtn.focus();
    }
    gameOverBtn.click(function () {
        location.reload();
    });

    function face(rectone, recttwo){

        var r1 = $(rectone);
        var r2 = $(recttwo);

        var r1x = r1.offset().left;
        var r1w = r1.width();
        var r1y = r1.offset().top;
        var r1h = r1.height();

        var r2x = r2.offset().left;
        var r2w = r2.width();
        var r2y = r2.offset().top;
        var r2h = r2.height();

        if( r1y+r1h < r2y ||
            r1y > r2y+r2h ||
            r1x > r2x+r2w ||
            r1x+r1w < r2x ){
            return false;
        }else{
            return true;
        }

    }
});