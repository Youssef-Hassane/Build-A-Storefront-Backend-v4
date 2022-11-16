import supertest from 'supertest';
import theDatabaseForTest from '../../../Database-Of-Project/database';
import theUser from '../../../Models-Of-Database/User/user';
import theTypeOfUser from '../../../Models-Of-Database/User/typeOfUser';
import theTypeOfOrder from '../../../Models-Of-Database/Order/typeOfOrder';
import theApplication from '../../../Server/server';
import { PoolClient } from 'pg';
import theUserSQL from '../../../Models-Of-Database/User/SQL-OfUser';
import theOrderSQL from '../../../Models-Of-Database/Order/SQL-OfOrder';

const theModelOfTheUser = new theUser();
const theRequest = supertest(theApplication);
let theReceivedToken = '';

const userInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
    password: 'PasswordTest',
} as theTypeOfUser;

const orderInformationForTesting: theTypeOfOrder = {
    id_of_user: '1',
    order_status: 'active',
    products: [null],
} as theTypeOfOrder;

const orderInformationForUpdate: theTypeOfOrder = {
    id: 1,
    id_of_user: '1',
    order_status: 'complete',
    products: [null],
} as theTypeOfOrder;

async function beforeTesting() {
    await theModelOfTheUser.createUser(userInformationForTesting);
}

async function afterTesting() {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();

    await openConnectionWithTheDatabase.query(theUserSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theUserSQL.resetID);

    await openConnectionWithTheDatabase.query(theOrderSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theOrderSQL.resetID);

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

async function theCreateOrderRoute(): Promise<void> {
    const getResponse = await theRequest
        .post('/api/order/add')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(orderInformationForTesting);

    const getTheId = getResponse.body.response.id;
    const getTheUserId = getResponse.body.response.id_of_user;
    const getTheOrderStatus = getResponse.body.response.order_status;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheUserId);
    // console.log(getTheOrderStatus);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheUserId).toEqual('1');
    expect(getTheOrderStatus).toEqual('active');
    expect(getTheMessage).toEqual('The order was created SUCCESSFULLY.');
}

async function theShowAllOrderRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/order/show-All-order')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheLength = getResponse.body.response.length;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheLength);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheLength).toEqual(1);
    expect(getTheMessage).toEqual(
        'The following are all the order in the database:'
    );
}

async function theShowOrderByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/order/show-order/1')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheId = getResponse.body.response.id;
    const getTheUserId = getResponse.body.response.id_of_user;
    const getTheOrderStatus = getResponse.body.response.order_status;
    const getTheProducts = getResponse.body.response.products;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheUserId);
    // console.log(getTheOrderStatus);
    // console.log(getTheProducts);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheUserId).toEqual('1');
    expect(getTheOrderStatus).toEqual('active');
    expect(getTheProducts).toEqual(null);
    expect(getTheMessage).toEqual('The requested order that has ID (1) is:');
}

// update
async function theUpdateOrderRoute(): Promise<void> {
    const getResponse = await theRequest
        .patch('/api/order/update/1')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(orderInformationForUpdate);

    const getTheId = getResponse.body.response.id;
    const getTheUserId = getResponse.body.response.id_of_user;
    const getTheOrderStatus = getResponse.body.response.order_status;
    const getTheProducts = getResponse.body.response.products;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheUserId);
    // console.log(getTheOrderStatus);
    // console.log(getTheProducts);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheUserId).toEqual('1');
    expect(getTheOrderStatus).toEqual('complete');
    expect(getTheProducts).toEqual(null);
    expect(getTheMessage).toEqual(
        'The requested order has been updated SUCCESSFULLY.'
    );
}

// delete
async function theDeleteOrderByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .delete('/api/order/delete/1')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheId = getResponse.body.response.id;
    const getTheUserId = getResponse.body.response.id_of_user;
    const getTheOrderStatus = getResponse.body.response.order_status;
    const getTheProducts = getResponse.body.response.products;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheUserId);
    // console.log(getTheOrderStatus);
    // console.log(getTheProducts);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheUserId).toEqual('1');
    expect(getTheOrderStatus).toEqual('complete');
    expect(getTheProducts).toEqual(null);
    expect(getTheMessage).toEqual(
        'The requested order that has ID (1) has been deleted SUCCESSFULLY:'
    );
}

export default {
    userInformationForTesting,
    beforeTesting,
    afterTesting,
    getToken,
    theCreateOrderRoute,
    theShowAllOrderRoute,
    theShowOrderByIdRoute,
    theUpdateOrderRoute,
    theDeleteOrderByIdRoute,
};
