mask = document.getElementById('mask');
intro = document.getElementById('introduction');
content = document.getElementById('content');
var button = document.getElementById('submit');
button.className += ' magictime puffIn';
var user_intro = document.getElementById('welcome');
var element = document.getElementById('element');
var menu = document.getElementById('menu');

//popup who are you
if (localStorage.getItem('user') == null) {
  unfade(mask);
  unfade(intro);
  hide(content);
}else {
  //pas de popup vu que le nom est deja attribué
  localStorage.setItem('triggerWithoutForm',"hello");
  introduction();
}
//quoiqu'il en soit on lance la function qui proc sur les event listener
intro.onsubmit = introduction;
button.onclick = introduction;

//let's kick Mago ! ^^
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

//I'm not that user
var erase_user = document.getElementById('erase_user');
erase_user.onclick = function(){
  localStorage.removeItem('user');
  localStorage.removeItem('triggerWithoutForm');
  unfade(mask);
  unfade(intro);
  hide(content);
}
var app2 = new Vue({
  el: '#app_2',
  data: {
    message: 'Mago is an Octocat, not really common but you should like her. She is nice and she loves playing games.'
  }
})
