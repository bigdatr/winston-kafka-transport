winston-kafka-transport
=======================
Simple [kafka](http://kafka.apache.org/) transport for [winston](https://github.com/flatiron/winston)

## Install

```sh
npm install winston winston-kafka-transport --save
```

## Usage

```js
var winston = require('winston');
winston.transports.Kafka = require('winston-kafka-transport');

winston.add(winston.transports.Kafka, {
    topic: 'my_topic_name',
    connectionString: 'localhost:2181',
});
```

###Options

* `topic` - (required) Kafka topic
* `connectionString` - Zookeeper connection string, (default `localhost:2181/kafka0.8`)
* `clientId` - This is a user supplied identifier for the client application, (default `kafka-node-client`)
* `zkOptions` - {Object} Zookeeper options, see [node-zookeeper-client](https://github.com/alexguan/node-zookeeper-client#client-createclientconnectionstring-options)
* `meta` - {Object} Default meta data to add to each logged message (eg. {hostname: 'aws-server-hostname.com'})

## Testing
Test coming soon...

```js
npm test
```

## License
[BSD](https://github.com/bigdatr/winston-kafka-transport/blob/master/LICENSE)