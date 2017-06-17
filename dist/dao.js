"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
const database_1 = require("./database");
// Database Access Object
// Everything that operates directly on the database goes here
// i.e. everything that has to do anything with mongodb
// goal is to abstract away MongoDB stuff and localize in one place, so if you want to swap e.g. for a relational DB
// it's not too much effort
// also, don't expose Mongo API directly, but program against an interface (DatabaseResponse)
var dao;
(function (dao) {
    function read(id, collectionName, cb) {
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: err
                });
            }
            else {
                collection.findOne({ '_id': new mongo.ObjectID(id) }, (innerError, data) => {
                    if (innerError) {
                        cb({
                            error: innerError
                        });
                    }
                    else {
                        if (data) {
                            cb({
                                error: null,
                                data: morphDataOnRetrieval(data)
                            });
                        }
                        else {
                            cb({
                                error: {
                                    message: 'not found'
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    dao.read = read;
    function readAll(collectionName, cb) {
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: err
                });
            }
            else {
                collection.find({}, (innerError, cursor) => {
                    if (innerError) {
                        cb({
                            error: innerError
                        });
                    }
                    else {
                        if (cursor) {
                            cursor.toArray().then(ary => {
                                cb({
                                    error: null,
                                    data: morphDataOnRetrieval(ary)
                                });
                            });
                        }
                        else {
                            cb({
                                error: {
                                    message: 'not found'
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    dao.readAll = readAll;
    function readOneByField(fieldName, fieldValue, collectionName, cb) {
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: err
                });
            }
            else {
                const searchObject = {};
                searchObject[fieldName] = fieldValue;
                collection.findOne(searchObject, (innerError, data) => {
                    if (innerError) {
                        cb({
                            error: innerError
                        });
                    }
                    else {
                        if (data) {
                            cb({
                                error: null,
                                data: morphDataOnRetrieval(data)
                            });
                        }
                        else {
                            cb({
                                error: {
                                    message: 'not found'
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    dao.readOneByField = readOneByField;
    function create(item, collectionName, cb) {
        // deep copy object so input doesn't get mutated
        const itemCopy = JSON.parse(JSON.stringify(item));
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: mongoErrorToGeneralDbError(err)
                });
            }
            else {
                collection.insertOne(itemCopy, (innerError, result) => {
                    if (innerError) {
                        cb({
                            error: mongoErrorToGeneralDbError(innerError)
                        });
                    }
                    else {
                        cb({
                            error: null,
                            data: morphDataOnRetrieval(itemCopy)
                        });
                    }
                });
            }
        });
    }
    dao.create = create;
    function update(item, collectionName, cb) {
        // deep copy object so input doesn't get mutated and morph it to correct storage form
        const itemCopy = morphDataOnStorage(item);
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: mongoErrorToGeneralDbError(err)
                });
            }
            else {
                collection.updateOne({ '_id': new mongo.ObjectID(itemCopy._id) }, item, (innerError, result) => {
                    if (innerError) {
                        cb({
                            error: mongoErrorToGeneralDbError(innerError)
                        });
                    }
                    else {
                        cb({
                            error: null,
                            data: morphDataOnRetrieval(itemCopy)
                        });
                    }
                });
            }
        });
    }
    dao.update = update;
    function remove(id, collectionName, cb) {
        database_1.database.database.collection(collectionName, (err, collection) => {
            if (err) {
                cb({
                    error: mongoErrorToGeneralDbError(err)
                });
            }
            else {
                collection.deleteOne({ '_id': new mongo.ObjectID(id) }, (innerError, result) => {
                    if (innerError) {
                        cb({
                            error: mongoErrorToGeneralDbError(innerError)
                        });
                    }
                    else {
                        cb({
                            error: null
                        });
                    }
                });
            }
        });
    }
    dao.remove = remove;
    function mongoErrorToGeneralDbError(err) {
        return {
            message: err.message
        };
    }
    function morphDataOnRetrieval(data, logme) {
        if (!data) {
            console.error('No data!');
            return;
        }
        const dataCopy = JSON.parse(JSON.stringify(data));
        const morphResource = (resource) => {
            if (typeof resource._id !== 'string') {
                resource.uid = resource._id.toHexString();
            }
            else {
                resource.uid = resource._id;
            }
            delete resource._id;
        };
        if (Array.isArray(dataCopy)) {
            dataCopy.forEach(resource => {
                morphResource(resource);
            });
        }
        else {
            morphResource(dataCopy);
        }
        return dataCopy;
    }
    ;
    function morphDataOnStorage(data) {
        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy._id = data.uid;
        delete dataCopy.uid;
        return dataCopy;
    }
    ;
})(dao = exports.dao || (exports.dao = {}));
