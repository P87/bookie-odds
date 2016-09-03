var projectConfig = require('./config/project');
var bunyan = require('bunyan');
log = bunyan.createLogger(
    {
        name: 'bookie-odds',
        level: projectConfig.logLevel
    }
);

var options = {};
var availableSites = ['skybet'];
var availableOptions = ['--site', '--help'];
var args = process.argv.slice(2);


if (typeof args[0] == 'undefined' || args[0] == '--help') {
    process.stdout.write('Example usage:\r\n\r\n' +
        'node index.js --site skybet crawl liveMatches\r\n\r\n' +
        'Look at the README file for all options.\r\n'
    );
    process.exit();
}

// Work out the options that have been passed
getOptions();

// So what are we doing?
switch (args[0]) {
    case 'crawl':
        switch (args[1]) {
            case 'liveMatches':
                if (typeof options.site == 'undefined') {
                    log.error('No site supplied using the --site flag');
                    process.exit();
                }

                var liveMatches = require('./crawlers/' +
                    options['site'] + '/liveMatches');
                liveMatches.crawl();

                break;
            default:
                log.error('Invalid task supplied to crawl.');
                process.exit();
        }
        break;
    case 'process':
        switch (args[1]) {
            case 'liveMatches':
                var liveMatches = require('./processors/liveMatches');
                liveMatches.run();
                break;
            case 'match':
                var match = require('./processors/match');
                match.run();
                break;
            case 'matchSource':
                var matchSource = require('./processors/matchSource');
                matchSource.run();
                break;
            default:
                log.error('Invalid task supplied to crawl.');
                process.exit();
        }
        break;
    default:
        log.error('Invalid argument supplied.');
        process.exit();

}



/*******************************************************************************
* Functions
*******************************************************************************/

/**
 * Loop through the passed arguments and extract any options that may have been
 * passed.
 * @return {void}
 */
function getOptions() {
    var argsLength = args.length;
    for (var i = 0; i < argsLength; i++) {
        if (args[i] == '--site') {
            if (
                typeof args[i+1] == 'undefined' ||
                !availableSites.indexOf(args[i+1]) === -1
            ) {
                throw 'Invalid value for --site';
            }

            options.site = args[i+1];

            delete args[i];
            delete args[i+1];
            i++;
        }
    }

    // Remove undefined arguments from our array
    args = args.filter(function(arg) {
        return typeof arg !== 'undefined';
    });
}
