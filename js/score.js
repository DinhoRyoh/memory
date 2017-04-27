//get the json
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', '/scoreboard.json', true); // Replace 'my_data' with the path to your file
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
  score = JSON.parse(response);
  for (level in score) {
    var div = document.createElement('div');
    var str = '<table id="'+level+'" class="scoring"><tr><th>Joueur</th><th>Score</th><th>Rank</th></tr>'
    for (var value in score[level]) {
      str = str + '<tr><td>'+score[level][value]["owner"]+'</td><td class="tdScore">'+score[level][value]["score"]+'</td><td>'+score[level][value]["rank"]+'</td></tr>';
    }
    str = str + '</table>';
    div.innerHTML = str;
    switch (level) {
      case "easy":
          document.getElementById('easyScore').appendChild(div);
        break;
      case "normal":
          document.getElementById('normalScore').appendChild(div);
        break;
      case "hard":
          document.getElementById('hardScore').appendChild(div);
        break;
    }
  }
});
//adding the user informations

var move = document.getElementById('move');
if (localStorage.getItem('moveTot') == null) {
  move.innerHTML = "Total move : 0";
}else {
  move.innerHTML = "Total move : "+localStorage.getItem('moveTot');
}

if (localStorage.getItem('scoreboard') != null) {
  var object = JSON.parse(localStorage.getItem('scoreboard'));
  var easy = document.getElementById('easy');
  var normal = document.getElementById('normal');
  var hard = document.getElementById('hard');
  if (object[localStorage.getItem('user')]["easy"] == null) {
    easy.innerHTML = "easy mode best moves : not played yet";
  }else {
    easy.innerHTML = "easy mode best moves :"+object[localStorage.getItem('user')]["easy"];
  }
  if (object[localStorage.getItem('user')]["normal"] == null) {
    normal.innerHTML = "normal mode best moves : not played yet";
  }else {
    normal.innerHTML = "normal mode best moves :"+object[localStorage.getItem('user')]["normal"];
  }
  if (object[localStorage.getItem('user')]["hard"] == null) {
    hard.innerHTML = "hard mode best moves : not played yet";
  }else {
    hard.innerHTML = "hard mode best moves :"+object[localStorage.getItem('user')]["hard"];
  }
}
Typed.new("#element", {
  strings: ["Hey ! we didn't have finished this page yet ! As you can see the followed tables are not updated ! we drunk too much LMAO ! Actually I had not enough time to achieve my goals, but I hope you still like my application."],
  typeSpeed: 0
});
