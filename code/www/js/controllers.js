angular.module('songhop.controllers', ['ionic', 'songhop.services', 'ionic.contrib.ui.tinderCards'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, User, Cards) {
    var media;
    var matchDing = new Audio('media/ding.wav');

    matchDing.addEventListener('ended', function(e){
      matchDing.pause();
    }, false);
    
    var outOfCardsAudio = new Audio('media/no_cards.m4a');

    // Play first element audio
    $scope.cards = Cards.queue;

    Cards.playAudio();

    // Plays audio of next card
    function playNextAudio() {
        Cards.playAudio();
    }

    // Destroy card after every swipe
    function cardDestroyed() {
        // Update cards
        Cards.spliceCard();
        $scope.cards = Cards.queue;
        // delete current card

        // Check if last card was just swiped
        if ($scope.cards.length != 0) {
            playNextAudio();
        } else {
            // pause current music
            Cards.haltAudio();
            // play out of cards audio
            media = outOfCardsAudio;
            media.play();
        }

    }

    $scope.cardSwipedLeft = function(index) {
        // pause audio
        Cards.haltAudio();
        // destroy card
        cardDestroyed();

    }
    // Add card to matches
    $scope.cardSwipedRight = function(index) {
        // pause audio
        Cards.haltAudio();
        // add to matches
        if ($scope.cards[index].liked_you == true) {
            User.addMatch($scope.cards[index]);
            matchDing.play();
            
        }
        // destroy card
        cardDestroyed();
    }

    $scope.playName = function(index) {
        console.log("Double tap");
    }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User, Cards) {
    var bioMedia;
    $scope.cards = Cards.queue[0].preview_url;

    // Get list of matches
    $scope.matches = User.matches;
    // remove a match
    $scope.deleteMatch = function(song, index) {
        User.removeMatch(song, index);
    }
    $scope.playBio = function(index) {
        // check if a bio is already playing
        if (bioMedia) bioMedia.pause();
        // play selected person's bio
        bioMedia = new Audio($scope.matches[index].bio_url);
        bioMedia.play();
    }

})

/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, Cards) {
    $scope.enteringMatches = function() {
        Cards.haltAudio();
    }
    $scope.enteringDiscovery = function() {
        if (Cards.queue[0].title != "Michael") {
            Cards.playAudio();
        }

    }

})