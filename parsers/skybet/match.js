var Parser = {
    getTeams: function(html) {
        var teams = html.match(/<h1 class=".*"><b>(.*)<\/b><\/h1>/);
        if (teams) {
            return teams[1];
        }
        log.error('There was an error extracting the team names.');
        return false;
    },

    getScore: function(html) {
        var home = html.match(
            /<div class="scoreboard--football__score js-scoreboard__score-home">\n\s+([0-9]+)\s+<\/div>/
        );
        var away = html.match(
            /<div class="scoreboard--football__score js-scoreboard__score-away">\n\s+([0-9]+)\s+<\/div>/
        );
        if (home && away) {
            return {
                home: home[1],
                away: away[1]
            }
        }
        log.error('There was an error extracting the score');
        return false;
    },

    getStats: function(html) {
        return {
            possession: this.extractStat('js-stat-possession', html),
            corners: this.extractStat('js-stat-corner', html),
            shotsOnTarget: this.extractStat('js-stat-ontarget', html),
            shotsOffTarget: this.extractStat('js-stat-offtarget', html)
        }
    },

    extractStat(className, html) {
        var homere = this.buildRegex(className, 'home');
        var awayre = this.buildRegex(className, 'away');

        var homeStat = homere.exec(html);
        var awayStat = awayre.exec(html);

        return {
            home: homeStat[1],
            away: awayStat[1]
        };
    },

    /**
     * Build the regex to find the value of the given stat html class
     * @param  {string} className The stat's html class value
     * @param  {string} team      home|away
     * @return {RegExp}
     */
    buildRegex: function(className, team) {
        return new RegExp(
            '<div class="percentage-bar__[A-z]+  ' +
            className + '-' + team + '">([0-9]+)%?<\/div>'
        );
    }
}

module.exports = Parser;
