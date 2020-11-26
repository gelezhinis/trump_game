let score = 0;
let gameOver = false;
let lastHole = 0;

$('#start').click(startGame);
$('.game').on('click', '.trump', hitTrump);

function startGame() {
   // make game board
   gameBoard();
   score = 0;
   $('.score').text('');
   startTrumps();
   gameOver = false;
   // time for gameplay
   setTimeout(function(){
      return gameEnd();
   }, 20000);
}

function startTrumps() {
   let jumpUp = $('.hole'+randomHole()+'> .trump');
   // console.log(jumpUp);
   let timer = Math.round(Math.random() * 1000) + 400;
   jumpUp.show();
   jumpUp.animate({
      top: '0'
   }, 1000);
   setTimeout(function() {
      jumpUp.animate({
         top: '200px'
      }, 1000);
      if(!gameOver) {
         startTrumps();
      }  
   }, timer);
}

function hitTrump() {
   // console.log($(this));
   $(this).hide();
   $(this).parent().find('.wack').css('display', 'block');
   $(this).parent().find('.wack').fadeOut(1000);
   score++;
   $('.score').text('Trumps Wacked: ' + score);
}

function randomHole() {
   // console.log($('.hole').length);
   let hole = Math.floor(Math.random() * $('.hole').length);
   if (hole == lastHole) {
      return randomHole();
   }
   lastHole = hole;
   // console.log(hole);
   return hole;
}

function gameEnd() {
   gameOver = true;
   $('.message').text('GAME OVER!');
}

function gameBoard() {
   let trumps = 8;
   let html = '';

   for(let trump = 0; trump < trumps; trump++ ) {
      html += '<div class="hole hole'+trump+'"><div class="trump"></div>'; 
      html += '<img src="img/wacked_trump.png" class="wack"/><div class="tribune"></div></div>'; 
   }
   $('.game').html(html);

}