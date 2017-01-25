var albums

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
if (this.status !== 200) return;
albums = JSON.parse(this.responseText)
console.log(albums.albums.items[0].name)
populateAlbums();
};

var populateAlbums = function() {
  var albumDiv = document.querySelector('#albums');
  var albumItems = albums.albums.items;
  console.log(albumItems);
  albumItems.forEach(function(album) {
    var albumTitles = document.createElement('p');
    var albumLink = album.external_urls.spotify;
    albumTitles.innerHTML = album.name.link(albumLink);
    console.log(album.name);
    albumDiv.appendChild(albumTitles)
  })
}

var app = function(){
var url = 'https://api.spotify.com/v1/search?q=easy+listen&type=album&limit=20&offset=0'
makeRequest(url, requestComplete);
}

window.onload = app;