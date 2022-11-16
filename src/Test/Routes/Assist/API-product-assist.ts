import supertest from 'supertest';
import theDatabaseForTest from '../../../Database-Of-Project/database';
import theUser from '../../../Models-Of-Database/User/user';
import theTypeOfUser from '../../../Models-Of-Database/User/typeOfUser';
import theTypeOfProduct from '../../../Models-Of-Database/Product/typeOfProduct';
import theApplication from '../../../Server/server';
import { PoolClient } from 'pg';
import theUserSQL from '../../../Models-Of-Database/User/SQL-OfUser';
import theProductSQL from '../../../Models-Of-Database/Product/SQL-OfProduct';

const theModelOfTheUser = new theUser();
const theRequest = supertest(theApplication);
let theReceivedToken = '';

const userInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
    password: 'PasswordTest',
} as theTypeOfUser;

const productInformationForTesting: theTypeOfProduct = {
    product_name: 'productNameTest',
    price: '99.99',
    category: 'productCategoryTest',
} as theTypeOfProduct;

const productInformationForUpdate: theTypeOfProduct = {
    id: 1,
    product_name: 'productNameTestAfterUpdate',
    price: '22.22',
    category: 'productCategoryTestAfterUpdate',
} as theTypeOfProduct;

async function beforeTesting(): Promise<void> {
    await theModelOfTheUser.createUser(userInformationForTesting);
}

async function afterTesting(): Promise<void> {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();

    await openConnectionWithTheDatabase.query(theUserSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theUserSQL.resetID);

    await openConnectionWithTheDatabase.query(theProductSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theProductSQL.resetID);

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

async function theCreateProductRoute(): Promise<void> {
    const getResponse = await theRequest
        .post('/api/product/add')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(productInformationForTesting);

    const getTheId = getResponse.body.response.id;
    const getTheProductName = getResponse.body.response.product_name;
    const getThePrice = getResponse.body.response.price;
    const getTheCategory = getResponse.body.response.category;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheProductName);
    // console.log(getThePrice);
    // console.log(getTheCategory);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheProductName).toEqual('productNameTest');
    expect(getThePrice).toEqual('99.99');
    expect(getTheCategory).toEqual('productCategoryTest');
    expect(getTheMessage).toEqual('The product was created SUCCESSFULLY.');
}

async function theShowAllProductRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/product/show-All-Product')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheLength = getResponse.body.response.length;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheLength);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheLength).toEqual(1);
    expect(getTheMessage).toEqual(
        'The following are all the products in the database:'
    );
}

async function theShowProductByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .get('/api/product/show-Product/1')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheId = getResponse.body.response.id;
    const getTheProductName = getResponse.body.response.product_name;
    const getThePrice = getResponse.body.response.price;
    const getTheCategory = getResponse.body.response.category;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheProductName);
    // console.log(getThePrice);
    // console.log(getTheCategory);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheProductName).toEqual('productNameTest');
    expect(getThePrice).toEqual('99.99');
    expect(getTheCategory).toEqual('productCategoryTest');
    expect(getTheMessage).toEqual('The requested product that has ID (1) is:');
}

// update
async function theUpdateProductRoute(): Promise<void> {
    const getResponse = await theRequest
        .patch('/api/product/update/1')
        .set('Authorization', 'Bearer ' + theReceivedToken)
        .send(productInformationForUpdate);

    const getTheId = getResponse.body.response.id;
    const getTheProductName = getResponse.body.response.product_name;
    const getThePrice = getResponse.body.response.price;
    const getTheCategory = getResponse.body.response.category;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheProductName);
    // console.log(getThePrice);
    // console.log(getTheCategory);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheProductName).toEqual('productNameTestAfterUpdate');
    expect(getThePrice).toEqual('22.22');
    expect(getTheCategory).toEqual('productCategoryTestAfterUpdate');
    expect(getTheMessage).toEqual(
        'The requested product has been updated SUCCESSFULLY.'
    );
}

// delete
async function theDeleteProductByIdRoute(): Promise<void> {
    const getResponse = await theRequest
        .delete('/api/product/delete/1')
        .set('Authorization', 'Bearer ' + theReceivedToken);

    const getTheId = getResponse.body.response.id;
    const getTheProductName = getResponse.body.response.product_name;
    const getThePrice = getResponse.body.response.price;
    const getTheCategory = getResponse.body.response.category;
    const getTheMessage = getResponse.body.message;

    // console.log(getTheId);
    // console.log(getTheProductName);
    // console.log(getThePrice);
    // console.log(getTheCategory);
    // console.log(getTheMessage);

    expect(getResponse.status).toBe(200);
    expect(getTheId).toEqual(1);
    expect(getTheProductName).toEqual('productNameTestAfterUpdate');
    expect(getThePrice).toEqual('22.22');
    expect(getTheCategory).toEqual('productCategoryTestAfterUpdate');
    expect(getTheMessage).toEqual(
        'The requested product that has ID (1) has been deleted SUCCESSFULLY:'
    );
}

export default {
    beforeTesting,
    afterTesting,
    getToken,
    theCreateProductRoute,
    theShowAllProductRoute,
    theShowProductByIdRoute,
    theUpdateProductRoute,
    theDeleteProductByIdRoute,
};
