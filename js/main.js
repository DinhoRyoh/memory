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
intro.onsubmit = function(event){
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
button.onclick = function(event){
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
var kick = document.getElementById('joke');
counterKick = 0;
kick.onclick = function(){
  if (counterKick >= 3) {
    Typed.new("#element", {
      strings: ["Fuck off !"],
      typeSpeed: 0
    });
  }else if(counterKick == 2){
    Typed.new("#element", {
      strings: ["Ooooooouch !"],
      typeSpeed: 0
    });
    counterKick += 1;
  }else {
    Typed.new("#element", {
      strings: ["Ouch !"],
      typeSpeed: 0
    });
    counterKick += 1;
  }
}
