/**
 * Created by user on 30.05.18.
 */
var cvs = document.getElementById('canvas');

var ctx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

//Это отступ между трубами
var gap = 90;

//Прыжок птички при нажатии
document.addEventListener('keydown',moveUp);
function moveUp() {
    yPos -=25;
    fly.play();
}

//Рисование блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};

var score = 0;
//Позиция птички
var xPos = 10;
var yPos = 150;
//Гравитация для птички
var grav = 1.5;

//Функция которая рисует
function draw() {
    //Картинка, координаты по х, по y---
    // -3 и 4 параметр это ширина и высота картинки
    ctx.drawImage(bg,0,0);

    for(var i=0;i<pipe.length;i++){
        ctx.drawImage(pipeUp,pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom,pipe[i].x, pipe[i].y + pipeUp.height+gap);

        //Чтобы блоки двигнались
        pipe[i].x--;
        //чтобы блоки генерировали и ещё в разных местах
        if(pipe[i].x==125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height)-pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }
        //Очки
        if(pipe[i].x==5){
            score++;
            score_audio.play();
        }
    }


    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,xPos,yPos);

    yPos +=grav;

    //Рисуем очки
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

//Когда последняя картинка загрузиться тогда их и рисуем на канвасе
pipeBottom.onload = draw;