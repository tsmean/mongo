import { CreateResponse, DatabaseResponse, ReadResponse, UpdateResponse } from '@tsmean/dbadapter';
export declare namespace dao {
    function read(id: string, collectionName: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void): void;
    function readAll(collectionName: string, cb: (dbResponse: DatabaseResponse<ReadResponse[]>) => void): void;
    function readOneByField(fieldName: string, fieldValue: string, collectionName: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void): void;
    function create(item: Object, collectionName: string, cb: (dbResp: DatabaseResponse<CreateResponse>) => void): void;
    function update(item: any, collectionName: string, cb: (dbResp: DatabaseResponse<UpdateResponse>) => void): void;
    function remove(id: string, collectionName: string, cb: (dbResp: DatabaseResponse<any>) => void): void;
}
