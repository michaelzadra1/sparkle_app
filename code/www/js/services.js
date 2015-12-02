angular.module('songhop.services', [])
    .factory('User', function() {
        var o = {
            matches: [] // matches
        }

        // Add person to matches (card)
        o.addMatch = function(match) {
            // if out of cards
            if (!match) {
                return false;
            }
            // append to matches array
            o.matches.push(match);
        }

        // remove match from list
        o.removeMatch = function(match, index) {
            // make sure there's a match to add
            if (!match) return false;

            // remove from matches
            o.matches.splice(index, 1);
        }

        return o;
    })
    .factory('Cards', function() {
        // cards
        var outOfCardsAudio = new Audio('/media/no_cards.m4a');
        var media;
        var o = {
            queue: [{
                "title": "Michael",
                "artist": "Student at Queen's University",
                "image_small": "images/michael_small.jpg",
                "image": "images/michael.jpg",
                "preview_url": "media/michael_preview.m4a",
                "bio_url": "media/bio.mp3",
                "liked_you": false
            }, {
                "title": "Anthony",
                "artist": "Student at Queen's University",
                "image_small": "images/anthony_small.jpg",
                "image": "images/anthony.jpg",
                "preview_url": "media/anthony_intro.m4a",
                "bio_url": "media/anthony_bio.m4a",
                "liked_you": true
            }, {
                "title": "Nathaniel",
                "artist": "Student at Queen's University",
                "image_small": "images/nat_small.jpg",
                "image": "images/nat.jpg",
                "preview_url": "media/nat_intro.m4a",
                "bio_url": "media/bio.mp3",
                "liked_you": false
            }, {
                "title": "Alex",
                "artist": "Student at Queen's University",
                "image_small": "images/alex_small.jpg",
                "image": "images/alex.jpg",
                "preview_url": "media/alex_intro.m4a",
                "bio_url": "media/alex_bio.m4a",
                "liked_you": true
            }, {
                "title": "Taylor",
                "artist": "Instructor at Queen's University",
                "image_small": "images/taylor_small.jpg",
                "image": "images/taylor.jpg",
                "preview_url": "media/taylor_intro.m4a",
                "bio_url": "media/bio.mp3",
                "liked_you": false
            }]
        };
        
        o.spliceCard = function() {
            // update cards when card is destroyed
            o.queue.splice(0, 1);
            media.pause();

        }
        o.playAudio = function() {
            media = new Audio(o.queue[0].preview_url);
            media.play();
        }
        o.haltAudio = function(){
            media.pause();

        }
        o.pauseCurrentAudio = function(){
            media = new Audio(o.queue[0].preview_url);
            media.pause();
        }

        return o;
    })