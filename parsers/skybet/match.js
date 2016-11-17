var Parser = {

    data: null,

    parseSource: function(html) {
        var matchData = html.match(/window\.meta = ({.*});/);
        matchData = JSON.parse(matchData[1]);
        Parser.data = matchData.scoreboard;

        return {
            teams: {
                home: Parser.data.teams.home.name,
                away: Parser.data.teams.away.name
            },
            score: {
                home: Parser.data.score.home,
                away: Parser.data.score.away
            },
            gameTime: Parser.data.seconds / 60,
            stats: Parser.getStats()
        }
    },

    getStats: function() {
        var stats = {
            possession: {
                home: Parser.data.stats.possession.home,
                away: Parser.data.stats.possession.away
            },
            corners: {
                home: Parser.data.stats.corner.home,
                away: Parser.data.stats.corner.away
            },
            shotsOnTarget: {
                home: Parser.data.stats.shotOn.home,
                away: Parser.data.stats.shotOn.away
            },
            shotsOffTarget: {
                home: Parser.data.stats.shotOff.home,
                away: Parser.data.stats.shotOff.away
            }
        };

        // Seems not all games have this stat
        if (typeof Parser.data.stats.shotWood !== 'undefined') {
            stats.shotsHitPost = {
                home: Parser.data.stats.shotWood.home,
                away: Parser.data.stats.shotWood.away
            }
        }

        return stats;
    }
}

module.exports = Parser;
