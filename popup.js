var quote;
var person;
var image;

var response;
var req;
 
onload = setTimeout(init, 0);
 
function init() {
  quote = document.getElementById('quote');
  person = document.getElementById('person');
  image = document.getElementById('image');
 
  req = new XMLHttpRequest();
  req.open('GET', 'http://buff-chrome-extension.herokuapp.com/quote');
  req.onload = process;
  req.send();
}

function process() {
  response = JSON.parse(req.responseText);
  update();
}
 
function update() {
  quote.innerHTML = response.ret.quote;
  person.innerHTML = response.ret.person;
  image.src = response.ret.image;
}