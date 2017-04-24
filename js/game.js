var menu = document.getElementById('menu');
var element = document.getElementById('element');
Typed.new("#element", {
  strings: ["I hope you know how to play Memory"],
  typeSpeed: 0
});
setTimeout(function () {
  Typed.new("#element", {
    strings: ["If you don't I can explain you."],
    typeSpeed: 0
  });
}, 3000);
setTimeout(function () {
    unfade(menu);
}, 4800);

var yes = document.getElementById('yes');
var gotIt = document.getElementById('gotIt');
hide(gotIt);
var no = document.getElementById('no');
var gameboard = document.getElementById('gameboard');
var player = document.getElementById('player');
hide(gameboard);
yes.onclick = function(){
  hide(yes);
  hide(no);
  element.innerHTML = "You just have to find the same card one time in a row ! If you don't the first card picked will return to the hide face";
  show(gotIt);
}
no.onclick = function(){
  hide(yes);
  hide(no);
  element.innerHTML = "Let's play !";
  unfade(gameboard);
  player.innerHTML = "player : "+localStorage.getItem('user');
  var memo = new Memory({
      wrapperID : "game",
    });
}
gotIt.onclick = function(){
  hide(gotIt);
  element.innerHTML = "Let's play !";
  unfade(gameboard);
  player.innerHTML = "player : "+localStorage.getItem('user');
  var memo = new Memory({
      wrapperID : "game",
    });
}
