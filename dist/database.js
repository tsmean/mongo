"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
class Database {
    constructor() {
        this.mongoUri = (databaseConfig) => {
            return `mongodb://${databaseConfig.dbuser}` +
                `:${databaseConfig.dbpassword}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.dbname}`;
        };
        this._mongoClient = mongo.MongoClient;
    }
    get database() {
        return this._database;
    }
    connectToDatabase(databaseConfig, callback) {
        // Connect to the db
        this._mongoClient.connect(this.mongoUri(databaseConfig), (err, db) => {
            if (!err) {
                this._database = db;
                if (callback) {
                    callback(db);
                }
            }
            else {
                console.error('Error while connecting to Database:');
                console.error(err);
            }
        });
    }
    ;
}
exports.Database = Database;
exports.database = new Database();
