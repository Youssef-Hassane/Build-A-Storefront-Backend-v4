import theProduct from '../../../Models-Of-Database/Product/product';
import theTypeOfProduct from '../../../Models-Of-Database/Product/typeOfProduct';
import { PoolClient } from 'pg';
import theDatabaseForTest from '../../../Database-Of-Project/database';
import theSQL from '../../../Models-Of-Database/Product/SQL-OfProduct';

const modelOfTheProduct = new theProduct();

const productInformationForTesting: theTypeOfProduct = {
    product_name: 'ProductNameTest',
    price: '99.99',
    category: 'categoryTest',
} as theTypeOfProduct;

const productInformationForTestingAfterUpdate: theTypeOfProduct = {
    id: 1,
    product_name: 'ProductNameTestAfterUpdate',
    price: '11.11',
    category: 'categoryTestAfterUpdate',
} as theTypeOfProduct;

async function createProductForTesting(): Promise<void> {
    const createTheProduct = await modelOfTheProduct.createProduct(
        productInformationForTesting
    );
    console.log('The product was created SUCCESSFULLY.');
    console.log(createTheProduct);

    const productInformationForTesting_toEqual = {
        id: createTheProduct.id,
        product_name: 'ProductNameTest',
        price: createTheProduct.price,
        category: 'categoryTest',
    };

    expect(createTheProduct).toEqual(productInformationForTesting_toEqual);
}

async function showAllProductForTesting(): Promise<void> {
    const showAllTheProductForTesting =
        await modelOfTheProduct.showAllProduct();
    const theLengthOfTheUsers: number = showAllTheProductForTesting.length;
    console.log('The following are all the products in the database:');
    console.log(showAllTheProductForTesting);
    expect(theLengthOfTheUsers).toEqual(1);
    expect(showAllTheProductForTesting[0].product_name).toEqual(
        'ProductNameTest'
    );
    expect(showAllTheProductForTesting[0].price).toEqual('99.99');
    expect(showAllTheProductForTesting[0].category).toEqual('categoryTest');
}

async function showSpecificProductByIDForTesting(): Promise<void> {
    const one = '1';
    const showTheSpecificProductByID =
        await modelOfTheProduct.showSpecificProductByID(one);
    console.log(`The requested product that has ID (${one}) is:`);
    console.log(showTheSpecificProductByID);

    const productInformationForTesting_toEqual = {
        id: 1,
        product_name: 'ProductNameTest',
        price: showTheSpecificProductByID.price,
        category: 'categoryTest',
    };

    expect(showTheSpecificProductByID).toEqual(
        productInformationForTesting_toEqual
    );
}

async function updateSpecificProductForTesting(): Promise<void> {
    const updateSpecificProduct =
        await modelOfTheProduct.updateSpecificProductByID(
            productInformationForTestingAfterUpdate
        );
    console.log('The requested product has been updated SUCCESSFULLY.');
    console.log(updateSpecificProduct);

    const id = updateSpecificProduct.id;
    const price = updateSpecificProduct.price;
    const product_name = updateSpecificProduct.product_name;
    const category = updateSpecificProduct.category;

    expect(id).toEqual(1);
    expect(product_name).toEqual('ProductNameTestAfterUpdate');
    expect(price).toEqual('11.11');
    expect(category).toEqual('categoryTestAfterUpdate');
}

async function deleteSpecificProductByIDForTesting(): Promise<void> {
    const one = '1';
    const deleteTheSpecificProductByID =
        await modelOfTheProduct.deleteSpecificProductByID(one);
    console.log(
        `The requested product that has ID (${one}) has been deleted SUCCESSFULLY:`
    );
    console.log(deleteTheSpecificProductByID);
    expect(deleteTheSpecificProductByID.id).toEqual(1);
}

async function afterTesting(): Promise<void> {
    const openConnectionWithTheDatabase: PoolClient =
        await theDatabaseForTest.connect();
    await openConnectionWithTheDatabase.query(theSQL.deleteSQL);
    await openConnectionWithTheDatabase.query(theSQL.resetID);
    openConnectionWithTheDatabase.release();
}

export default {
    createProductForTesting,
    showAllProductForTesting,
    showSpecificProductByIDForTesting,
    updateSpecificProductForTesting,
    deleteSpecificProductByIDForTesting,
    afterTesting,
};
