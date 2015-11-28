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
    	var o = {
    		queue: []
    	};

    	return 0;
    })