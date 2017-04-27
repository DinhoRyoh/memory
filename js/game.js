//introduction by Mago
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
var rules = document.getElementById('rules');
hide(gameboard);
//answer Mago
yes.onclick = function(){
  hide(yes);
  hide(no);
  Typed.new("#element", {
    strings: ["You just have to find the same card as the one you just picked in the row ! If you didn't, the both cards picked will return back to the hide face"],
    typeSpeed: 0
  });
  var mascotte = document.getElementById('mascotte');
  mascotte.src = "/images/teacher.png";
  show(gotIt);
}
no.onclick = function(){
  hide(yes);
  hide(no);
  element.innerHTML = "Let's play !";
  unfade(gameboard);
  player.innerHTML = "player : "+localStorage.getItem('user');
  //lines for the memory game taken from the web for test
  // var memo = new Memory({
  //     wrapperID : "game",
  //   });
}
gotIt.onclick = function(){
  hide(gotIt);
  element.innerHTML = "Let's play !";
  unfade(gameboard);
  player.innerHTML = "player : "+localStorage.getItem('user');
  //lines for the memory game taken from the web for test
  // var memo = new Memory({
  //     wrapperID : "game",
  //   });
  var mascotte = document.getElementById('mascotte');
  mascotte.src = "/images/hubi.png";
}
//we can't see app-3 #vue.js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: false
  }
}) ;
