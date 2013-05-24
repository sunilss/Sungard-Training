beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      
      this.message = function(){
	    var actualTitle = player.currentlyPlayingSong.title;
	    var expectedTitle = expectedSong.title;
	    return "Expected the song to be '" + expectedTitle + "', but it was '" + actualTitle + "'";
	  }

      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});
