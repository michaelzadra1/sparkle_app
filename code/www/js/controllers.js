angular.module('songhop.controllers', ['ionic', 'songhop.services', 'ionic.contrib.ui.tinderCards'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, User) {
  var media;
  var outOfCardsAudio = new Audio('/media/outOfMatches.mp3');
  // our first three cards
  var cardTypes = [
     {
        "title":"Michael",
        "artist":"Student at Queen's Univerity",
        "image_small":"/images/michael_small.jpg",
        "image":"/images/michael.jpg",
        "preview_url":"/media/lol.mp3"
     },
     {
        "title":"Anthony",
        "artist":"Student at Queen's Univerity",
        "image_small":"/images/anthony_small.jpg",
        "image":"/images/anthony.jpg",
        "preview_url":"/media/lol.mp3"
     },
     {
        "title":"Nathaniel",
        "artist":"Student at Queen's Univerity",
        "image_small":"/images/nat_small.jpg",
        "image":"/images/nat.jpg",
        "preview_url":"/media/lol.mp3"
     },
     {
        "title":"Alex",
        "artist":"Student at Queen's Univerity",
        "image_small":"/images/alex_small.jpg",
        "image":"/images/alex.jpg",
        "preview_url":"/media/lol.mp3"
     },
     {
        "title":"Aphra",
        "artist":"Instructor at Queen's Univerity",
        "image_small":"/images/aphra_small.jpg",
        "image":"/images/aphra.jpg",
        "preview_url":"/media/lol.mp3"
     }
  ];
  $scope.cards = Array.prototype.slice.call(cardTypes, 0);
  

  // Play first element audio
  media = new Audio($scope.cards[0].preview_url);
  media.play();
  
  // Plays audio of next card
  function playNextAudio(index) {
    
    // pause current audio
    media.pause();
    // play next audio
    media = new Audio($scope.cards[index].preview_url);
    media.play();
  }
  
  // Destroy card after every swipe
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    // Check if last card was just swiped
    if ($scope.cards.length != 0){
      playNextAudio(index);
    } else {
      // pause current music
      media.pause();
      // play out of cards audio
      console.log("play end tune");
      outOfCardsAudio.play();
    }

  }

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.cardSwipedLeft = function(index) {

  }
  // Add card to matches
  $scope.cardSwipedRight = function(index) {
    User.addMatch($scope.cards[index]);
  }

  
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
  
  // Get list of matches
  $scope.matches = User.matches;
  // remove a match
  $scope.deleteMatch = function(song, index){
    User.removeMatch(song, index);
  }

})

/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

})