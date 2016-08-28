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
node index.js --site <skybet> crawl liveMatches
```

#### Process list of live matches
```
node index.js process liveMatches
```

#### Get the source of each live match
```
node index.js process match
```

#### Get stats from each crawled live match
```
node index.js process matchSource
```
