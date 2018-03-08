(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    SongPlayer.currentSong = song;
};




        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }

/**
@function SongPlayer.previous
@desc Sets song to previous song on list
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
/**
@desc Keeps on the current song if current song is first on list else moves forward
*/
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        }
/**
@desc Gets index of the current songs
@type {Function}
*/
var getSongIndex = function(song) {
    return currentAlbum.song.indexOf(song);
};

/**
* @desc Active song object from list of songs
* @type {Object}
*/
SongPlayer.currentSong = null;

        SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                  }
              }
            };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixture', SongPlayer]);
})();
