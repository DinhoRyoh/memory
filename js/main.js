var mask = document.getElementById('mask');
unfade(mask);
var intro = document.getElementById('introduction');
unfade(intro);
var content = document.getElementById('content');
hide(content);
var button = document.getElementById('submit');
button.className += ' magictime puffIn';
var user_intro = document.getElementById('welcome');
var element = document.getElementById('element');
var menu = document.getElementById('menu');
intro.onsubmit = introduction;
button.onclick = introduction;
var kick = document.getElementById('joke');
counterKick = 0;
kick.onclick = function(){
  if (counterKick >= 3) {
    Typed.new("#element", {
      strings: ["Fuck off !","Hu ! I mean stop it please :3"],
      typeSpeed: 0
    });
  }else if(counterKick == 2){
    Typed.new("#element", {
      strings: ["Ooooooouch !"],
      typeSpeed: 0
    });
    counterKick += 1;
  }else if(counterKick == 1){
    Typed.new("#element", {
      strings: ["ARG !"],
      typeSpeed: 0
    });
    counterKick += 1;
  } else {
    Typed.new("#element", {
      strings: ["Ouch !"],
      typeSpeed: 0
    });
    counterKick += 1;
  }
}
