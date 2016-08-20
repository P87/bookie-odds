var Parser = {
	/**
	 * Retrieve a list of live games from the given html
	 * @param  {string} html The html of the skybet football page
	 * @return {array} array of unique live football urls
	 */
	getGames: function(html) {
		return array_unique(
			html.match(/\/football\/football-live\/event\/([0-9]*)/g)
		);
	}
}

function array_unique(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

module.exports = Parser;
