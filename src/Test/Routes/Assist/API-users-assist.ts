import supertest from 'supertest';
import theDatabaseForTest from '../../../Database-Of-Project/database';
import theUser from '../../../Models-Of-Database/User/user';
import theTypeOfUser from '../../../Models-Of-Database/User/typeOfUser';
import theApplication from '../../../Server/server';
import { PoolClient } from 'pg';
import theSQL from '../../../Models-Of-Database/User/SQL-OfUser';

const theModelOfTheUser = new theUser();
const theRequest = supertest(theApplication);
let theReceivedToken = '';

const userInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
    password: 'PasswordTest',
} as theTypeOfUser;

const userInformationForTesting2: theTypeOfUser = {
    first_name: 'FirstNameTest2',
    last_name: 'LastNameTest2',
    password: 'PasswordTest2',
} as theTypeOfUser;

const wrongUserInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTestWrong',
    last_name: 'LastNameTestWrong',
    password: 'PasswordTestWrong',
} as theTypeOfUser;

const userInformationForUpdate: theTypeOfUser = {
    id: 2,
    first_name: 'FirstNameTestUpdate',
    last_name: 'LastNameTestUpdate',
    password: 'PasswordTestUpdate',
} as theTypeOfUser;

async function beforeTesting(): Promise<void> {
    await theModelOfTheUser.createUser(userInformationForTesting);
}

async function afterTesting(): Promise<void> {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();
    await openConnectionWithTheDatabase.query(theSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theSQL.resetID);
    openConnectionWithTheDatabase.release();
}

async function getToken(): Promise<void> {
    const getResponse = await theRequest
        .post('/api/user/auth')
        .send(userInformationForTesting);

    const getTheId =
        getResponse.body.data.AuthUserByFirstNameLastNamePassword.id;
    const getTheFirstName =
        getResponse.body.data.AuthUserByFirstNameLastNamePassword.first_name;
    const getTheLastName =
        getResponse.body.data.AuthUserByFirstNameLastNamePassword.last_name;
    const getTheToken = getResponse.body.data.theToken;
    theReceivedToken = getTheToken;
    // console.log(theReceivedToken);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheFirstName).toEqual('FirstNameTest');
    expect(getTheLastName).toEqual('LastNameTest');
}

async function getTokenWrongInformation(): Promise<void> {
    const getResponse = await theRequest
        .post('/api/user/auth')
        .send(wrongUserInformationForTesting);
    expect(getResponse.status).toBe(401);
}

async function theCreateUserRoute(): Promise<void> {
    const getResponse = await theRequest
        .post('/api/user/add')
        .send(userInformationForTesting2);

    const getTheId = getResponse.body.response.id;
    const getTheFirstName = getResponse.body.response.first_name;
    const getTheLastName = getResponse.body.response.last_name;
    const getTheMessage = getResponse.body.message;
    // console.log(getTheId);
    // console.log(getTheFirstName);
    // console.log(getTheLastName);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(2);
    expect(getTheFirstName).toEqual('FirstNameTest2');
    expect(getTheLastName).toEqual('LastNameTest2');
    expect(getTheMessage).toEqual('The user was created SUCCESSFULLY.');
}

async function theShowAllUserRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/user/show-all-user')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheLength = getResponse.body.response.length;
    const getTheMessage = getResponse.body.message;
    // console.log(getTheLength);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheLength).toEqual(2);
    expect(getTheMessage).toEqual(
        'The following are all the users in the database:'
    );
}

async function theShowUserByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/user/show-user/1')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheId = getResponse.body.response.id;
    const getTheFirstName = getResponse.body.response.first_name;
    const getTheLastName = getResponse.body.response.last_name;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheFirstName);
    // console.log(getTheLastName);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheFirstName).toEqual('FirstNameTest');
    expect(getTheLastName).toEqual('LastNameTest');
    expect(getTheMessage).toEqual(
        'The following is the selected user from the database:'
    );
}

// update
async function theUpdateUserRoute(): Promise<void> {
    const getResponse = await theRequest
        .patch('/api/user/update/2')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(userInformationForUpdate);

    const getTheId = getResponse.body.response.id;
    const getTheFirstName = getResponse.body.response.first_name;
    const getTheLastName = getResponse.body.response.last_name;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheFirstName);
    // console.log(getTheLastName);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(2);
    expect(getTheFirstName).toEqual('FirstNameTestUpdate');
    expect(getTheLastName).toEqual('LastNameTestUpdate');
    expect(getTheMessage).toEqual('The user has been updated SUCCESSFULLY.');
}
// delete
async function theDeleteUserByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .delete('/api/user/delete/1')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(userInformationForTesting);

    const getTheId = getResponse.body.response.id;
    const getTheFirstName = getResponse.body.response.first_name;
    const getTheLastName = getResponse.body.response.last_name;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheFirstName);
    // console.log(getTheLastName);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheFirstName).toEqual('FirstNameTest');
    expect(getTheLastName).toEqual('LastNameTest');
    expect(getTheMessage).toEqual('The user has been deleted SUCCESSFULLY.');
}

export default {
    beforeTesting,
    afterTesting,
    getToken,
    getTokenWrongInformation,
    theCreateUserRoute,
    theShowAllUserRoute,
    theShowUserByIdRoute,
    theUpdateUserRoute,
    theDeleteUserByIdRoute,
};
