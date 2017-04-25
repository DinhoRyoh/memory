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
  event.preventDefault();
  localStorage.setItem("user",intro.elements["name"].value);
  fade(mask);
  fade(intro);
  unfade(content);
  user_intro.innerHTML = "Bienvenue "+intro.elements["name"].value;
    Typed.new("#element", {
      strings: ["Hey you ! Hum...", "Hello "+intro.elements["name"].value+"! I'm Mago, nice to meet you !"],
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
var easy = document.getElementById("easy");
var normal = document.getElementById("normal");
var hard = document.getElementById("hard");
var arrayLevel = [
  easy,normal,hard
];
chosenLevel = "";
nbMove = 0;
var index;
for (index in arrayLevel) {
  bindClickAction(arrayLevel[index]);
  game();
}
function bindClickAction(index){
  index.onclick = function(){
     chosenLevel = index.id;
     localStorage.setItem("level",chosenLevel);
     difficulty;
     var menu = document.getElementById('menu_difficulty');
     fade(menu);
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

function fillTile(_widthX,_heightY){
  var tile = document.createElement('div');
  tile.className = "topping";
  var res = "";
  var shuffle = [];
  shuffle = shuffleIt(image);
  var numTiles = _widthX * _heightY;
  var halfNum = numTiles/2;
  cardInGame = [];
  for (var i = 0; i < halfNum; i++) {
    cardInGame.push(shuffle.image[i],shuffle.image[i]);
  }
  for (var i = 0; i < numTiles; i++) {
    var n = i + 1;
    res = res + '<div class="mg__tile mg__tile-' +
     n + '"><div class="mg__tile--inner" data-id="' +
      cardInGame[i]["id"] +
       '"><span class="mg__tile--outside"></span><span class="mg__tile--inside"><img src="' +
        cardInGame[i]["img"] +
         '"></span></div></div>';
  }
  tile.innerHTML = res;
  document.getElementById("board").appendChild(tile);

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
  play(board);
}
var difficulty = document.getElementById("difficulty");
  difficulty.onclick = function difficulty(){
    switch (chosenLevel) {
      case "easy":
          setup(4,2,1);
        break;
      case "normal":
          setup(6,3,2);
        break;
      case "hard":
          setup(8,4,3);
        break;
      default:
          setup(6,3,2);
    }
}
function play(board){
  var firstCard = true;
  var lastCard = false;
  var idCard1;
  var idCard2;
  var tile1;
  var tile2;
  var res;
  var flag = true;
    if(!firstCard){
      board.onclick = function(){
        console.log("if");
        if (!this.classList.contains("flipped")) {
          tile2 = this;
          this.classList.add("flipped");
          idCard2 = this.getAttribute("data-id");
          res = match(idCard1,idCard2);
          firstCard = true;
          lastCard = true;
          nbMove += 1;
        }
      }
    }else {
      console.log("else");
      board.onclick = function(){
        console.log(this);
        if (!this.classList.contains("flipped")) {
          tile1 = this;
          this.classList.add("flipped");
          idCard1 = this.getAttribute("data-id");
          firstCard = false;
          lastCard = false;
        }
      }
    }
    if (!res && lastCard) {
      tile1.classList.remove("flipped");
      tile2.classList.remove("flipped");
    }else if (res && lastCard) {
      tile1.classList.add("correct");
      tile2.classList.add("correct");
    }
}
function match(tile1,tile2){
  if (tile1 == tile2) {
    return true;
  }else {
    return false;
  }
}
function game(){
  var game = document.createElement("div");
  game.id = "game";
  game.className = "game  mg__wrapper";
  document.getElementById("gameboard").appendChild(game);
}
