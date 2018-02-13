(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
        ver currentBuzzObject = null;

        SongPlayer.play = function(song) {
          if (currentSong !== song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
              }
              } else if (currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    song.playing = true;
                  }
              }
          }
            var currentBuzzObject = new buzz.sound(song.audioUrl, {
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.play();
          }
        };

        return SongPlayer;
    }

    angularjs
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
