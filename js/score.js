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
      console.log(score[level][value]);
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
