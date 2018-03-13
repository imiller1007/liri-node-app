//Global Variables=========================================================
var keys = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);
var command = process.argv[2];
var command2 = process.argv[3];

var request = require("request");
var fs = require("fs");
//=========================================================================


//Welcome==================================================================
function welcome() {
    if(!process.argv[2]){
    console.log("Welcome to LIRI, the Language Interpretation and Recognition Interface.")
    console.log("-----------------------------------------------------------------------")
    console.log("Available commands: my-tweets, spotify-this-song '<song name here>', ")
    console.log("movie-this '<movie name here>', do-what-it-says")
    console.log("-----------------------------------------------------------------------")
    }
}

welcome();
//=========================================================================

//Twitter==================================================================

function tweets(){
var params = {screen_name: 'UNEX_HWprofile'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
      output = ("\n" + "@" + params.screen_name + " tweeted: " + tweets[i].text + "; at " + tweets[i].created_at +"\n");
      console.log("=====================================================")
      console.log(output);
      console.log("=====================================================")
    }
  }
  
});
};
if(command=== "my-tweets"){
tweets();
};
//=========================================================================

//Spotify==================================================================
if(command === "spotify-this-song"){
  
  spotify.search({ type: 'track', query: command2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("=====================================================");
    console.log('Song Name: ' + data.tracks.items[0].name);
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Preview: ' + data.tracks.items[0].preview_url);
    console.log("=====================================================");
  });
};
//=========================================================================

//OMDB=====================================================================
if(command=== "movie-this"){

var nodeArgs = process.argv;
var movie= "";
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
  
  movie = movie + "+" + nodeArgs[i];
  }
  else {
    movie += nodeArgs[i];
  };
  
};

if(!command2){
  movie = "mr+nobody"
};

var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
};

});

};
//=========================================================================

//Do what it says==========================================================
if(command === "do-what-it-says"){
    
  fs.readFile("random.txt", "utf8", function(error, data) {
  var textDoc = data.split(",");
  console.log(textDoc[1]);
  
  
  spotify.search({ type: 'track', query: textDoc[1] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("=====================================================");
    console.log('Song Name: ' + data.tracks.items[0].name);
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Preview: ' + data.tracks.items[0].preview_url);
    console.log("=====================================================");
  });
  })

};