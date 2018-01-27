(function() {
    function AlbumCtrl() {
        this.albumData = (angular.copy(albumMarconi));

    }


angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
