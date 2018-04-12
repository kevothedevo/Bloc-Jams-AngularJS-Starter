(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        SongPlayer.currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        SongPlayer.volume = 50;

        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
              currentBuzzObject.setVolume(volume);
            }
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
            console.log("previous");
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            /**
            @desc Keeps on the current song if current song is first on list else moves forward
            */

            if (currentSongIndex < 0) {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex + 1];
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        For assignment Services-Part-3
        @desc Sets song to skip to next on the album list
        */
        SongPlayer.next = function() {
            console.log("next");
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex == SongPlayer.currentAlbum.songs.length) {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex - 1];
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        /**
        For assignment Services-Part-3
        @desc Sets song to stop
        */
        stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        /**
        @desc Gets index of the current songs
        @type {Function}
        */
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;
        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;

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
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
