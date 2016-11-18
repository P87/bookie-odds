# bookie-odds

A project for retrieving odds and stats of live Football games from online bookies.

## Usages
`node index.js [--help, --site] <task> <subject>`

Where task is one of:
* crawl (requires --site to be supplied). Which can currently have the following subjects:
    - liveMatches
* process, which currently can have the following subjects:
    - liveMatches
    - match

## Examples

### General flow to follow
#### Get list of live games
```
node index.js --site <skybet> crawl liveMatches | node_modules/.bin/bunyan
```

This will crawl a page which lists all the currently live football games, and adds links to each game to a queue.

#### Get the source of each live match
```
node index.js process match | node_modules/.bin/bunyan
```

This will grab the address of a live football game from the queue, and add the source code of the page to a second queue.

#### Get stats from each crawled live match
```
node index.js process matchSource | node_modules/.bin/bunyan
```

This will grab the source code of a live football page from our queue and extract the data we are looking for and save
it in our database.