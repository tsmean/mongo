import { Db } from 'mongodb';
import { DatabaseConfig } from './database-config.model';
export declare class Database {
    private _database;
    private _mongoClient;
    private mongoUri;
    constructor();
    readonly database: any;
    connectToDatabase(databaseConfig: DatabaseConfig, callback?: (database: Db) => any): void;
}
export declare const database: Database;