function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
function hide(_content){
  _content.style.display = 'none';
}
function show(_content){
  _content.style.display = 'block';
}
function introduction(){
  if (localStorage.getItem('triggerWithoutForm') == null) {
    event.preventDefault();
    localStorage.setItem("user",intro.elements["name"].value);
  }
  fade(mask);
  fade(intro);
  var user_name = document.getElementById('user_name');
  user_name.innerHTML = "I'm not "+ localStorage.getItem('user');
  unfade(content);
  user_intro.innerHTML = "Our hero "+localStorage.getItem("user");
    Typed.new("#element", {
      strings: ["Hey you ! Hum...", "Hello "+localStorage.getItem("user")+"! I'm Mago, nice to meet you !"],
      typeSpeed: 0
    });
    setTimeout(function () {
      Typed.new("#element", {
        strings: ["Let's play the game !"],
        typeSpeed: 0
      });
      unfade(menu);
    }, 4500);
}
//get the json
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', '/card.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}
loadJSON(function(response) {
// Parse JSON string into object
  image = JSON.parse(response);
});
//game
gameState = 1;
card1 ="";
card2 ="";
card1id = "";
card2id = "";
card1flipped = false;
card2flipped = false;
flippedTiles = 0;
var easy = document.getElementById("easy");
var normal = document.getElementById("normal");
var hard = document.getElementById("hard");
var arrayLevel = [
  easy,normal,hard
];
chosenLevel = "";
nbMove = 0;
var index;
localStorage.removeItem('currentURL');
localStorage.setItem('currentURL',window.location.pathname);
if (localStorage.getItem('currentURL') != "/index.html") {
  for (index in arrayLevel) {
    bindClickAction(arrayLevel[index]);
    game();
  }
  var difficulty = document.getElementById("difficulty");
    difficulty.onclick = function difficulty(){
      var hoverMessage = document.getElementById('app_2');
      switch (chosenLevel) {
        case "easy":
            var mascotte = document.getElementById('mascotte');
            mascotte.src = "/images/oktobercat.png";
            Typed.new("#element", {
              strings: ["Hey ! I'm Oktober."],
              typeSpeed: 0
            });
            setTimeout(function () {
              Typed.new("#element", {
                strings: ["Let's drink !"],
                typeSpeed: 0
              });
            }, 2000);
            setup(4,2,1);
          break;
        case "normal":
            var mascotte = document.getElementById('mascotte');
            mascotte.src = "/images/heisencat.png";
            Typed.new("#element", {
              strings: ["Hey ! I'm Heisen."],
              typeSpeed: 0
            });
            setTimeout(function () {
              Typed.new("#element", {
                strings: ["I got something for you, wanna try it ?!"],
                typeSpeed: 0
              });
            }, 2000);
            setup(6,3,2);
          break;
        case "hard":
            var mascotte = document.getElementById('mascotte');
            mascotte.src = "/images/vulcain.png";
            Typed.new("#element", {
              strings: ["Hello Human. I'm Vulcat."],
              typeSpeed: 0
            });
            setTimeout(function () {
              Typed.new("#element", {
                strings: ["I have no choice then, let's work."],
                typeSpeed: 0
              });
            }, 2000);

            setup(8,4,3);
          break;
      }
  }
}
app2 = new Vue({
  el: '#app_2',
  data: {
    message: ""
  }
})
function bindClickAction(index){
  index.onclick = function(){
     chosenLevel = index.id;
     localStorage.setItem("level",chosenLevel);
     difficulty;
     var menu = document.getElementById('menu_difficulty');
     fade(menu);
     var data = ['Oktober loves drinking, but he never seems to get drunk. You will always see him with a pint.',
     'Heisen is a dealer, but be careful ! He is kinda too nice, he shall give you all his stuff even if they are still in experiment.',
     'Vulcat is vulcain, He has 566 IQ, but he gets easily fascinated by games.'];

     console.log(chosenLevel);
     switch (chosenLevel) {
       case "easy":
         app2.message = data[0];
         break;
       case "normal":
         app2.message = data[1];
         break;
       case "hard":
         app2.message = data[2];
         break;
   }
  }
}
function shuffleIt(array) {
    for (var i = array.image.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array.image[i];
        array.image[i] = array.image[j];
        array.image[j] = temp;
    }
    return array;
}
function shuffleIt2(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function fillTile(_widthX,_heightY){
  var tile = document.createElement('div');
  tile.className = "topping";
  var res = "";
  var shuffle = [];
  shuffle = shuffleIt(image);
  numTiles = _widthX * _heightY;
  var halfNum = numTiles/2;
  cardInGame = [];
  for (var i = 0; i < halfNum; i++) {
    cardInGame.push(shuffle.image[i],shuffle.image[i]);
  }
  shuffleAgain = shuffleIt2(cardInGame);
  for (var i = 0; i < numTiles; i++) {
    var n = i + 1;
    res = res + '<div class="mg__tile mg__tile-' +
     n + '"><div class="mg__tile--inner" data-id="' +
      shuffleAgain[i]["id"] +
       '"><span class="mg__tile--outside"></span><span class="mg__tile--inside"><img src="' +
        shuffleAgain[i]["img"] +
         '"></span></div></div>';
  }
  tile.innerHTML = res;
  document.getElementById("board").appendChild(tile);
  var tiles = document.querySelectorAll(".mg__tile--inner");
  for (var i = 0, len = tiles.length; i < len; i++) {
    var tile = tiles[i];
    play(tile);
  };
}
function setup(_widthX,_heightY,level){
  var board = document.createElement('div');
  board.id = "board";
  var game = document.getElementById('game');
  game.innerHTML = '<div class="mg__meta--left">\
    <span class="mg__meta--level">Level: \
    <span id="mg__meta--level">' + chosenLevel + '</span>\
    </span>\
    <span class="mg__meta--moves">Moves: \
    <span id="mg__meta--moves">' + nbMove + '</span>\
    </span>\
    </div>\
    <div class="mg__meta--right">\
    <button id="mg__button--restart" class="mg__button">Start Over</button>\
    </div>';
  var hasChild = document.getElementById("board") != null;
  if (hasChild) {
    var existingBoard = document.getElementById("board");
    existingBoard.className = "mg__contents mg__level-"+level;
    existingBoard.innerHTML = "";
  }else {
    board.className = "mg__contents mg__level-"+level;
    document.getElementById("game").appendChild(board);
  }
  fillTile(_widthX,_heightY);
  var button = document.getElementById('mg__button--restart');
  button.onclick = function(){
    var menu = document.getElementById('menu_difficulty');
    unfade(menu);
    var game = document.getElementById('game');
    game.remove();
  }
}
countGood = 0;
function play(tile){
  tile.addEventListener( "click", function(e) {
    if (!tile.classList.contains("flipped")) {
      if (card1flipped === false && card2flipped === false) {
        this.classList.add("flipped");
        card1 = this;
        card1id = this.getAttribute("data-id");
        card1flipped = true;
      } else if( card1flipped === true && card2flipped === false ) {
        this.classList.add("flipped");
        card2 = this;
        card2id = this.getAttribute("data-id");
        card2flipped = true;
        if ( card1id == card2id ) {
          switch (countGood) {
            case 1:
              Typed.new("#element", {
                strings: ["You're smarter than I though."],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            case 4:
              Typed.new("#element", {
                strings: ["Meeekaay."],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            case 7:
              Typed.new("#element", {
                strings: ["Im..Impressive !"],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            case 11:
              Typed.new("#element", {
                strings: ["H-hoowwww ?! Incredible !!!!"],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            case 13:
              Typed.new("#element", {
                strings: ["I'm your fan <3"],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            case 15:
              Typed.new("#element", {
                strings: ["GOD !!! Kappa"],
                typeSpeed: 0
              });
              countGood = countGood + 1;
              break;
            default:   countGood = countGood + 1;
          }
          gameCardsMatch();
        } else {
          gameCardsMismatch();
        }
      }
    }
  });
}
function gameCardsMatch() {
  // add correct class
  window.setTimeout( function(){
    card1.classList.add("correct");
    card2.classList.add("correct");
  }, 300 );

  // remove correct class and reset vars
  window.setTimeout( function(){
    card1.classList.remove("correct");
    card2.classList.remove("correct");
    gameResetVars();
    flippedTiles = flippedTiles + 2;
    if (flippedTiles == numTiles) {
      winGame();
    }
  }, 1500 );

  // plus one on the move counter
  gameCounterPlusOne();
};
function gameCardsMismatch() {
  // remove "flipped" class and reset vars
  window.setTimeout( function(){
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    gameResetVars();
  }, 900 );

  // plus one on the move counter
  gameCounterPlusOne();
};
function gameResetVars() {
  card1 = "";
  card2 = "";
  card1id = "";
  card2id = "";
  card1flipped = false;
  card2flipped = false;
}
function gameCounterPlusOne() {
  nbMove = nbMove + 1;
  moveCounterUpdate = document.getElementById("mg__meta--moves").innerHTML = nbMove;
};
function winGame() {
  if (onGameEnd() === false) {
    var mascotte = document.getElementById('mascotte');
    Typed.new("#element", {
      strings: ["Well done !"],
      typeSpeed: 0
    });
    setTimeout(function () {
      Typed.new("#element", {
        strings: ["PLAY AGAIIIIIIIIN ?!"],
        typeSpeed: 0
      });
    }, 2000);
    var popup = document.createElement('div');
    popup.innerHTML = '<h2 class="mg__onend--heading">Sweet!</h2>\
      <p class="mg__onend--message">You won the round in ' + nbMove + ' moves. Congratz !.</p>\
      <button id="mg__onend--restart" class="mg__button">Play again?</button>';
      var game = document.getElementById('game');
    game.appendChild(popup);
    document.getElementById("mg__onend--restart").addEventListener( "click", function(e) {
        var menu = document.getElementById('menu_difficulty');
        unfade(menu);
        var game = document.getElementById('game');
        game.remove();

    });
  } else {
    // run callback
    onGameEnd();
  }
}
function onGameEnd(){
  return false;
}
function game(){
  var game = document.createElement("div");
  game.id = "game";
  game.className = "game  mg__wrapper";
  document.getElementById("gameboard").appendChild(game);
}
