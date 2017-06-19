import * as mongo from 'mongodb';
import {Db} from 'mongodb';
import {DatabaseConfig} from '@tsmean/dbadapter';

export class Database {

  private _database;
  private _mongoClient;

  private mongoUri = (databaseConfig: DatabaseConfig) => {
    return `mongodb://${databaseConfig.dbuser}` +
    `:${databaseConfig.dbpassword}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.dbname}`;
  }

  constructor(

  ) {
    this._mongoClient = mongo.MongoClient;
  }

  public get database() {
    return this._database;
  }

  public connectToDatabase (databaseConfig: DatabaseConfig, callback?: (database: Db) => any) {

    // Connect to the db
    this._mongoClient.connect(this.mongoUri(databaseConfig), (err, db) => {
      if (!err) {
        this._database = db;
        if (callback) {
          callback(db);
        }
      } else {
        console.error('Error while connecting to Database:');
        console.error(err);
      }
    });

  };

}

export const database = new Database();
