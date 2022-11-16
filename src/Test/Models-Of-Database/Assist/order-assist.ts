import theDatabaseForTest from '../../../Database-Of-Project/database';
import { PoolClient } from 'pg';
import theOrderSQL from '../../../Models-Of-Database/Order/SQL-OfOrder';
import theUserSQL from '../../../Models-Of-Database/User/SQL-OfUser';
import theProductSQL from '../../../Models-Of-Database/Product/SQL-OfProduct';
import theTypeOfProduct from '../../../Models-Of-Database/Product/typeOfProduct';
import theTypeOfUser from '../../../Models-Of-Database/User/typeOfUser';
import theTypeOfOrder from '../../../Models-Of-Database/Order/typeOfOrder';
import theUserModel from '../../../Models-Of-Database/User/user';
import theProductModel from '../../../Models-Of-Database/Product/product';
import theOrderModel from '../../../Models-Of-Database/Order/order';

const theModelOfTheUser = new theUserModel();
const theModelOfTheProduct = new theProductModel();
const theModelOfTheOrder = new theOrderModel();

const userInformationForTesting: theTypeOfUser = {
    first_name: 'FirstNameTest',
    last_name: 'LastNameTest',
    password: 'PasswordTest',
} as theTypeOfUser;

const productInformationForTesting: theTypeOfProduct = {
    product_name: 'ProductNameTest',
    price: '99',
    category: 'categoryTest',
} as theTypeOfProduct;

const orderInformationForTesting: theTypeOfOrder = {
    id_of_user: '1',
    order_status: 'active',
    products: [null],
} as theTypeOfOrder;

const orderInformationForTestingAfterUpdated: theTypeOfOrder = {
    id: 1,
    id_of_user: '1',
    order_status: 'complete',
    products: [null],
} as theTypeOfOrder;

async function beforeTesting(): Promise<void> {
    await theModelOfTheUser.createUser(userInformationForTesting);
    await theModelOfTheProduct.createProduct(productInformationForTesting);
}

async function afterTesting(): Promise<void> {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();
    // users
    await openConnectionWithTheDatabase.query(theUserSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theUserSQL.resetID);
    // products
    await openConnectionWithTheDatabase.query(theProductSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theProductSQL.resetID);
    // orders
    await openConnectionWithTheDatabase.query(theOrderSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theOrderSQL.resetID);
    openConnectionWithTheDatabase.release();
}
async function createOrderForTesting(): Promise<void> {
    const createTheOrder = await theModelOfTheOrder.createOrder(
        orderInformationForTesting
    );
    console.log('The order was created SUCCESSFULLY.');
    console.log(createTheOrder);

    const orderID = createTheOrder.id;
    const idOfUserThatOrdered = createTheOrder.id_of_user;
    const orderStatus = createTheOrder.order_status;

    expect(orderID).toBe(1);
    expect(idOfUserThatOrdered).toBe('1');
    expect(orderStatus).toBe('active');
}

async function showAllOrderForTesting(): Promise<void> {
    const showAllTheOrder = await theModelOfTheOrder.showAllOrder();
    const theLengthOfTheOrders: number = showAllTheOrder.length;

    console.log('The following are all the order in the database:');
    console.log(showAllTheOrder);

    expect(theLengthOfTheOrders).toEqual(1);
    expect(showAllTheOrder[0].id).toEqual(1);
    expect(showAllTheOrder[0].id_of_user).toEqual('1');
    expect(showAllTheOrder[0].order_status).toEqual('active');
}

async function showSpecificOrderByIDForTesting(): Promise<void> {
    const one = '1';
    const showTheSpecificOrderByID =
        await theModelOfTheOrder.showSpecificOrderByID(one);
    console.log(`The requested order that has ID (${one}) is:`);
    console.log(showTheSpecificOrderByID);
    expect(showTheSpecificOrderByID.id).toEqual(1);
    expect(showTheSpecificOrderByID.id_of_user).toEqual('1');
    expect(showTheSpecificOrderByID.order_status).toEqual('active');
}

async function updateSpecificOrderByIDForTesting(): Promise<void> {
    const updateSpecificOrder =
        await theModelOfTheOrder.updateSpecificOrderByID(
            orderInformationForTestingAfterUpdated
        );
    console.log('The requested order has been updated SUCCESSFULLY.');
    console.log(updateSpecificOrder);

    const id = updateSpecificOrder.id;
    const idOfUser = updateSpecificOrder.id_of_user;
    const orderStatus = updateSpecificOrder.order_status;

    expect(id).toEqual(1);
    expect(idOfUser).toEqual('1');
    expect(orderStatus).toEqual('complete');
}

async function deleteSpecificOrderByIDForTesting(): Promise<void> {
    const one = '1';
    const deleteTheSpecificOrderByID =
        await theModelOfTheOrder.deleteSpecificOrderByID(one);
    console.log(
        `The requested Order that has ID (${one}) has been deleted SUCCESSFULLY:`
    );
    console.log(deleteTheSpecificOrderByID);
    expect(deleteTheSpecificOrderByID.id).toEqual(1);
    expect(deleteTheSpecificOrderByID.id_of_user).toEqual('1');
    expect(deleteTheSpecificOrderByID.order_status).toEqual('complete');
}

export default {
    beforeTesting,
    afterTesting,
    createOrderForTesting,
    showAllOrderForTesting,
    showSpecificOrderByIDForTesting,
    updateSpecificOrderByIDForTesting,
    deleteSpecificOrderByIDForTesting,
};
