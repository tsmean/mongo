import {database} from './database';

export namespace setupTests {

  export async function connectTestToDatabase() {
    return beforeEach('connect to db', (done) => {
      database.connectToDatabase(getConfig(), (db) => {
        db.dropDatabase().then(() => {
          done();
        });
      });
    });
  }

  export function getConfig() {
    return require('../properties/test.properties.json');
  };

}
