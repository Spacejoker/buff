var timeline;
var author;
var image;
 
var template;
var content;
var link;
 
var req;
var tweets;
 
onload = setTimeout(init, 0);
 
function init() {
  displayLoader(true);
 
  /* Retrieve various part of the page */
  timeline = document.getElementById('quote');
  author   = xpath('//div[@id="text"]/p', document);
  author   = xpath('//div[@id="author"]/p', document);
  image    = xpath('//div[@id="image"]/img', document);
 
  /* Send the request */
  req = new XMLHttpRequest();
  req.open('GET', 'http://twitter.com/statuses/user_timeline/flhacqueba.json');
  req.onload = process;
  req.send();
}
 
function process() {
  var res = JSON.parse(req.responseText);
  tweets = res.concat(tweets);
  update();
}
 
function update() {
  displayLoader(false);
 
  var user;
  var item;
 
  for(var i in tweets) {
    user = tweets[i].user;
 
    /* Profile : only on the first tweet to fill the profile div */
    if (i == 0) {
      author.innerHTML = user.screen_name;
      image.src = user.profile_image_url;
      image.alt = user.name;
    }
 
    /* Add a tweet */
    content.innerHTML = tweets[i].text;
    item = template.cloneNode(true);
    timeline.appendChild(item);
  }
}
 
function xpath(expression, node) {
  return document.evaluate(expression, node).iterateNext();
}
 
function displayLoader(bool) {
  var loader = document.getElementById('loader');
  if (bool) {
    document.getElementById('tweets').style.display = 'none';
    loader.innerHTML = '<img src="ajax-loader.gif" alt="loading..." />';
  }
  else {
    document.getElementById('tweets').style.display = 'block';
    loader.innerHTML = '';
  }
}