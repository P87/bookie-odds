var Parser = {
    getTeams: function(html) {
        var teams = html.match(/<h1 class=".*"><b>(.*)<\/b><\/h1>/);
        return teams[1];
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

    buildRegex: function(className, team) {
        return new RegExp(
            '<div class="percentage-bar__[A-z]+  ' +
            className + '-' + team + '">([0-9]+)%?<\/div>'
        );
    }
}

module.exports = Parser;
