'use strict';

var util = require('util'),
    winston = require('winston'),
    _ = require('lodash'),
    kafka = require('kafka-node');

var Producer = kafka.Producer,
    client,
    producer;

var _isConnected = false;

var KafkaLogger = function (options) {
    this.name = 'KafkaLogger';
    this.level = options.level || 'info';
    this.meta = options.meta || {};

    /*
        KAFKA Options
    */
    // Zookeeper connection string, default localhost:2181/kafka0.8
    this.connectionString = options.connectionString || 'localhost:2181';

    // This is a user supplied identifier for the client application, default kafka-node-client
    this.clientId = options.clientId;

    // Object, Zookeeper options, see node-zookeeper-client
    this.zkOptions = options.zkOptions;

    this.topic = options.topic;


    // Connect
    client = new kafka.Client(this.connectionString, this.clientId, this.zkOptions);
    producer = new Producer(client);

    producer.on('ready', function () {
        _isConnected = true;
    });

    producer.on('error', function () {
        _isConnected = false;
        var msg = 'winston-kafka-logger - Cannot connect to kafka server';
        throw new Error(msg);
    });
};

util.inherits(KafkaLogger, winston.Transport);

KafkaLogger.prototype.log = function (level, msg, meta, callback) {
    if (_isConnected) {
        var payload = {
            msg: msg,
            level: level,
            meta: _.defaults(meta, this.meta),
            timestamp: new Date()
        };

        var payloads = [
            { topic: this.topic, messages: [JSON.stringify(payload)] }
        ];

        producer.send(payloads);
    }

    callback(null, true);
};

module.exports = KafkaLogger;