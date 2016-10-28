const { curry, chain, map, compose } = require('ramda');
const { Future } = require('ramda-fantasy');
const { MongoClient } = require('mongodb');

const mongoConnect = conf => Future((reject, resolve) => MongoClient.connect(conf.url, (err, db) => err ? reject(err) : resolve(db)));
const mongoCollection = curry((collectionName, db) => db.collection(collectionName));
const findArray = curry((query, collection) => Future((reject, resolve) => collection.find(query).toArray((err, result) => err ? reject(err) : resolve(result))));

const find = curry((conf, collectionName, query) => compose(
    chain(findArray(query)),
    map(mongoCollection(collectionName)),
    mongoConnect
)(conf));

module.exports = find;
