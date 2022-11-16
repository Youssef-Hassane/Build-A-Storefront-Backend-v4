import theAssist from './Assist/order-assist';

describe(
    'Test the *order* Model Of Database that is in the "src/Models-Of-Database/Product/product.ts" file:',
    callbackFunction
);

function callbackFunction() {
    beforeAll(theAssist.beforeTesting);
    it(
        'Testing the createOrder function that create Order in the database',
        theAssist.createOrderForTesting
    );
    it(
        'Testing the showAllOrder function that show/display all the Order in the database',
        theAssist.showAllOrderForTesting
    );
    it(
        'Testing the showSpecificOrderByID function that show/display specific Order from the database',
        theAssist.showSpecificOrderByIDForTesting
    );
    it(
        'Testing the updateSpecificOrderByID function that update specific Order in the database',
        theAssist.updateSpecificOrderByIDForTesting
    );
    it(
        'Testing the deleteSpecificOrderByID function that delete specific Order from the database',
        theAssist.deleteSpecificOrderByIDForTesting
    );
    afterAll(theAssist.afterTesting);
}
